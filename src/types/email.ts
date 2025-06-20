import { ApiResponse } from './api';

export enum EmailTargetGroup {
  All = 'all',
  Active = 'active',
  Inactive = 'inactive',
  Expired = 'expired',
  CompletingProfile = 'completing_profile',
}

export interface SendMassEmailDto {
  targetGroup: EmailTargetGroup;
  subject: string;
  text: string;
  html: string;
}

export interface EmailCampaign {
  id: string;
  subject: string;
  content: string;
  htmlContent: string;
  recipient: EmailTargetGroup;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  sentCount: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  scheduledAt?: string;
}

export interface GetEmailCampaignsParams {
  group?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export type EmailCampaignResponse = ApiResponse<Record<string, unknown>>;