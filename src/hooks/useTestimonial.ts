import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryResult,
  UseMutationResult 
} from '@tanstack/react-query';
import { testimonialService } from '../services/testimonialService';
import type { 
  Testimonial, 
  CreateTestimonialRequest 
} from '../types/testimonial';

// Query Keys
export const TESTIMONIAL_QUERY_KEYS = {
  all: ['testimonials'] as const,
  lists: () => [...TESTIMONIAL_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, string | number | boolean>) => [...TESTIMONIAL_QUERY_KEYS.lists(), { filters }] as const,
};

// Hooks for Queries
export const useTestimonials = (): UseQueryResult<Testimonial[], Error> => {
  return useQuery({
    queryKey: TESTIMONIAL_QUERY_KEYS.lists(),
    queryFn: testimonialService.getAllTestimonials,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hooks for Mutations
export const useCreateTestimonial = (): UseMutationResult<Testimonial, Error, CreateTestimonialRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: testimonialService.createTestimonial,
    onSuccess: (data) => {
      // Invalidate and refetch testimonials list
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.lists() });
      
      console.log('Testimonial created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating testimonial:', error);
    },
  });
};

export const useDeleteTestimonial = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: testimonialService.deleteTestimonial,
    onSuccess: () => {
      // Invalidate and refetch testimonials list
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.lists() });
      
      console.log('Testimonial deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting testimonial:', error);
    },
  });
};

// Utility hook to get query client for manual cache updates
export const useTestimonialQueryClient = () => {
  const queryClient = useQueryClient();
  
  return {
    invalidateAllTestimonials: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.all });
    },
    invalidateTestimonialsList: () => {
      queryClient.invalidateQueries({ queryKey: TESTIMONIAL_QUERY_KEYS.lists() });
    },
  };
}; 