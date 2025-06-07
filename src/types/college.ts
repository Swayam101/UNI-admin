export interface College {
  _id?: string;
  name: string;
  description: string;
  logoUrl?: string;
  instagramBusinessId?: string;
  instagramAccessToken?: string;
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

export interface CollegeResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: College | College[];
}

export interface CollegeListResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: College[];
}

export interface CollegeDetailResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: College;
} 