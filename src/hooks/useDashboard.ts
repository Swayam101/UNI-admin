import { 
  useQuery,
  UseQueryResult 
} from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import type { 
  RecentActivity,
  DashboardAnalytics
} from '../types/dashboard';

// Query Keys
export const DASHBOARD_QUERY_KEYS = {
  all: ['dashboard'] as const,
  recentActivity: () => [...DASHBOARD_QUERY_KEYS.all, 'recent-activity'] as const,
  analytics: () => [...DASHBOARD_QUERY_KEYS.all, 'analytics'] as const,
};

// Hooks for Queries
export const useRecentActivity = (): UseQueryResult<RecentActivity[], Error> => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.recentActivity(),
    queryFn: dashboardService.getRecentActivity,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDashboardAnalytics = (): UseQueryResult<DashboardAnalytics, Error> => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.analytics(),
    queryFn: dashboardService.getDashboardAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 