import { useState, useEffect } from 'react';
import {
  Title,
  Stack,
  Grid,
  Transition,
} from '@mantine/core';
import { useDashboardAnalytics } from '../../hooks/useDashboard';
import {
  StatsGrid,
  TrendChart,
  UserStatusChart,
  SchoolPerformanceTable,
} from './analytics';

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

  const schoolPerformance = [
    { name: 'Harvard', signups: 245, posts: 89, revenue: 3400, conversion: 65 },
    { name: 'Stanford', signups: 198, posts: 76, revenue: 2850, conversion: 58 },
    { name: 'MIT', signups: 187, posts: 64, revenue: 2650, conversion: 71 },
    { name: 'Yale', signups: 156, posts: 52, revenue: 2100, conversion: 48 },
    { name: 'Princeton', signups: 134, posts: 41, revenue: 1800, conversion: 52 },
  ];

  const userStatusData = [
    { name: 'Active', value: 1245, color: '#339af0' },
    { name: 'Inactive', value: 356, color: '#868e96' },
    { name: 'Pending', value: 89, color: '#ffd43b' },
    { name: 'Banned', value: 12, color: '#fa5252' },
  ];

  return (
    <Stack gap="xl">
      <Title order={2}>Analytics Dashboard</Title>
      
      {/* Stats Grid */}
      <StatsGrid 
        analyticsData={analyticsData} 
        statsVisible={statsVisible} 
      />

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
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <TrendChart
                  data={combinedChartData}
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  loading={loading}
                />
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <UserStatusChart
                  data={userStatusData}
                  loading={loading}
                />
              </Grid.Col>
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