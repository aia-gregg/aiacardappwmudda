import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../backend/config';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  photo?: string;
  birthday?: string;
  address?: string;
  town?: string;
  postCode?: string;
  country?: string;
  referralId?: string;
}

interface AuthContextType {
  user: User | null;
  userToken: string | null;
  setUser: (user: User | null) => void;
  setUserToken: (token: string | null) => void;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (updatedUser: Partial<User>) => Promise<void>;
  // Added this function for password changes
  updateUserPassword?: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  setUser: () => {},
  setUserToken: () => {},
  refreshUser: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
  updateUserPassword: async () => {}, // default no-op
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load token & user info on app start
  useEffect(() => {
    const loadTokenAndUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        if (token) setUserToken(token);
        if (userData) setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error loading token/user:', error);
      }
    };
    loadTokenAndUser();
  }, []);

  // Persist user info changes to AsyncStorage
  useEffect(() => {
    const updateStorage = async () => {
      if (user) {
        await AsyncStorage.setItem('userData', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('userData');
      }
    };
    updateStorage();
  }, [user]);

  // Persist token changes to AsyncStorage
  useEffect(() => {
    const updateTokenStorage = async () => {
      if (userToken) {
        await AsyncStorage.setItem('userToken', userToken);
      } else {
        await AsyncStorage.removeItem('userToken');
      }
    };
    updateTokenStorage();
  }, [userToken]);

  // Function to force reload user data from AsyncStorage
  const refreshUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  // Sign-out function to clear AsyncStorage and reset context state
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setUserToken(null);
      setUser(null);
      console.log("User successfully signed out. AsyncStorage cleared.");
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  // Existing function for editing user profile (including email).
  const updateUserProfile = async (updatedUser: Partial<User>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateProfile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, ...updatedUser }),
      });
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message);
      }
      console.log("Information updated on MongoDB:", jsonResponse.user);

      // If server returns a new token, store it
      if (jsonResponse.token) {
        setUserToken(jsonResponse.token);
      } else {
        console.warn("⚠️ Warning: No token received from backend.");
      }

      setUser(jsonResponse.user);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // New function for changing password if there's a separate endpoint
  const updateUserPassword = async (oldPassword: string, newPassword: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword,
        }),
      });
      const text = await response.text();
      // Attempt to parse JSON from response
      const jsonResponse = JSON.parse(text);
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message);
      }
      console.log("Password updated. Response:", jsonResponse);
      if (jsonResponse.token) {
        setUserToken(jsonResponse.token);
      }
      setUser(jsonResponse.user);
    } catch (error) {
      console.error('Error changing user password:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        setUser,
        setUserToken,
        refreshUser,
        signOut,
        updateUserProfile,
        updateUserPassword, // Expose the new function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};