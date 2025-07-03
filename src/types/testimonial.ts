import { ApiResponse } from './api';

export interface Testimonial {
  _id?: string;
  name: string;
  profileImage: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateTestimonialRequest {
  name: string;
  file: File;
  message: string;
}

export type TestimonialResponse = ApiResponse<Testimonial | Testimonial[]>;

export type TestimonialListResponse = ApiResponse<{
  testimonials: Testimonial[],
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number
}>;

export type TestimonialDetailResponse = ApiResponse<Testimonial>; 