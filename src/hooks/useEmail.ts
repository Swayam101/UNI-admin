import { 
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult
} from '@tanstack/react-query';
import { emailService } from '../services/emailService';
import type { 
  SendMassEmailDto,
  EmailCampaignResponse,
  GetEmailCampaignsParams,
  EmailCampaign,
} from '../types/email';
import { ApiResponse } from '../types/api';

// Query key factory
const emailKeys = {
  all: ['emails'] as const,
  campaigns: (params: GetEmailCampaignsParams) => [...emailKeys.all, 'campaigns', params] as const,
};

// Hook for fetching campaigns
export const useGetEmailCampaigns = (params: GetEmailCampaignsParams): UseQueryResult<ApiResponse<{
  campaigns: EmailCampaign[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}>, Error> => {
  return useQuery({
    queryKey: emailKeys.campaigns(params),
    queryFn: () => emailService.getAllEmailCampaigns(params),
  });
};

// Hooks for Mutations
export const useSendMassEmail = (): UseMutationResult<EmailCampaignResponse, Error, SendMassEmailDto> => {
  return useMutation({
    mutationFn: emailService.sendMassEmail,
    onSuccess: (data) => {
      console.log('Mass email sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending mass email:', error);
    },
  });
}; 