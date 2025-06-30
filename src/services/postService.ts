import apiClient from '../lib/api';
import { ApiResponse } from '../types/api';

export interface Post {
  _id: string;
  title: string;
  content: string;
  images: string[];
  videos: string[];
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  college: {
    _id: string;
    name: string;
  };
  likesCount: number;
  likedBy: string[];
  tags: string[];
  isPublished: boolean;
  isArchived: boolean;
  isPostedToInstagram: boolean;
  allowComments: boolean;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  isLiked?: boolean;
}

export interface PostsResponse {
  posts: Post[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  college?: string;
  tags?: string[];
  lastDays?: number;
  isPublished?: boolean;
  isArchived?: boolean;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  images?: string[];
  videos?: string[];
  tags?: string[];
  isPublished?: boolean;
  isArchived?: boolean;
  allowComments?: boolean;
  scheduledAt?: string;
}

export interface UpdateInstagramWindowRequest {
  start: number;
  end: number;
  frequencyInMinutes: number;
}

export interface InstagramWindowConfig {
  instagramPostWindowStart: number;
  instagramPostWindowEnd: number;
  instagramPostFrequencyInMinutes: number;
}

export interface UpdatePricingRequest {
  post: number;
  premium: number;
}

export interface PricingConfig {
  pricing: {
    post: number;
    premium: number;
  };
}

export class PostService {
  /**
   * Get all posts with pagination and filters
   */
  static async getAllPosts(params: GetPostsParams = {}): Promise<ApiResponse<PostsResponse>> {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        sortBy,
        college,
        tags = [],
        lastDays,
        isPublished,
        isArchived
      } = params;

      const queryParams: Record<string, string|undefined> = {
        page: page.toString(),
        limit: limit.toString(),
        search,
      };

      if (sortBy) queryParams.sortBy = sortBy;
      if (college) queryParams.college = college;
      if (lastDays) queryParams.lastDays = lastDays.toString();
      if (typeof isPublished === 'boolean') queryParams.isPublished = isPublished.toString();
      if (typeof isArchived === 'boolean') queryParams.isArchived = isArchived.toString();
      
      // Handle tags array
      if (tags.length > 0) {
        queryParams.tags = tags.join(',');
      }

      const response = await apiClient.get<ApiResponse<PostsResponse>>(
        '/post/allRawPosts',
        { params: queryParams }
      );
      
      console.log("Posts fetched:", response);
      return response;
    } catch (error) {
      console.error('Get posts error:', error);
      throw error;
    }
  }

  /**
   * Update a post by ID
   */
  static async updatePost(postId: string, postData: UpdatePostRequest): Promise<ApiResponse<Post>> {
    try {
      const response = await apiClient.patch<ApiResponse<Post>>(
        `/post/updatePostById/${postId}`,
        postData
      );
      
      console.log("Post updated:", response);
      return response;
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  }

  /**
   * Get Instagram posting window configuration
   */
  static async getInstagramWindow(): Promise<ApiResponse<InstagramWindowConfig>> {
    try {
      const response = await apiClient.get<ApiResponse<InstagramWindowConfig>>(
        '/users/instagram-window'
      );
      
      console.log("Instagram window fetched:", response);
      return response;
    } catch (error) {
      console.error('Get Instagram window error:', error);
      throw error;
    }
  }

  /**
   * Update Instagram posting window configuration
   */
  static async updateInstagramWindow(data: UpdateInstagramWindowRequest): Promise<ApiResponse<InstagramWindowConfig>> {
    try {
      const response = await apiClient.post<ApiResponse<InstagramWindowConfig>>(
        '/users/instagram-window',
        data
      );
      
      console.log("Instagram window updated:", response);
      return response;
    } catch (error) {
      console.error('Update Instagram window error:', error);
      throw error;
    }
  }

  /**
   * Update pricing configuration
   */
  static async updatePricing(data: UpdatePricingRequest): Promise<ApiResponse<PricingConfig>> {
    try {
      const response = await apiClient.post<ApiResponse<PricingConfig>>(
        '/users/pricing',
        data
      );
      
      console.log("Pricing updated:", response);
      return response;
    } catch (error) {
      console.error('Update pricing error:', error);
      throw error;
    }
  }
}