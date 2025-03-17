import { useCallback } from 'react';
import { trackEvent, AnalyticsEvents } from '../utils/analytics';

export const useAnalytics = () => {
  const track = useCallback((eventName: keyof typeof AnalyticsEvents, eventParams?: Record<string, any>) => {
    trackEvent(AnalyticsEvents[eventName], eventParams);
  }, []);

  const trackPageView = useCallback((pageName: string) => {
    track('PAGE_VIEW', { page_name: pageName });
  }, [track]);

  const trackUserAction = useCallback((action: string, params?: Record<string, any>) => {
    track('BUTTON_CLICK', { action, ...params });
  }, [track]);

  const trackError = useCallback((error: Error, context?: string) => {
    track('ERROR', {
      error_message: error.message,
      error_stack: error.stack,
      context
    });
  }, [track]);

  const trackFeatureUse = useCallback((feature: string, params?: Record<string, any>) => {
    track('FEATURE_USE', { feature, ...params });
  }, [track]);

  return {
    track,
    trackPageView,
    trackUserAction,
    trackError,
    trackFeatureUse
  };
}; 