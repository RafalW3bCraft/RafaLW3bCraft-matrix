import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { User } from '@shared/schema';

interface AuthUser extends User {
  // Add any additional client-side user properties if needed
}

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async (): Promise<AuthUser> => {
      const response = await fetch('/api/auth/user', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Not authenticated');
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
      const response = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        // Invalidate the user query to update the UI
        refetch();
        // Redirect to home page as specified by server or default to home
        window.location.href = data.redirect || '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even if API call fails
      window.location.href = '/';
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
}