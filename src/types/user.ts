import { ApiResponse, LegacyApiResponse } from './api';

export enum Role {
  Student = "student",
  Admin = "admin",
}

export enum ProfileStage {
  UPLOAD_PHOTOS = "UPLOAD_PHOTOS",
  ABOUT_YOU = "ABOUT_YOU",
  PREFERENCES = "PREFERENCES",
  PROFILE_PREVIEW = "PROFILE_PREVIEW",
  PAYMENT = "PAYMENT",
}

export enum StepStage {
  BASIC_INFO = 'BASIC_INFO',
  PREFERENCES = 'PREFERENCES',
  SOCIAL_LINKS = 'SOCIAL_LINKS',
  FINALIZE = 'FINALIZE',
}

export enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "non-binary",
  Other = "other",
}

export enum Housing {
  OffCampus = "offcampus",
  Hostel = "hostel",
  Apartment = "apartment",
}

export enum Religion {
  Christian = "Christian",
  Muslim = "Muslim",
  Hindu = "Hindu",
  Jewish = "Jewish",
  Buddhist = "Buddhist",
  Atheist = "Atheist",
  Jain = "Jain",
  Other = "Other",
}

export enum Zodiac {
  Aries = "Aries",
  Taurus = "Taurus",
  Gemini = "Gemini",
  Cancer = "Cancer",
  Leo = "Leo",
  Virgo = "Virgo",
  Libra = "Libra",
  Scorpio = "Scorpio",
  Sagittarius = "Sagittarius",
  Capricorn = "Capricorn",
  Aquarius = "Aquarius",
  Pisces = "Pisces",
}

export interface Location {
  type: "Point";
  coordinates: [number, number];
}

export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  dob?: Date;
  email: string;
  password: string;
  college: string; // ObjectId as string
  hometown?: string;
  profilePicture?: string;
  photos?: string[];
  profileStage?: ProfileStage;
  housing?: Housing;
  religion?: Religion;
  zodiac?: Zodiac;
  personality?: string[];
  sleepSchedule?: string;
  cleanliness?: string;
  guests?: string;
  substances?: string;
  pastimes?: string[];
  interests?: string[];
  instagram?: string;
  snapchat?: string;
  collegeGraduationYear?: string;
  twitter?: string;
  gender?: Gender;
  token?: string;
  mobileNumber?: string;
  bio?: string;
  isPhoneVerified?: boolean;
  isProfileCompleted?: boolean;
  resetTokenExpiration?: Date;
  otp?: string;
  address?: string;
  location?: Location;
  status?: 'active' | 'inactive' | 'pending' | 'banned';
  role?: Role;
  isPremium?: boolean;
  isApproved?: boolean;
  allowPublish?: boolean;
  currentStep?: StepStage;
  major?: string;
  university?: string;
  physicalActivity?: string[];
  food?: string[];
  other?: string[];
  postPaymentDone?: boolean;
  isPostedToInstagram?: boolean;
  isSubscribed?: boolean;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  dob?: Date;
  email?: string;
  password?: string;
  college?: string;
  hometown?: string;
  profilePicture?: string;
  photos?: string[];
  profileStage?: ProfileStage;
  housing?: Housing;
  religion?: Religion;
  zodiac?: Zodiac;
  personality?: string[];
  sleepSchedule?: string;
  cleanliness?: string;
  guests?: string;
  substances?: string;
  pastimes?: string[];
  interests?: string[];
  instagram?: string;
  snapchat?: string;
  collegeGraduationYear?: string;
  twitter?: string;
  gender?: Gender;
  token?: string;
  mobileNumber?: string;
  bio?: string;
  isPhoneVerified?: boolean;
  isProfileCompleted?: boolean;
  resetTokenExpiration?: Date;
  otp?: string;
  address?: string;
  location?: Location;
  status?: 'active' | 'inactive' | 'pending' | 'banned';
  role?: Role;
  isPremium?: boolean;
  isApproved?: boolean;
  allowPublish?: boolean;
  currentStep?: StepStage;
  major?: string;
  university?: string;
  physicalActivity?: string[];
  food?: string[];
  other?: string[];
  postPaymentDone?: boolean;
  isPostedToInstagram?: boolean;
  isSubscribed?: boolean;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
}

export type UserResponse = ApiResponse<User | User[]>;

export type UserListResponse = ApiResponse<{
  users: User[],
  total: number,
  currentPage: number,
  pages: number
}>;

export type UserDetailResponse = ApiResponse<User>;

// Legacy response types for backward compatibility
export type LegacyUserResponse = LegacyApiResponse<User | User[]>;

export type LegacyUserListResponse = LegacyApiResponse<User[]>;

export type LegacyUserDetailResponse = LegacyApiResponse<User>; 