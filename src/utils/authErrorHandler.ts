import { FirebaseError } from 'firebase/app';
import { trackEvent, AnalyticsEvents } from './analytics';

/**
 * Maps Firebase authentication error codes to user-friendly messages
 */
export const getAuthErrorMessage = (error: FirebaseError): string => {
  const errorCode = error.code || 'unknown';
  
  // Common error messages map
  const errorMessages: Record<string, string> = {
    // Email/Password authentication errors
    'auth/email-already-in-use': 'This email is already in use. Please try signing in instead.',
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Invalid email or password. Please try again.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later or reset your password.',
    'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
    
    // OAuth errors
    'auth/account-exists-with-different-credential': 'An account already exists with the same email address but different sign-in credentials.',
    'auth/popup-blocked': 'Sign-in popup was blocked by your browser. Please allow popups for this site.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completing the sign-in.',
    'auth/cancelled-popup-request': 'The sign-in process was cancelled.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
    
    // General errors
    'auth/network-request-failed': 'Network error. Please check your internet connection and try again.',
    'auth/timeout': 'The operation has timed out. Please try again.',
    'auth/internal-error': 'An internal error has occurred. Please try again later.'
  };
  
  return errorMessages[errorCode] || `Authentication error: ${error.message}`;
};

/**
 * Handles authentication errors by providing a user-friendly message and tracking the error
 * @param error - The Firebase error
 * @param context - The context in which the error occurred (e.g., 'email_sign_in')
 * @returns A user-friendly error message
 */
export const handleAuthError = (error: unknown, context: string): string => {
  // Track the error for analytics
  if (error instanceof Error) {
    trackEvent(AnalyticsEvents.ERROR, {
      error_type: 'auth_error',
      error_code: (error as FirebaseError).code || 'unknown',
      error_message: error.message,
      context
    });
  }
  
  // Return user-friendly message
  if ((error as FirebaseError).code) {
    return getAuthErrorMessage(error as FirebaseError);
  }
  
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Tracks successful authentication events
 * @param method - The authentication method used (e.g., 'email', 'google', 'github')
 * @param additionalData - Any additional data to track
 */
export const trackAuthSuccess = (method: string, additionalData?: Record<string, any>) => {
  trackEvent(AnalyticsEvents.LOGIN, {
    method,
    ...additionalData
  });
};

export default {
  getAuthErrorMessage,
  handleAuthError,
  trackAuthSuccess
}; 