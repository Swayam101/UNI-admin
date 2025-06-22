import apiClient from '../lib/api';
import type { 
  Contact,
  UpdateContactDto,
  ContactListResponse,
  ContactResponse,
  GetAllContactsParams
} from '../types/contact';

const CONTACT_ENDPOINTS = {
  GET_ALL: '/contact-us',
  UPDATE_STATUS: (id: string) => `/contact-us/${id}`,
} as const;

interface ContactListData {
  contacts: Contact[];
  total: number;
  currentPage: number;
  pages: number;
}

export const contactService = {
  // Get all contacts with optional search, filters and pagination
  getAllContacts: async (params?: GetAllContactsParams): Promise<ContactListData> => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    if (typeof params?.addressed === 'boolean') {
      queryParams.append('addressed', params.addressed.toString());
    }
    if (params?.category) {
      queryParams.append('category', params.category);
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const url = queryParams.toString() 
      ? `${CONTACT_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : CONTACT_ENDPOINTS.GET_ALL;

    const response = await apiClient.get<ContactListResponse>(url);
    // Extract the data we need from the API response
    const { contacts, total, currentPage, pages } = response.data;
    return { contacts, total, currentPage, pages };
  },

  // Update contact addressed status
  updateContactStatus: async (id: string, data: UpdateContactDto): Promise<Contact> => {
    const response = await apiClient.patch<ContactResponse>(
      CONTACT_ENDPOINTS.UPDATE_STATUS(id),
      data
    );
    return response.data;
  },
}; 