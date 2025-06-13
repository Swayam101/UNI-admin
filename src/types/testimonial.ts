export interface Testimonial {
  _id?: string;
  user: {
    _id: string;
    email: string;
    // Additional user fields that might be populated
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    studying?: string;
    collegeGraduationYear?: string;
  };
  message: string;
  createdBy?: string; // Admin who created the testimonial
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateTestimonialRequest {
  user: string; // MongoDB ObjectId as string
  message: string;
}

export interface UpdateTestimonialRequest {
  message?: string;
  isActive?: boolean;
}

export interface TestimonialResponse {
  status: number;
  message: string;
  data: Testimonial | Testimonial[];
}

export interface TestimonialListResponse {
  status: number;
  message: string;
  data: Testimonial[];
}

export interface TestimonialDetailResponse {
  status: number;
  message: string;
  data: Testimonial;
} 