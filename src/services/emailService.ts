import apiClient from '../lib/api';
import type { 
  SendMassEmailDto,
  EmailCampaignResponse
} from '../types/email';

const EMAIL_ENDPOINTS = {
  SEND_MASS_EMAIL: '/email/send-to-many',
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
}; 