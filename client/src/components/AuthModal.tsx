import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { authService, CreateAccountData, SignInData } from '@/lib/authService';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}


export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setAuthenticatedUser } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleModeSwitch = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    setError('');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    console.log('Attempting sign in with:', { email });

    try {
      const signInData: SignInData = { email, password };
      console.log('Calling authService.signIn...');
      const { user, profile } = await authService.signIn(signInData);
      console.log('Sign in successful:', { user: user.email, profile });
      setAuthenticatedUser(user, profile);
      handleClose();
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    console.log('Attempting sign up with:', { email });

    try {
      const createAccountData: CreateAccountData = {
        email,
        password
      };
      console.log('Calling authService.createAccount...');
      const { user, profile } = await authService.createAccount(createAccountData);
      console.log('Account created successfully:', { user: user.email, profile });
      setAuthenticatedUser(user, profile);
      handleClose();
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Account creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    console.log('Attempting Google sign in with redirect...');

    try {
      // This will initiate a redirect, so the page will reload
      await authService.signInWithGoogle();
      // We won't reach this line because of the redirect
    } catch (error: any) {
      console.error('Google sign in error:', error);
      if (error.message !== 'Redirect initiated') {
        setError(error.message || 'Google sign in failed');
      }
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-cyber-dark border border-cyber-light rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyber-primary to-cyber-accent rounded-xl flex items-center justify-center">
                <span className="font-mono text-xs text-cyber-bg font-bold">CR</span>
              </div>
              <h2 className="font-mono text-xl text-cyber-accent font-bold">
                {mode === 'signin' ? 'Welcome Back' : 'Join CyberRaksha'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-cyber-muted hover:text-cyber-text transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-4 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full mb-6 px-4 py-3 border border-cyber-light rounded-lg bg-cyber-bg hover:bg-cyber-light/5 text-cyber-text font-mono transition-colors flex items-center justify-center space-x-3"
          >
            <span className="text-lg">🚀</span>
            <span>Continue with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cyber-light/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-cyber-dark text-cyber-muted">or</span>
            </div>
          </div>

          {/* Sign In Form */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-mono text-cyber-accent">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-bg border border-cyber-light rounded-lg text-cyber-text focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-mono text-cyber-accent">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-cyber-bg border border-cyber-light rounded-lg text-cyber-text focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary outline-none transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-muted hover:text-cyber-text"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full modern-button py-3 font-mono rounded-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-mono text-cyber-accent">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cyber-bg border border-cyber-light rounded-lg text-cyber-text focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-mono text-cyber-accent">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-cyber-bg border border-cyber-light rounded-lg text-cyber-text focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary outline-none transition-colors"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-muted hover:text-cyber-text"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full modern-button py-3 font-mono rounded-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Mode Switch */}
          <div className="mt-6 text-center text-sm text-cyber-muted">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => handleModeSwitch('signup')}
                  className="text-cyber-accent hover:text-cyber-primary font-mono"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => handleModeSwitch('signin')}
                  className="text-cyber-accent hover:text-cyber-primary font-mono"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
