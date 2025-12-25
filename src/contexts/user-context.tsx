'use client';

import * as React from 'react';
import { useSelector } from 'react-redux';

import type { User } from '@/types/user';
import type { RootState } from '@/store';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      await authClient.getUser();
    } catch (error) {
      logger.error(error);
    }
  }, []);

  return <UserContext.Provider value={{ user, error, isLoading, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
