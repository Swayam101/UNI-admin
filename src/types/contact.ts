import { ApiResponse } from './api';

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  addressed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactListData {
  contacts: Contact[];
  total: number;
  currentPage: number;
  pages: number;
}

export type ContactListResponse = ApiResponse<ContactListData>;

export type ContactResponse = ApiResponse<Contact>;

export interface UpdateContactDto {
  addressed?: boolean;
}

export interface GetAllContactsParams {
  search?: string;
  addressed?: boolean;
  category?: string;
  page?: number;
  limit?: number;
}

export type UseContactsParams = GetAllContactsParams; 