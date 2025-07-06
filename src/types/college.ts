export interface College {
  _id?: string;
  name: string;
  username: string;
  profileImage: string;
  instagramBusinessId: string;
  instagramAccessToken: string;
  logoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCollegeRequest {
  name: string;
  username: string;
  file: File;
  instagramBusinessId: string;
  instagramAccessToken: string;
}

export interface UpdateCollegeRequest {
  name?: string;
  username?: string;
  file?: File;
  instagramBusinessId?: string;
  instagramAccessToken?: string;
}

import { ApiResponse, LegacyApiResponse } from './api';

export type CollegeResponse = ApiResponse<College | College[]>;

export type CollegeListResponse = ApiResponse<{
  colleges: College[],
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number
}>;

export type CollegeDetailResponse = ApiResponse<College>;

// Legacy response types for backward compatibility
export type LegacyCollegeResponse = LegacyApiResponse<College | College[]>;

export type LegacyCollegeListResponse = LegacyApiResponse<College[]>;

export type LegacyCollegeDetailResponse = LegacyApiResponse<College>; 