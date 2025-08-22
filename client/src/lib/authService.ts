import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
// TEMPORARILY DISABLED Firestore imports
// import {
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc
// } from 'firebase/firestore';
import { auth } from './firebase'; // db temporarily disabled
import { Profile } from '@/hooks/useAuth';

export interface AuthUser extends FirebaseUser {}

export interface CreateAccountData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  // Create account with email and password
  async createAccount(data: CreateAccountData): Promise<{ user: AuthUser; profile: Profile }> {
    try {
      console.log('AuthService: Creating account with email:', data.email);
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log('AuthService: Account created successfully:', user.email);

      // Generate username from email (part before @)
      const username = data.email.split('@')[0];
      console.log('AuthService: Generated username:', username);

      // Update the user's display name
      await updateProfile(user, {
        displayName: username
      });
      console.log('AuthService: Updated display name');

      // Create user profile in Firestore with minimal data
      const profile: Profile = {
        username: username,
        profession: "User", // Default profession
        avatar: "avatar1", // Default avatar
        xp: 0,
        level: 1,
        streak: 0,
        rank: "Bronze"
      };

      console.log('AuthService: Skipping Firestore for now (debugging)...');
      // TODO: Re-enable Firestore after fixing connection
      // await setDoc(doc(db, 'profiles', user.uid), {
      //   ...profile,
      //   email: user.email,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString()
      // });
      console.log('AuthService: Profile created (memory only)');

      return { user, profile };
    } catch (error: any) {
      console.error('AuthService: Create account error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with email and password
  async signIn(data: SignInData): Promise<{ user: AuthUser; profile: Profile }> {
    try {
      console.log('AuthService: Attempting signInWithEmailAndPassword...');
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log('AuthService: Firebase auth successful, user:', user.email);

      // Temporary: Skip Firestore for debugging
      console.log('AuthService: Creating temporary profile (debugging)...');
      const username = user.displayName || data.email.split('@')[0];
      const profile = {
        username: username,
        profession: "User",
        avatar: "avatar1",
        xp: 0,
        level: 1,
        streak: 0,
        rank: "Bronze"
      };

      console.log('AuthService: Temporary profile created:', profile);
      return { user, profile };
    } catch (error: any) {
      console.error('AuthService: Sign in error:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<{ user: AuthUser; profile: Profile }> {
    try {
      console.log('🔑 AuthService: Creating Google auth provider...');
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      console.log('⚙️ AuthService: Provider scopes added');
      
      console.log('🌐 AuthService: Current auth state:', {
        user: auth.currentUser ? auth.currentUser.email : 'none',
        domain: window.location.hostname,
        url: window.location.href
      });
      
      console.log('🚀 AuthService: Initiating signInWithPopup...');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('✅ AuthService: Popup sign-in successful for user:', user.email);
      
      // Create temporary profile
      const username = user.displayName || user.email?.split('@')[0] || 'User';
      const profile = {
        username: username,
        profession: "User",
        avatar: "avatar1",
        xp: 0,
        level: 1,
        streak: 0,
        rank: "Bronze"
      };
      console.log('👤 AuthService: Created profile for popup sign-in:', profile);
      
      return { user, profile };
    } catch (error: any) {
      console.error('❌ AuthService: signInWithGoogle error:', error);
      console.log('🔍 AuthService: Error details:', { message: error.message, code: error.code });
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Handle Google sign-in redirect result
  async handleGoogleRedirect(): Promise<{ user: AuthUser; profile: Profile } | null> {
    try {
      console.log('🔍 AuthService: Calling getRedirectResult...');
      const result = await getRedirectResult(auth);
      if (!result) {
        console.log('ℹ️ AuthService: No redirect result found');
        return null; // No redirect result
      }
      const user = result.user;
      console.log('✅ AuthService: Redirect result found for user:', user.email);

      // Check if profile exists - TEMPORARILY DISABLED
      // let profile = await this.getUserProfile(user.uid);
      
      // Create temporary profile (debugging)
      const username = user.displayName || user.email?.split('@')[0] || 'User';
      const profile = {
        username: username,
        profession: "User",
        avatar: "avatar1",
        xp: 0,
        level: 1,
        streak: 0,
        rank: "Bronze"
      };
      console.log('👤 AuthService: Created temp profile:', profile);

      // TEMPORARILY DISABLED Firestore operations
      // await setDoc(doc(db, 'profiles', user.uid), {
      //   ...profile,
      //   email: user.email,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString()
      // });

      console.log('✨ AuthService: Returning user and profile');
      return { user, profile };
    } catch (error: any) {
      console.error('❌ AuthService: Error in handleGoogleRedirect:', error);
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Complete profile setup for existing user (e.g., Google sign-in users)
  async completeProfile(uid: string, profileData: Omit<Profile, 'xp' | 'level' | 'streak' | 'rank'>): Promise<Profile> {
    try {
      const profile: Profile = {
        ...profileData,
        xp: 0,
        level: 1,
        streak: 0,
        rank: "Bronze"
      };

      const user = auth.currentUser;
      if (user && !user.displayName) {
        await updateProfile(user, {
          displayName: profileData.username
        });
      }

      // TEMPORARILY DISABLED Firestore operations
      // await setDoc(doc(db, 'profiles', uid), {
      //   ...profile,
      //   email: user?.email,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString()
      // });

      return profile;
    } catch (error: any) {
      throw new Error('Failed to complete profile setup');
    }
  }

  // Get user profile from Firestore
  async getUserProfile(uid: string): Promise<Profile | null> {
    try {
      // TEMPORARILY DISABLED - return null to use default profile
      console.log('getUserProfile: Temporarily disabled, returning null');
      return null;
      
      // const docRef = doc(db, 'profiles', uid);
      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      //   return {
      //     username: data.username,
      //     profession: data.profession,
      //     avatar: data.avatar,
      //     xp: data.xp || 0,
      //     level: data.level || 1,
      //     streak: data.streak || 0,
      //     rank: data.rank || "Bronze"
      //   };
      // }
      // return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Update user profile
  async updateProfile(uid: string, updates: Partial<Profile>): Promise<void> {
    try {
      // TEMPORARILY DISABLED Firestore operations
      console.log('updateProfile: Temporarily disabled');
      // const docRef = doc(db, 'profiles', uid);
      // await updateDoc(docRef, {
      //   ...updates,
      //   updatedAt: new Date().toISOString()
      // });
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Failed to sign out');
    }
  }

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: AuthUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    return auth.currentUser;
  }

  // Helper method to format error messages
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  }
}

export const authService = new AuthService();
