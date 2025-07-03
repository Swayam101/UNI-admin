import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseMutationResult,
  UseQueryResult 
} from '@tanstack/react-query';
import { contactService } from '../services/contactService';
import type { 
  Contact, 
  UpdateContactDto,
  GetAllContactsParams
} from '../types/contact';

// Use the same params type as the service
export type UseContactsParams = GetAllContactsParams;

interface ContactListData {
  contacts: Contact[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
}

// Query Keys
export const CONTACT_QUERY_KEYS = {
  all: ['contacts'] as const,
  lists: () => [...CONTACT_QUERY_KEYS.all, 'list'] as const,
  list: (filters: UseContactsParams) => [...CONTACT_QUERY_KEYS.lists(), { filters }] as const,
};

// Hook for Queries
export const useContacts = (params?: UseContactsParams): UseQueryResult<ContactListData> => {
  return useQuery({
    queryKey: CONTACT_QUERY_KEYS.list(params || {}),
    queryFn: () => contactService.getAllContacts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for Mutations
export const useUpdateContactStatus = (): UseMutationResult<Contact, Error, { id: string; data: UpdateContactDto }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => contactService.updateContactStatus(id, data),
    onSuccess: () => {
      // Invalidate contacts list to reflect changes
      queryClient.invalidateQueries({ queryKey: CONTACT_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Error updating contact status:', error);
    },
  });
}; 