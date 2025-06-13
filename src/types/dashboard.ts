export interface RecentActivity {
  type: 'college' | 'email' | 'user' | 'post';
  title: string;
  description: string;
  createdAt: string;
}

export interface DashboardAnalytics {
  colleges: {
    total: number;
    newThisMonth: number;
  };
  users: {
    thisMonth: number;
    lastMonth: number;
    percentChange: string;
  };
  posts: {
    total: number;
    thisWeek: number;
  };
  revenue: {
    thisMonth: number;
    percentChangeComparedTo10MonthAvg: string;
  };
}

export interface RecentActivityResponse {
  status: number;
  message: string;
  data: RecentActivity[];
}

export interface DashboardAnalyticsResponse {
  status: number;
  message: string;
  data: DashboardAnalytics;
} 