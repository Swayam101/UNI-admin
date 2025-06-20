import { useQuery } from '@tanstack/react-query';
import { PaymentService, GetPaymentsParams } from '../services/transactionService';

export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (params: GetPaymentsParams) => [...paymentKeys.lists(), params] as const,
};

export const useGetAllPayments = (params: GetPaymentsParams = {}) => {
  return useQuery({
    queryKey: paymentKeys.list(params),
    queryFn: () => PaymentService.getAllPayments(params),
  });
};