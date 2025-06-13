import apiClient from '../lib/api';
import type { 
  Testimonial, 
  CreateTestimonialRequest,
  TestimonialListResponse,
  TestimonialDetailResponse
} from '../types/testimonial';

const TESTIMONIAL_ENDPOINTS = {
  CREATE: '/testimonials',
  GET_ALL: '/testimonials',
  DELETE: '/testimonials',
} as const;

export const testimonialService = {
  // Create a new testimonial
  createTestimonial: async (data: CreateTestimonialRequest): Promise<Testimonial> => {
    const response = await apiClient.post<TestimonialDetailResponse>(
      TESTIMONIAL_ENDPOINTS.CREATE,
      data
    );
    return response.data.data;
  },

  // Get all testimonials
  getAllTestimonials: async (): Promise<Testimonial[]> => {
    const response = await apiClient.get<TestimonialListResponse>(
      TESTIMONIAL_ENDPOINTS.GET_ALL
    );
    return response.data.data;
  },

  // Delete a testimonial
  deleteTestimonial: async (testimonialId: string): Promise<void> => {
    await apiClient.delete(`${TESTIMONIAL_ENDPOINTS.DELETE}/${testimonialId}`);
  },
}; 