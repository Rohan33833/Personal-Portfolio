import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { cmsApi } from '../services/cmsApi';

const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
  const [data, setData] = useState(PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await cmsApi.fetchContent();
      if (content) {
        setData(content);
      }
    } catch (err) {
      console.error('Failed to load portfolio content:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
  }, []);

  // Save & publish all changes to backend & local cache
  const saveAndPublish = useCallback(async (customData = null) => {
    setIsSaving(true);
    const payloadToSave = customData || data;
    try {
      const res = await cmsApi.saveContent(payloadToSave);
      if (res.success && res.data) {
        setData(res.data);
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
  }, []);

  return (
    <PortfolioDataContext.Provider
      value={{
        data,
        portfolioData: data, // alias for convenience
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
    // Fallback if rendered outside provider
    return {
      data: PORTFOLIO_DATA,
      portfolioData: PORTFOLIO_DATA,
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
