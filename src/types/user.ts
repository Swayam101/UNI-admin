export interface Location {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  dob?: string;
  email: string;
  token?: string;
  mobileNumber?: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  address?: string;
  location?: Location;
  housing?: string;
  religion?: string;
  zodiac?: string;
  gender?: 'male' | 'female' | 'other';
  role?: 'student' | 'admin' | 'moderator';
  bio?: string;
  personality?: string;
  sleepSchedule?: string;
  cleanliness?: string;
  guests?: string;
  substances?: string;
  physicalActivity?: string;
  pastimes?: string;
  food?: string;
  studying?: string;
  interests?: string[];
  instagram?: string;
  snapchat?: string;
  twitter?: string;
  collegeGraduationYear?: string;
  isPremium?: boolean;
  isApproved?: boolean;
  isPostedToInstagram?: boolean;
  allowPublish?: boolean;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  token?: string;
  mobileNumber?: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  address?: string;
  location?: Location;
  housing?: string;
  religion?: string;
  zodiac?: string;
  gender?: 'male' | 'female' | 'other';
  role?: 'student' | 'admin' | 'moderator';
  bio?: string;
  personality?: string;
  sleepSchedule?: string;
  cleanliness?: string;
  guests?: string;
  substances?: string;
  physicalActivity?: string;
  pastimes?: string;
  food?: string;
  studying?: string;
  interests?: string[];
  instagram?: string;
  snapchat?: string;
  twitter?: string;
  collegeGraduationYear?: string;
  isPremium?: boolean;
  isApproved?: boolean;
  isPostedToInstagram?: boolean;
  allowPublish?: boolean;
}

export interface UserResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: User | User[];
}

export interface UserListResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: User[];
}

export interface UserDetailResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: User;
} 