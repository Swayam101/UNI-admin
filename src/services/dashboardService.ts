import apiClient from '../lib/api';
import type { 
  RecentActivity,
  DashboardAnalytics,
  RecentActivityResponse,
  DashboardAnalyticsResponse
} from '../types/dashboard';

const DASHBOARD_ENDPOINTS = {
  RECENT_ACTIVITY: '/recent-activity',
  DASHBOARD_ANALYTICS: '/recent-activity/dashboard',
} as const;

export const dashboardService = {
  // Get recent activity
  getRecentActivity: async (): Promise<RecentActivity[]> => {
    const response = await apiClient.get<RecentActivityResponse>(
      DASHBOARD_ENDPOINTS.RECENT_ACTIVITY
    );
    return response.data.data;
  },

  // Get dashboard analytics
  getDashboardAnalytics: async (): Promise<DashboardAnalytics> => {
    const response = await apiClient.get<DashboardAnalyticsResponse>(
      DASHBOARD_ENDPOINTS.DASHBOARD_ANALYTICS
    );
    return response.data.data;
  },
}; 