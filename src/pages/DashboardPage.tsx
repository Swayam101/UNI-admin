import { useState, useEffect } from 'react';
import {
  Title,
  Grid,
  Group,
  Stack,
  Transition,
  Alert,
  Button,
  Text,
} from '@mantine/core';
import {
  IconAlertCircle,
} from '@tabler/icons-react';
import { useRecentActivity, useDashboardAnalytics } from '../hooks/useDashboard';
import {
  WeatherWidget,
  DashboardStats,
  RecentActivityFeed,
  TopSchools,
  StatSkeleton,
  ActivitySkeleton,
  WeatherSkeleton,
  TopSchoolsSkeleton,
} from '../components/features/dashboard';

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState([false, false, false, false]);
  const [activityVisible, setActivityVisible] = useState(false);
  const [schoolsVisible, setSchoolsVisible] = useState(false);
  const [weatherVisible, setWeatherVisible] = useState(false);

  // API hooks
  const { 
    data: recentActivityData = [], 
    isLoading: isLoadingActivity, 
    error: activityError,
    refetch: refetchActivity 
  } = useRecentActivity();
  
  const { 
    data: analyticsData, 
    isLoading: isLoadingAnalytics, 
    error: analyticsError,
    refetch: refetchAnalytics 
  } = useDashboardAnalytics();

  const loading = isLoadingActivity || isLoadingAnalytics;

  // Simulate loading and staggered animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      
      // Stagger stats cards animation
      statsVisible.forEach((_, index) => {
        setTimeout(() => {
          setStatsVisible(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 100);
      });
      
      // Activity section
      setTimeout(() => setActivityVisible(true), 400);
      
      // Schools section
      setTimeout(() => setSchoolsVisible(true), 500);
      
      // Weather widget
      setTimeout(() => setWeatherVisible(true), 200);
      
    }, loading ? 1200 : 300);

    return () => clearTimeout(timer);
  }, [loading]);

  // Transform analytics data for stats component
  const statsData = analyticsData ? {
    totalSchools: analyticsData.totalColleges,
    totalUsers: analyticsData.activeUsers,
    totalPosts: analyticsData.postsThisWeek,
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
    collegePerformance: analyticsData.collegePerformance,
  } : undefined;

  // Mock data for top schools (keeping this as mock since no API endpoint provided)
  

  return (
    <Stack gap="lg">
      {/* Header with Title and Weather Widget */}
      <Group justify="space-between" align="flex-start">
        {loading ? (
          <>
            <div style={{ height: 32, width: 250, backgroundColor: 'var(--mantine-color-gray-2)', borderRadius: 4 }} />
            <WeatherSkeleton />
          </>
        ) : (
          <>
            <Transition
              mounted={mounted}
              transition="slide-down"
              duration={600}
              timingFunction="ease"
            >
              {(styles) => (
                <Title order={1} style={styles}>
                  Dashboard Overview
                </Title>
              )}
            </Transition>

            <Transition
              mounted={weatherVisible}
              transition="slide-left"
              duration={800}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  <WeatherWidget />
                </div>
              )}
            </Transition>
          </>
        )}
      </Group>

      {/* Stats Cards with Animation */}
      {loading ? (
        <StatSkeleton />
      ) : analyticsError ? (
        <Alert icon={<IconAlertCircle size={16} />} color="red">
          Error loading analytics: {analyticsError.message}
          <Button variant="outline" size="xs" ml="md" onClick={() => refetchAnalytics()}>
            Retry
          </Button>
        </Alert>
      ) : !statsData ? (
        <Text ta="center" py="xl" c="dimmed">
          No analytics data available.
        </Text>
      ) : (
        <DashboardStats data={statsData} />
      )}

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Transition
            mounted={activityVisible}
            transition="slide-right"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                {loading ? (
                  <ActivitySkeleton />
                ) : activityError ? (
                  <Alert icon={<IconAlertCircle size={16} />} color="red">
                    Error loading recent activity: {activityError.message}
                    <Button variant="outline" size="xs" ml="md" onClick={() => refetchActivity()}>
                      Retry
                    </Button>
                  </Alert>
                ) : (
                  <RecentActivityFeed activities={recentActivityData} />
                )}
              </div>
            )}
          </Transition>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Transition
            mounted={schoolsVisible}
            transition="slide-left"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                {loading ? (
                  <TopSchoolsSkeleton />
                ) : (
                  <TopSchools totals={{
                    totalUsers: statsData?.totalUsers || 0,
                    totalPosts: statsData?.totalPosts || 0,
                  }} schools={statsData?.collegePerformance || []} />
                )}
              </div>
            )}
          </Transition>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default DashboardPage; 