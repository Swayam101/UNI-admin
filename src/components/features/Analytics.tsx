import { useState, useEffect } from 'react';
import {
  Title,
  Stack,
  Grid,
  Transition,
} from '@mantine/core';
import { useDashboardAnalytics } from '../../hooks/useDashboard';
import {
  TrendChart,
  SchoolPerformanceTable,
} from './analytics';
import { DashboardStats } from './dashboard/DashboardStats';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [loading, setLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState([false, false, false, false]);
  const [chartsVisible, setChartsVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);

  // Get dashboard analytics data
  const { 
    data: analyticsData, 
    isLoading: isLoadingAnalytics 
  } = useDashboardAnalytics();

  // Map analytics data to match DashboardStats expected structure
  const dashboardStatsData = analyticsData ? {
    totalSchools: analyticsData.totalColleges,
    totalUsers: analyticsData.totalUsers,
    totalPosts: analyticsData.totalPosts,
    totalColleges: analyticsData.totalColleges,
    collegesLastWeek: analyticsData.collegesLastWeek,
    collegeIncreasePercentage: analyticsData.collegeIncreasePercentage,
    activeUsers: analyticsData.activeUsers,
    usersAddedLastWeek: analyticsData.usersAddedLastWeek,
    postsThisWeek: analyticsData.postsThisWeek,
    revenue: analyticsData.revenue,
    signupTrend: analyticsData.signupTrend,
    postTrend: analyticsData.postTrend,
    lastMonthRevenue: analyticsData.lastMonthRevenue,
  } : undefined;

  // Simulate loading and staggered animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(isLoadingAnalytics);
      
      // Stagger stats cards animation
      statsVisible.forEach((_, index) => {
        setTimeout(() => {
          setStatsVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 150);
      });
      
      // Charts section
      setTimeout(() => setChartsVisible(true), 600);
      
      // Table section  
      setTimeout(() => setTableVisible(true), 800);
      
    }, 1400);

    return () => clearTimeout(timer);
  }, [isLoadingAnalytics]);

  // Combine signup and post trend data for the chart
  const combinedChartData = analyticsData?.signupTrend && analyticsData?.postTrend 
    ? (() => {
        // Create a map of dates to combine data
        const dataMap = new Map();
        
        // Add signup data
        analyticsData.signupTrend.forEach(item => {
          const date = item._id;
          const name = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          dataMap.set(date, { name, date, signups: item.count, posts: 0 });
        });
        
        // Add post data
        analyticsData.postTrend.forEach(item => {
          const date = item._id;
          const name = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          if (dataMap.has(date)) {
            dataMap.get(date).posts = item.count;
          } else {
            dataMap.set(date, { name, date, signups: 0, posts: item.count });
          }
        });
        
        // Convert to array and sort by date
        return Array.from(dataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      })()
    : [
        { name: 'Week 1', date: '2024-01-01', signups: 12, posts: 45 },
        { name: 'Week 2', date: '2024-01-08', signups: 18, posts: 62 },
        { name: 'Week 3', date: '2024-01-15', signups: 25, posts: 78 },
        { name: 'Week 4', date: '2024-01-22', signups: 22, posts: 85 },
      ];

  const schoolPerformance = analyticsData?.collegePerformance || [];

  return (
    <Stack gap="xl">
      <Title order={2}>Analytics Dashboard</Title>
      
      {/* Stats Grid */}
      <DashboardStats data={dashboardStatsData} />

      {/* Charts Section */}
      <Transition
        mounted={chartsVisible}
        transition="slide-up"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Grid>
              <Grid.Col >
                <TrendChart
                  data={combinedChartData}
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  loading={loading}
                />
              </Grid.Col>
              
              {/* <Grid.Col span={{ base: 12, lg: 4 }}>
                <UserStatusChart
                  data={userStatusData}
                  loading={loading}
                />
              </Grid.Col> */}
            </Grid>
          </div>
        )}
      </Transition>

      {/* School Performance Table */}
      <Transition
        mounted={tableVisible}
        transition="slide-up"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <SchoolPerformanceTable
              data={schoolPerformance}
              loading={loading}
            />
          </div>
        )}
      </Transition>
    </Stack>
  );
};

export default Analytics; 