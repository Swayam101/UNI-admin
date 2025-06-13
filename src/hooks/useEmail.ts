import { 
  useMutation,
  UseMutationResult 
} from '@tanstack/react-query';
import { emailService } from '../services/emailService';
import type { 
  SendMassEmailDto,
  EmailCampaignResponse
} from '../types/email';

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