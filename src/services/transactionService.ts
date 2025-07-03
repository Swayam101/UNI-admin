import apiClient from '../lib/api';
import { ApiResponse } from '../types/api';

// types/payment.ts or inline with service file

export interface Payment {
    _id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email?: string;
      profilePicture?: string;
    };
    college: {
      _id: string;
      name: string;
    };
    amount: number;
    paymentType: 'post' | 'subscription';
    stripePaymentIntentId?: string;
    status: 'success' | 'failed';
    transactionDate?: string; // ISO string
    createdAt: string;
    updatedAt: string;
  }
  

export interface TransactionsResponse {
  transactions: Payment[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  totalRevenue: number;
  totalTransactions: number;

}

export interface GetPaymentsParams {
  page?: number;
  limit?: number;
  search?: string;
  paymentType?: 'post' | 'subscription';
}

export class PaymentService {
  /**
   * Get all payments with pagination and filters
   */
  static async getAllPayments(params: GetPaymentsParams = {}): Promise<ApiResponse<TransactionsResponse>> {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        paymentType,
      } = params;

      const queryParams: Record<string, string | undefined> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (search) queryParams.search = search;
      if (paymentType) queryParams.paymentType = paymentType;

      const response = await apiClient.get<ApiResponse<TransactionsResponse>>(
        '/transactions/admin/all',
        { params: queryParams }
      );

      console.log("Payments fetched:", response);
      return response;
    } catch (error) {
      console.error('Get payments error:', error);
      throw error;
    }
  }
}
