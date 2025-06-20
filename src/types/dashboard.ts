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
  collegesLastWeek: number;
  collegeIncreasePercentage: number;
  activeUsers: number;
  usersAddedLastWeek: number;
  totalUsers: number;
  postsThisWeek: number;
  totalPosts: number;
  revenue: number;
  signupTrend: TrendData[];
  lastMonthRevenue: number;
  postTrend: TrendData[];
  collegePerformance: {
    _id: string;
    name: string;
    logoUrl: string;
    totalUsers: number;
    totalPosts: number;
  }[];
}

export type RecentActivityResponse = ApiResponse<RecentActivity[]>;

export type DashboardAnalyticsResponse = LegacyApiResponse<DashboardAnalytics>; 