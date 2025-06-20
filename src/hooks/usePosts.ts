import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PostService, GetPostsParams, UpdatePostRequest, UpdateInstagramWindowRequest, UpdatePricingRequest } from '../services/postService';
import { notifications } from '@mantine/notifications';

// Query keys for caching
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: GetPostsParams) => [...postKeys.lists(), params] as const,
};

/**
 * Hook to get all posts with pagination and filters
 */
export const useGetAllPosts = (params: GetPostsParams = {}) => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => PostService.getAllPosts(params),
  });
};

/**
 * Hook to update a post
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, postData }: { postId: string; postData: UpdatePostRequest }) => 
      PostService.updatePost(postId, postData),
    onSuccess: () => {
      // Invalidate and refetch posts lists
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      
      notifications.show({
        title: 'Post Updated',
        message: 'Post has been successfully updated',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      console.error('Update post error:', error);
      
      notifications.show({
        title: 'Update Failed',
        message: 'Failed to update the post. Please try again.',
        color: 'red',
      });
    },
  });
};

/**
 * Hook to update Instagram posting window configuration
 */
export const useUpdateInstagramWindow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateInstagramWindowRequest) => 
      PostService.updateInstagramWindow(data),
    onSuccess: () => {
      // Invalidate and refetch posts lists since posting schedule might affect them
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      
      notifications.show({
        title: 'Settings Updated',
        message: 'Instagram posting window settings have been updated successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      console.error('Update Instagram window error:', error);
      
      notifications.show({
        title: 'Update Failed',
        message: 'Failed to update Instagram posting settings. Please try again.',
        color: 'red',
      });
    },
  });
};

/**
 * Hook to update pricing configuration
 */
export const useUpdatePricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePricingRequest) => 
      PostService.updatePricing(data),
    onSuccess: () => {
      // Invalidate and refetch posts lists since pricing might affect them
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      
      notifications.show({
        title: 'Pricing Updated',
        message: 'Pricing settings have been updated successfully',
        color: 'green',
      });
    },
    onError: (error: unknown) => {
      console.error('Update pricing error:', error);
      
      notifications.show({
        title: 'Update Failed',
        message: 'Failed to update pricing settings. Please try again.',
        color: 'red',
      });
    },
  });
};
