/**
 * CMS Client API Service
 * Handles server-side JWT authentication, content fetching/saving,
 * and asset/file uploads with automatic offline / Base64 fallback.
 */

import { PORTFOLIO_DATA } from '../data/portfolioData';

const TOKEN_KEY = 'portfolio_cms_jwt_token';
const LOCAL_CONTENT_KEY = 'portfolio_cms_content_cache_v1';

export const cmsApi = {
  /**
   * Get stored JWT token
   */
  getToken() {
    try {
      return (
        localStorage.getItem(TOKEN_KEY) ||
        sessionStorage.getItem(TOKEN_KEY) ||
        sessionStorage.getItem('portfolio_admin_auth_token')
      );
    } catch {
      return null;
    }
  },

  /**
   * Set JWT token
   */
  setToken(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  /**
   * Clear JWT token
   */
  clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem('portfolio_admin_auth_token');
    } catch {}
  },

  /**
   * Authenticate with server-side password
   */
  async login(password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        this.setToken(data.token);
        return { success: true, token: data.token };
      }
      return { success: false, error: data.error || 'Invalid passcode' };
    } catch (err) {
      // Backend offline: store local auth session token
      const clientToken = `client_auth_${Date.now()}`;
      this.setToken(clientToken);
      return { success: true, localOnly: true, token: clientToken };
    }
  },

  /**
   * Verify token validity
   */
  async verifyAuth() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      return Boolean(data.success);
    } catch {
      // If server offline, consider local session valid if token exists
      return true;
    }
  },

  /**
   * Fetch portfolio content
   */
  async fetchContent() {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const payload = await res.json();
        if (payload.success && payload.data) {
          localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(payload.data));
          return payload.data;
        }
      }
    } catch (err) {
      console.warn('Backend API offline, loading from local cache/defaults');
    }

    // Fallback: LocalStorage cache -> PORTFOLIO_DATA default
    try {
      const cached = localStorage.getItem(LOCAL_CONTENT_KEY);
      if (cached) return JSON.parse(cached);
    } catch {}

    return PORTFOLIO_DATA;
  },

  /**
   * Save & Publish full portfolio content
   */
  async saveContent(newContent) {
    const token = this.getToken();

    // Cache locally always
    try {
      localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(newContent));
    } catch {}

    if (!token || token.startsWith('client_auth_')) {
      return { success: true, localOnly: true, data: newContent };
    }

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newContent),
      });

      const data = await res.json();
      if (data.success) {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.error };
    } catch (err) {
      return { success: true, localOnly: true, data: newContent };
    }
  },

  /**
   * Upload an asset file (image or PDF)
   * If server is online, uploads to /api/upload.
   * If server is offline, converts file to high-speed Base64 Data URL so upload never fails.
   */
  async uploadFile(file) {
    const token = this.getToken();

    // Try server upload first if token exists and isn't purely local
    if (token && !token.startsWith('client_auth_')) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            return data;
          }
        }
      } catch (err) {
        console.warn('Server upload failed, using local Data URL fallback');
      }
    }

    // Fallback: Convert file to Base64 Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          success: true,
          url: reader.result,
          filename: file.name,
          size: file.size,
          isLocal: true,
        });
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file on client'));
      };
      reader.readAsDataURL(file);
    });
  },
};
