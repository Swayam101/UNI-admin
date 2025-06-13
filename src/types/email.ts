export enum EmailTargetGroup {
  All = 'all',
  Active = 'active',
  Expired = 'expired',
  CompletingProfile = 'completingProfile',
  Inactive = 'inactive',
}

export interface SendMassEmailDto {
  targetGroup: EmailTargetGroup;
  subject: string;
  text: string;
  html: string;
}

export interface EmailCampaignResponse {
  status: number;
  message: string;
  data?: Record<string, unknown>; // More specific than any
} 