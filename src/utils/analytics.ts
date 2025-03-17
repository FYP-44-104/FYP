import { logEvent } from 'firebase/analytics';
import { analytics } from '../config/firebase';

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

// Predefined events
export const AnalyticsEvents = {
  // Authentication events
  LOGIN: 'login',
  SIGNUP: 'sign_up',
  LOGOUT: 'logout',
  PASSWORD_RESET: 'password_reset',
  
  // User actions
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  SEARCH: 'search',
  
  // Feature usage
  FEATURE_USE: 'feature_use',
  SETTINGS_CHANGE: 'settings_change',
  
  // Error events
  ERROR: 'error',
  EXCEPTION: 'exception',
  
  // Page views
  PAGE_VIEW: 'page_view',
  SCREEN_VIEW: 'screen_view',
  
  // Custom events
  CUSTOM_EVENT: 'custom_event'
} as const;

// Example usage:
// trackEvent(AnalyticsEvents.LOGIN, { method: 'google' });
// trackEvent(AnalyticsEvents.FEATURE_USE, { feature: 'dashboard' });
// trackEvent(AnalyticsEvents.ERROR, { error: 'auth_failed' }); 