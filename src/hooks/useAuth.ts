import { useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAnalytics } from './useAnalytics';
import { handleAuthError, trackAuthSuccess } from '../utils/authErrorHandler';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const { trackUserAction } = useAnalytics();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState(prev => ({ ...prev, user, loading: false }));
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signInWithEmailAndPassword(auth, email, password);
      trackAuthSuccess('email_signin');
      trackUserAction('email_sign_in');
    } catch (err: any) {
      const errorMessage = handleAuthError(err, 'email_sign_in');
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      trackAuthSuccess('email_signup', { with_display_name: !!displayName });
      trackUserAction('email_sign_up');
    } catch (err: any) {
      const errorMessage = handleAuthError(err, 'email_sign_up');
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const logOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await signOut(auth);
      trackUserAction('sign_out');
    } catch (err: any) {
      const errorMessage = handleAuthError(err, 'sign_out');
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const signInWithGoogle = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Create a new Google provider instance
      const googleProvider = new GoogleAuthProvider();
      
      // Add scopes
      googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
      googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      
      await signInWithPopup(auth, googleProvider);
      trackAuthSuccess('google');
      trackUserAction('google_sign_in');
    } catch (err: any) {
      const errorMessage = handleAuthError(err, 'google_sign_in');
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const signInWithGithub = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Create a new GitHub provider instance
      const githubProvider = new GithubAuthProvider();
      
      // Add scopes
      githubProvider.addScope('user:email');
      githubProvider.addScope('read:user');
      
      await signInWithPopup(auth, githubProvider);
      trackAuthSuccess('github');
      trackUserAction('github_sign_in');
    } catch (err: any) {
      const errorMessage = handleAuthError(err, 'github_sign_in');
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const resetPassword = async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await sendPasswordResetEmail(auth, email);
      trackUserAction('password_reset_request');
    } catch (err: any) {
      const errorMessage = handleAuthError(err, 'password_reset_request');
      setState(prev => ({ ...prev, error: errorMessage }));
      throw err;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    logOut,
    signInWithGoogle,
    signInWithGithub,
    resetPassword,
    clearError
  };
};

export default useAuth; 