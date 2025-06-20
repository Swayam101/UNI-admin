import apiClient from '../lib/api';
import { ApiResponse } from '../types/api';
import type { 
  SendMassEmailDto,
  EmailCampaignResponse,
  GetEmailCampaignsParams,
  EmailCampaign,
} from '../types/email';

const EMAIL_ENDPOINTS = {
  SEND_MASS_EMAIL: '/email/send-to-many',
  GET_CAMPAIGNS: '/email/campaigns',
} as const;

export const emailService = {
  // Send mass email campaign
  sendMassEmail: async (data: SendMassEmailDto): Promise<EmailCampaignResponse> => {
    const response = await apiClient.post<EmailCampaignResponse>(
      EMAIL_ENDPOINTS.SEND_MASS_EMAIL,
      data
    );
    return response;
  },

  // Get all email campaigns with pagination
  getAllEmailCampaigns: async (params: GetEmailCampaignsParams): Promise<ApiResponse<{
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
  }>> => {
    const response = await apiClient.get<ApiResponse<{
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
    }>>(
      EMAIL_ENDPOINTS.GET_CAMPAIGNS,
      { params }
    );
    return response;
  },
}; 