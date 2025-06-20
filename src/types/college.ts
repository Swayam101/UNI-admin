export interface College {
  _id?: string;
  name: string;
  description: string;
  logoUrl?: string;
  instagramBusinessId?: string;
  instagramAccessToken?: string;
  isInstagramActive?: boolean;
  websiteUrl?: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  socialLinks?: string[];
  coursesOffered?: string[];
  accreditation?: string;
  establishedYear?: number;
  campusSize?: string;
  facilities?: string[];
  principalName?: string;
  principalContact?: string;
  admissionContactEmail?: string;
  admissionContactPhone?: string;
  faxNumber?: string;
  motto?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCollegeRequest {
  name: string;
  description: string;
  logoUrl?: string;
  instagramBusinessId?: string;
  instagramAccessToken?: string;
  isInstagramActive?: boolean;
  websiteUrl?: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  socialLinks?: string[];
  coursesOffered?: string[];
  accreditation?: string;
  establishedYear?: number;
  campusSize?: string;
  facilities?: string[];
  principalName?: string;
  principalContact?: string;
  admissionContactEmail?: string;
  admissionContactPhone?: string;
  faxNumber?: string;
  motto?: string;
}

export interface UpdateCollegeRequest {
  name?: string;
  description?: string;
  logoUrl?: string;
  instagramBusinessId?: string;
  instagramAccessToken?: string;
  isInstagramActive?: boolean;
  websiteUrl?: string;
  email?: string;
  phoneNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  socialLinks?: string[];
  coursesOffered?: string[];
  accreditation?: string;
  establishedYear?: number;
  campusSize?: string;
  facilities?: string[];
  principalName?: string;
  principalContact?: string;
  admissionContactEmail?: string;
  admissionContactPhone?: string;
  faxNumber?: string;
  motto?: string;
}

import { ApiResponse, LegacyApiResponse } from './api';

export type CollegeResponse = ApiResponse<College | College[]>;

export type CollegeListResponse = ApiResponse<{
  colleges: College[],
  totalDocs: number,
  currentPage: number,
  pages: number
}>;

export type CollegeDetailResponse = ApiResponse<College>;

// Legacy response types for backward compatibility
export type LegacyCollegeResponse = LegacyApiResponse<College | College[]>;

export type LegacyCollegeListResponse = LegacyApiResponse<College[]>;

export type LegacyCollegeDetailResponse = LegacyApiResponse<College>; 