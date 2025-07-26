<<<<<<< HEAD
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { User } from '@shared/schema';

interface AuthUser extends User {
  // Add any additional client-side user properties if needed
=======

import { useQuery } from '@tanstack/react-query';

interface AdminUser {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role: 'admin';
  provider: 'admin';
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
}

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery({
<<<<<<< HEAD
    queryKey: ['auth', 'user'],
    queryFn: async (): Promise<AuthUser> => {
=======
    queryKey: ['auth', 'admin'],
    queryFn: async (): Promise<AdminUser> => {
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });
      if (!response.ok) {
<<<<<<< HEAD
        throw new Error('Not authenticated');
=======
        throw new Error('Admin authentication required');
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  const isAuthenticated = !!user && !error;
  const isAdmin = user?.role === 'admin';

  const logout = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch('/api/logout', {
        method: 'GET',
=======
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
        credentials: 'include'
      });
      
      if (response.ok) {
<<<<<<< HEAD
        const data = await response.json();
        // Invalidate the user query to update the UI
        refetch();
        // Redirect to home page as specified by server or default to home
        window.location.href = data.redirect || '/';
=======
        // Invalidate the user query to update the UI
        refetch();
        // Redirect to admin login
        window.location.href = '/admin-login';
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even if API call fails
<<<<<<< HEAD
      window.location.href = '/';
=======
      window.location.href = '/admin-login';
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    logout,
    refetch,
    error
  };
<<<<<<< HEAD
}
=======
}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
