import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryResult,
  UseMutationResult 
} from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { 
  User, 
  UpdateUserRequest 
} from '../types/user';

// Query Keys
export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  lists: () => [...USER_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, string | number | boolean>) => [...USER_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...USER_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...USER_QUERY_KEYS.details(), id] as const,
};

// Hooks for Queries
export const useUsers = (): UseQueryResult<User[], Error> => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.lists(),
    queryFn: userService.getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUser = (id: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hooks for Mutations
export const useUpdateUser = (): UseMutationResult<User, Error, { id: string; data: UpdateUserRequest }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUserById(id, data),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(USER_QUERY_KEYS.detail(variables.id), data);
      
      // Invalidate users list to reflect changes
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
      
      console.log('User updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });
};

// Utility hook to get query client for manual cache updates
export const useUserQueryClient = () => {
  const queryClient = useQueryClient();
  
  return {
    invalidateAllUsers: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
    },
    invalidateUsersList: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.lists() });
    },
    invalidateUser: (id: string) => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.detail(id) });
    },
    prefetchUser: async (id: string) => {
      await queryClient.prefetchQuery({
        queryKey: USER_QUERY_KEYS.detail(id),
        queryFn: () => userService.getUserById(id),
        staleTime: 5 * 60 * 1000,
      });
    },
  };
}; 