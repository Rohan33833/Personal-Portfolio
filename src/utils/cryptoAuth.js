/**
 * Cryptographic Authentication Service
 * Uses Web Crypto API (SHA-256) so secret triggers and passwords are never
 * stored or transmitted in plaintext.
 */

// SHA-256 hash helper function
export async function sha256(text) {
  const normalized = text.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pre-computed SHA-256 hashes of recognized secret trigger commands
const AUTHORIZED_TRIGGER_HASHES = new Set([
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  '18502e7606798a08141fa5068474ca205c29db87542955119cee097c28db371f',
  '24e5e1c2bbef565360c392851175f46821fc21d6725503a600353625b4c9209c',
  '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2',
  '18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',
  'd073be486a48f763db3ea97fbcebe219da6d400494cf01cc7a69b76e1074a3f7',
  '787600ebe6d6c75b6bc0b2db0bfd6aeec78897b67d3192e2208bc8b714237841',
]);

// Authorized passcode hashes
const AUTHORIZED_PASSWORD_HASHES = new Set([
  '9407b28cf7f7eed483e1ed5360cfe97235891b14d6a1b687c91904dbe6a5ec7b',
  '175fe25e87635a040e8e2177232def9001bf05d757cee3848ecc112006426091',
  '6051fc84a7a0d74c225fb18a496b09952da5642e60723ecae543298edd7d82d6',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  '787600ebe6d6c75b6bc0b2db0bfd6aeec78897b67d3192e2208bc8b714237841',
  '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2',
  '0e6a8e0b849ed9b064c5a25e1ee5592f427e3eb9d250e42069ce46147d00e8d4',
]);

const SESSION_AUTH_KEY = 'portfolio_admin_auth_token';

/**
 * Checks if an entered command string matches a secret trigger keyword
 */
export async function isSecretTrigger(cmdStr) {
  if (!cmdStr) return false;
  
  // Also check custom env trigger if provided
  const envTrigger = import.meta.env.VITE_SECRET_TRIGGER_HASH;
  if (envTrigger) {
    AUTHORIZED_TRIGGER_HASHES.add(envTrigger.toLowerCase());
  }

  const hash = await sha256(cmdStr);
  return AUTHORIZED_TRIGGER_HASHES.has(hash);
}

/**
 * Verifies admin password hash against authorized hashes
 */
export async function verifyAdminPasscode(passcode) {
  if (!passcode) return false;

  const envPassHash = import.meta.env.VITE_ADMIN_PASS_HASH;
  if (envPassHash) {
    AUTHORIZED_PASSWORD_HASHES.add(envPassHash.toLowerCase());
  }

  const hash = await sha256(passcode);
  const isValid = AUTHORIZED_PASSWORD_HASHES.has(hash);

  if (isValid) {
    // Generate secure session token with expiry timestamp
    const tokenData = {
      authenticated: true,
      timestamp: Date.now(),
      expiresAt: Date.now() + 4 * 60 * 60 * 1000, // 4 hours valid
    };
    try {
      sessionStorage.setItem(SESSION_AUTH_KEY, JSON.stringify(tokenData));
    } catch {
      // Ignore sessionStorage issues if private mode blocks it
    }
  }

  return isValid;
}

/**
 * Checks if current session is authenticated
 */
export function isSessionAuthenticated() {
  try {
    const raw = sessionStorage.getItem(SESSION_AUTH_KEY);
    if (!raw) return false;
    const token = JSON.parse(raw);
    if (token.authenticated && token.expiresAt > Date.now()) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Clears current admin session
 */
export function logoutAdminSession() {
  try {
    sessionStorage.removeItem(SESSION_AUTH_KEY);
  } catch {}
}
