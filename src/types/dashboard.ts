import { ApiResponse, LegacyApiResponse } from './api';

export interface RecentActivity {
  type: 'college' | 'email' | 'user' | 'post';
  title: string;
  description: string;
  createdAt: string;
}

export interface TrendData {
  _id: string;
  count: number;
}

export interface DashboardAnalytics {
  totalColleges: number;
  activeUsers: number;
  postsThisWeek: number;
  revenue: number;
  signupTrend: TrendData[];
  postTrend: TrendData[];
}

export type RecentActivityResponse = ApiResponse<RecentActivity[]>;

export type DashboardAnalyticsResponse = LegacyApiResponse<DashboardAnalytics>; 