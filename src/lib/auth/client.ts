'use client';

import type { User } from '@/types/user';
import type { LoginRequest, ApiResponse } from '@/types/auth';
import { config } from '@/config';
import { store } from '@/store';
import { loginStart, loginSuccess, loginFailure, logout, setUser } from '@/store/authSlice';

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { username, password } = params;

    store.dispatch(loginStart());

    try {
      const response = await fetch(`${config.api.baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password } as LoginRequest),
      });

      if (!response.ok) {
        const error = 'Login failed';
        store.dispatch(loginFailure(error));
        return { error };
      }

      const apiResponse: ApiResponse = await response.json();

      if (!apiResponse.success) {
        const error = apiResponse.message || 'Login failed';
        store.dispatch(loginFailure(error));
        return { error };
      }

      if (apiResponse.data?.token) {
        store.dispatch(loginSuccess({ user: user, token: apiResponse.data.token }));
      }

      return {};
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Network error';
      store.dispatch(loginFailure(errorMessage));
      return { error: errorMessage };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Check Redux state first
    const state = store.getState();
    if (state.auth.user) {
      return { data: state.auth.user };
    }

    // Check token in localStorage (for initial load)
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      store.dispatch(setUser(null));
      return { data: null };
    }

    // For now, set the hardcoded user if token exists
    store.dispatch(setUser(user));
    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    store.dispatch(logout());

    return {};
  }
}

export const authClient = new AuthClient();
