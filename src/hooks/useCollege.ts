import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryResult,
  UseMutationResult 
} from '@tanstack/react-query';
import { collegeService } from '../services/collegeService';
import type { 
  College, 
  CreateCollegeRequest, 
  UpdateCollegeRequest 
} from '../types/college';

// Query Keys
export const COLLEGE_QUERY_KEYS = {
  all: ['colleges'] as const,
  lists: () => [...COLLEGE_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, string | number | boolean>) => [...COLLEGE_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...COLLEGE_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...COLLEGE_QUERY_KEYS.details(), id] as const,
};

// Hooks for Queries
export const useColleges = (): UseQueryResult<College[], Error> => {
  return useQuery({
    queryKey: COLLEGE_QUERY_KEYS.lists(),
    queryFn: collegeService.getAllColleges,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

export const useCollege = (id: string): UseQueryResult<College, Error> => {
  return useQuery({
    queryKey: COLLEGE_QUERY_KEYS.detail(id),
    queryFn: () => collegeService.getCollegeById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hooks for Mutations
export const useCreateCollege = (): UseMutationResult<College, Error, CreateCollegeRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeService.createCollege,
    onSuccess: (data) => {
      // Invalidate and refetch colleges list
      queryClient.invalidateQueries({ queryKey: COLLEGE_QUERY_KEYS.lists() });
      
      // Add the new college to cache
      queryClient.setQueryData(COLLEGE_QUERY_KEYS.detail(data._id!), data);
      
      console.log('College created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating college:', error);
    },
  });
};

export const useUpdateCollege = (): UseMutationResult<College, Error, { id: string; data: UpdateCollegeRequest }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => collegeService.updateCollegeById(id, data),
    onSuccess: (data, variables) => {
      // Update the specific college in cache
      queryClient.setQueryData(COLLEGE_QUERY_KEYS.detail(variables.id), data);
      
      // Invalidate colleges list to reflect changes
      queryClient.invalidateQueries({ queryKey: COLLEGE_QUERY_KEYS.lists() });
      
      console.log('College updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating college:', error);
    },
  });
};

export const useDeleteCollege = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collegeService.deleteCollegeById,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: COLLEGE_QUERY_KEYS.detail(deletedId) });
      
      // Invalidate colleges list
      queryClient.invalidateQueries({ queryKey: COLLEGE_QUERY_KEYS.lists() });
      
      console.log('College deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting college:', error);
    },
  });
};

// Utility hook to get query client for manual cache updates
export const useCollegeQueryClient = () => {
  const queryClient = useQueryClient();
  
  return {
    invalidateAllColleges: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_QUERY_KEYS.all });
    },
    invalidateCollegesList: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_QUERY_KEYS.lists() });
    },
    invalidateCollege: (id: string) => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_QUERY_KEYS.detail(id) });
    },
    prefetchCollege: async (id: string) => {
      await queryClient.prefetchQuery({
        queryKey: COLLEGE_QUERY_KEYS.detail(id),
        queryFn: () => collegeService.getCollegeById(id),
        staleTime: 5 * 60 * 1000,
      });
    },
  };
}; 