import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { cmsApi } from '../services/cmsApi';

const LOCAL_CONTENT_KEY = 'portfolio_cms_content_cache_v1';

// Helper to get cached data immediately on initial render
const getInitialData = () => {
  try {
    const cached = localStorage.getItem(LOCAL_CONTENT_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch {}
  return PORTFOLIO_DATA;
};

const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
  const [data, setDataState] = useState(getInitialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Wrapper for setData that automatically persists to localStorage immediately
  const setData = useCallback((updater) => {
    setDataState((prev) => {
      const nextData = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(nextData));
        // Dispatch custom storage event for same-tab and multi-tab listeners
        window.dispatchEvent(new Event('portfolio_data_updated'));
      } catch (err) {
        console.warn('Failed to persist to localStorage:', err);
      }
      return nextData;
    });
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await cmsApi.fetchContent();
      if (content && typeof content === 'object') {
        setDataState(content);
        try {
          localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(content));
        } catch {}
      }
    } catch (err) {
      console.error('Failed to load portfolio content:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync across different browser tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === LOCAL_CONTENT_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setDataState(parsed);
        } catch {}
      }
    };

    const handleCustomUpdate = () => {
      try {
        const cached = localStorage.getItem(LOCAL_CONTENT_KEY);
        if (cached) {
          setDataState(JSON.parse(cached));
        }
      } catch {}
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('portfolio_data_updated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolio_data_updated', handleCustomUpdate);
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Update specific sections
  const updateSection = useCallback((sectionKey, updatedSectionData) => {
    setData((prev) => ({
      ...prev,
      [sectionKey]: updatedSectionData,
    }));
  }, [setData]);

  // Save & publish all changes to backend & local cache
  const saveAndPublish = useCallback(async (customData = null) => {
    setIsSaving(true);
    const payloadToSave = customData || data;
    try {
      const res = await cmsApi.saveContent(payloadToSave);
      if (res.success && res.data) {
        setDataState(res.data);
      }
      return res;
    } catch (err) {
      console.error('Error saving content:', err);
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  }, [data]);

  // Reset to default seed data
  const resetToDefault = useCallback(async () => {
    setData(PORTFOLIO_DATA);
    await cmsApi.saveContent(PORTFOLIO_DATA);
  }, [setData]);

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        portfolioData: data,
        isLoading,
        isSaving,
        error,
        refreshData: loadData,
        updateSection,
        saveAndPublish,
        resetToDefault,
        setData,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) {
    return {
      data: getInitialData(),
      portfolioData: getInitialData(),
      isLoading: false,
      isSaving: false,
      error: null,
      refreshData: () => {},
      updateSection: () => {},
      saveAndPublish: async () => ({ success: true }),
      resetToDefault: () => {},
      setData: () => {},
    };
  }
  return ctx;
};
