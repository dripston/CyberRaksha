import { useState, useEffect } from "react";
import { User } from "@shared/schema";
import { authService, AuthUser } from "@/lib/authService";

export interface Profile {
  username: string;
  profession: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  rank: string;
}

export function useAuth() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Check for Google redirect result first
    const checkRedirectResult = async () => {
      try {
        const redirectResult = await authService.handleGoogleRedirect();
        if (redirectResult && isMounted) {
          setUser(redirectResult.user);
          setProfile(redirectResult.profile);
          saveProfileToLocalStorage(redirectResult.profile);
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    checkRedirectResult();

    // Listen to authentication state changes
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (!isMounted) return;

      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Try to get user profile from cache first
        let userProfile = getProfileFromLocalStorage();
        
        if (!userProfile) {
          // Create temporary profile since Firestore is disabled
          const username = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';
          userProfile = {
            username: username,
            profession: "User",
            avatar: "avatar1",
            xp: 0,
            level: 1,
            streak: 0,
            rank: "Bronze"
          };
          saveProfileToLocalStorage(userProfile);
        }
        
        setProfile(userProfile);
      } else {
        // User is signed out
        setUser(null);
        setProfile(null);
        clearProfileFromLocalStorage(); // Clear any cached data
      }
      
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Set authenticated user and profile (used by AuthModal)
  const setAuthenticatedUser = (firebaseUser: AuthUser, userProfile: Profile) => {
    setUser(firebaseUser);
    setProfile(userProfile);
    saveProfileToLocalStorage(userProfile); // Cache for quick access
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile || !user) return;
    
    try {
      const updatedProfile = { ...profile, ...updates };
      await authService.updateProfile(user.uid, updates);
      setProfile(updatedProfile);
      saveProfileToLocalStorage(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      // State will be updated by the auth state listener
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user && !!profile,
    setAuthenticatedUser,
    updateProfile,
    logout,
  };
}

// LocalStorage utilities
function saveProfileToLocalStorage(profile: Profile) {
  try {
    localStorage.setItem('cyberRakshaProfile', JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving profile to localStorage:', error);
  }
}

function getProfileFromLocalStorage(): Profile | null {
  try {
    const profileData = localStorage.getItem('cyberRakshaProfile');
    if (profileData) {
      return JSON.parse(profileData);
    }
  } catch (error) {
    console.error('Error parsing profile from localStorage:', error);
  }
  return null;
}

function clearProfileFromLocalStorage() {
  try {
    localStorage.removeItem('cyberRakshaProfile');
  } catch (error) {
    console.error('Error clearing profile from localStorage:', error);
  }
}
