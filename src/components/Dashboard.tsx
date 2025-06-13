import { useState, useEffect } from 'react';
import {
  Title,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Stack,
  Progress,
  SimpleGrid,
  Skeleton,
  Transition,
  Alert,
  Button,
} from '@mantine/core';
import {
  IconSchool,
  IconUsers,
  IconMessages,
  IconTrendingUp,
  IconCalendar,
  IconCloudRain,
  IconAlertCircle,
  IconMail,
  IconFileText,
  IconUserPlus,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import { useRecentActivity, useDashboardAnalytics } from '../hooks/useDashboard';
import type { RecentActivity } from '../types/dashboard';

// Digital Clock Component - Clean Style
const DigitalClock = ({ time }: { time: Date }) => {
  const timeString = time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });
  
  return (
    <Group gap="xs" align="center">
      <Text 
        size="lg" 
        fw={700} 
        style={{ 
          fontFamily: 'monospace',
          letterSpacing: '2px',
          color: 'var(--mantine-color-blue-6)'
        }}
      >
        {timeString}
      </Text>
      <Text 
        size="xs" 
        c="dimmed"
        tt="uppercase"
        fw={500}
      >
        {time.toLocaleTimeString('en-US', { 
          hour12: true 
        }).split(' ')[1]}
      </Text>
    </Group>
  );
};

// Weather Icon Component - Clean Style
const WeatherIcon = ({ type, size = 16 }: { type: string; size?: number }) => {
  const iconMap: Record<string, Icon> = {
    rain: IconCloudRain,
    // Add more weather types as needed
  };
  
  const IconComponent = iconMap[type] || IconCloudRain;
  
  return (
    <IconComponent 
      size={size} 
      color="var(--mantine-color-blue-6)"
    />
  );
};

// Weather Forecast Item Component - Clean Style
const WeatherForecastItem = ({ 
  time, 
  temperature, 
  weatherType, 
  isNow = false 
}: { 
  time: string; 
  temperature: number; 
  weatherType: string; 
  isNow?: boolean;
}) => (
  <Stack align="center" gap="xs">
    <WeatherIcon type={weatherType} size={20} />
    <Text fw={600} size="sm" c="blue">
      {temperature}°C
    </Text>
    <Text size="xs" c="dimmed" fw={500}>
      {isNow ? 'Now' : time}
    </Text>
  </Stack>
);

// Main Weather Widget Component - Clean and Consistent
const WeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second for smoother digital clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Sample weather data
  const weatherData = [
    { time: 'Now', temperature: 12, weatherType: 'rain', isNow: true },
    { time: '14:00', temperature: 11, weatherType: 'rain', isNow: false },
    { time: '15:00', temperature: 10, weatherType: 'rain', isNow: false },
  ];
  
  return (
    <Card 
      padding="md" 
      radius="md" 
      withBorder
      style={{
        minWidth: 320,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Stack gap="md">
        {/* Time and Date Row */}
        <Group justify="space-between" align="center">
          {/* Digital Clock */}
          <DigitalClock time={currentTime} />
          
          {/* Date and Day */}
          <Group gap="xs" align="center">
            <Badge variant="light" color="blue" size="sm">
              {currentTime.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </Badge>
            <Badge variant="outline" color="gray" size="sm">
              {currentTime.toLocaleDateString('en-US', { weekday: 'short' })}
            </Badge>
          </Group>
        </Group>
        
        {/* Weather Section */}
        <Group gap="lg" justify="center" align="flex-end">
          {weatherData.map((item, index) => (
            <WeatherForecastItem
              key={index}
              time={item.time}
              temperature={item.temperature}
              weatherType={item.weatherType}
              isNow={item.isNow}
            />
          ))}
        </Group>
      </Stack>
    </Card>
  );
};

// Helper function to get activity type color and icon
const getActivityTypeConfig = (type: RecentActivity['type']) => {
  const configs = {
    college: { color: 'blue', icon: IconSchool },
    email: { color: 'green', icon: IconMail },
    user: { color: 'orange', icon: IconUserPlus },
    post: { color: 'teal', icon: IconFileText },
  };
  return configs[type] || { color: 'gray', icon: IconFileText };
};

// Helper function to format time ago
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const Dashboard = () => {
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

  // Create stats array from analytics data
  const stats = analyticsData ? [
    {
      title: 'Total Colleges',
      value: analyticsData.colleges.total.toString(),
      description: `${analyticsData.colleges.newThisMonth} new this month`,
      color: 'blue',
      icon: IconSchool,
    },
    {
      title: 'Active Users',
      value: analyticsData.users.thisMonth.toLocaleString(),
      description: `${analyticsData.users.percentChange}% from last month`,
      color: analyticsData.users.percentChange.startsWith('-') ? 'red' : 'green',
      icon: IconUsers,
    },
    {
      title: 'Posts Published',
      value: analyticsData.posts.total.toLocaleString(),
      description: `${analyticsData.posts.thisWeek} this week`,
      color: 'orange',
      icon: IconMessages,
    },
    {
      title: 'Revenue',
      value: `$${analyticsData.revenue.thisMonth.toLocaleString()}`,
      description: `${analyticsData.revenue.percentChangeComparedTo10MonthAvg}% vs 10-month avg`,
      color: analyticsData.revenue.percentChangeComparedTo10MonthAvg.startsWith('-') ? 'red' : 'teal',
      icon: IconTrendingUp,
    },
  ] : [];

  // Mock data for top schools (keeping this as mock since no API endpoint provided)
  const topSchools = [
    { name: 'Harvard University', users: 245, posts: 89, revenue: '$3,400' },
    { name: 'Stanford University', users: 198, posts: 76, revenue: '$2,850' },
    { name: 'MIT', users: 187, posts: 64, revenue: '$2,650' },
    { name: 'Yale University', users: 156, posts: 52, revenue: '$2,100' },
  ];

  // Skeleton loader for stats cards
  const StatSkeleton = () => (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <div style={{ flex: 1 }}>
          <Skeleton height={12} width="60%" mb="xs" />
          <Skeleton height={28} width="40%" mb="xs" />
          <Skeleton height={12} width="80%" />
        </div>
        <Skeleton height={40} width={40} circle />
      </Group>
    </Card>
  );

  // Skeleton loader for activity items
  const ActivitySkeleton = () => (
    <div
      style={{ 
        padding: '12px',
        borderRadius: '8px',
        backgroundColor: 'var(--mantine-color-default-hover)',
        border: '1px solid var(--mantine-color-default-border)'
      }}
    >
      <Group justify="space-between">
        <div style={{ flex: 1 }}>
          <Skeleton height={14} width="70%" mb="xs" />
          <Skeleton height={12} width="50%" />
        </div>
        <Skeleton height={24} width={80} radius="sm" />
      </Group>
    </div>
  );

  // Skeleton loader for weather widget
  const WeatherSkeleton = () => (
    <Card padding="md" radius="md" withBorder style={{ minWidth: 320 }}>
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Group gap="xs" align="center">
            <Skeleton height={24} width={80} />
            <Skeleton height={16} width={30} />
          </Group>
          <Group gap="xs" align="center">
            <Skeleton height={20} width={50} radius="sm" />
            <Skeleton height={20} width={40} radius="sm" />
          </Group>
        </Group>
        <Group gap="lg" justify="center" align="flex-end">
          <Stack align="center" gap="xs">
            <Skeleton height={20} width={20} circle />
            <Skeleton height={16} width={35} />
            <Skeleton height={12} width={25} />
          </Stack>
          <Stack align="center" gap="xs">
            <Skeleton height={20} width={20} circle />
            <Skeleton height={16} width={35} />
            <Skeleton height={12} width={30} />
          </Stack>
          <Stack align="center" gap="xs">
            <Skeleton height={20} width={20} circle />
            <Skeleton height={16} width={35} />
            <Skeleton height={12} width={30} />
          </Stack>
        </Group>
      </Stack>
    </Card>
  );

  return (
    <Stack gap="lg">
      {/* Header with Title and Weather Widget */}
      <Group justify="space-between" align="flex-start">
        {loading ? (
          <>
            <Skeleton height={32} width={250} />
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
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {loading ? (
          // Show skeleton loaders
          Array.from({ length: 4 }).map((_, index) => (
            <StatSkeleton key={index} />
          ))
        ) : analyticsError ? (
          // Show error state
          <div style={{ gridColumn: '1 / -1' }}>
            <Alert icon={<IconAlertCircle size={16} />} color="red">
              Error loading analytics: {analyticsError.message}
              <Button variant="outline" size="xs" ml="md" onClick={() => refetchAnalytics()}>
                Retry
              </Button>
            </Alert>
          </div>
        ) : stats.length === 0 ? (
          // Show no data state
          <div style={{ gridColumn: '1 / -1' }}>
            <Text ta="center" py="xl" c="dimmed">
              No analytics data available.
            </Text>
          </div>
        ) : (
          // Show actual stats with staggered animation
          stats.map((stat, index) => (
            <Transition
              key={stat.title}
              mounted={statsVisible[index]}
              transition="slide-up"
              duration={600}
              timingFunction="ease"
            >
              {(styles) => (
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder
                  style={{
                    ...styles,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Group justify="space-between">
                    <div>
                      <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                        {stat.title}
                      </Text>
                      <Text fw={700} size="xl" style={{ 
                        background: `linear-gradient(45deg, var(--mantine-color-${stat.color}-6), var(--mantine-color-${stat.color}-4))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {stat.value}
                      </Text>
                      <Text c="dimmed" size="sm">
                        {stat.description}
                      </Text>
                    </div>
                    <div style={{
                      padding: '12px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, var(--mantine-color-${stat.color}-1), var(--mantine-color-${stat.color}-0))`,
                      transition: 'transform 0.3s ease'
                    }}>
                      <stat.icon size={40} color={`var(--mantine-color-${stat.color}-6)`} />
                    </div>
                  </Group>
                </Card>
              )}
            </Transition>
          ))
        )}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Transition
            mounted={activityVisible}
            transition="slide-right"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              <Card padding="lg" radius="md" withBorder style={styles}>
                <Title order={3} mb="md">Recent Activity</Title>
                <Stack gap="sm">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <ActivitySkeleton key={index} />
                    ))
                  ) : activityError ? (
                    <Alert icon={<IconAlertCircle size={16} />} color="red">
                      Error loading recent activity: {activityError.message}
                      <Button variant="outline" size="xs" ml="md" onClick={() => refetchActivity()}>
                        Retry
                      </Button>
                    </Alert>
                  ) : recentActivityData.length === 0 ? (
                    <Text ta="center" py="xl" c="dimmed">
                      No recent activity found.
                    </Text>
                  ) : (
                    recentActivityData.map((activity, index) => {
                      const { color, icon: ActivityIcon } = getActivityTypeConfig(activity.type);
                      return (
                        <Group 
                          key={index}
                          justify="space-between" 
                          p="sm" 
                          style={{ 
                            borderRadius: '8px',
                            backgroundColor: 'var(--mantine-color-default-hover)',
                            border: '1px solid var(--mantine-color-default-border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            animation: `slideInRight 0.4s ease ${0.6 + (index * 0.1)}s both`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `var(--mantine-color-${color}-0)`;
                            e.currentTarget.style.borderColor = `var(--mantine-color-${color}-3)`;
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--mantine-color-default-hover)';
                            e.currentTarget.style.borderColor = 'var(--mantine-color-default-border)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <Group gap="sm">
                            <div style={{
                              padding: '8px',
                              borderRadius: '8px',
                              backgroundColor: `var(--mantine-color-${color}-1)`,
                            }}>
                              <ActivityIcon size={16} color={`var(--mantine-color-${color}-6)`} />
                            </div>
                            <div>
                              <Text fw={500}>{activity.title}</Text>
                              <Text size="sm" c="dimmed">{activity.description}</Text>
                            </div>
                          </Group>
                          <Badge 
                            variant="outline" 
                            color={color}
                            leftSection={<IconCalendar size={12} />}
                          >
                            {formatTimeAgo(activity.createdAt)}
                          </Badge>
                        </Group>
                      );
                    })
                  )}
                </Stack>
              </Card>
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
              <Card padding="lg" radius="md" withBorder style={styles}>
                <Title order={3} mb="md">Top Performing Colleges</Title>
                <Stack gap="md">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div key={index}>
                        <Group justify="space-between" mb="xs">
                          <Skeleton height={14} width="60%" />
                          <Skeleton height={20} width={30} radius="sm" />
                        </Group>
                        <Group justify="space-between" mb="xs">
                          <Skeleton height={10} width="25%" />
                          <Skeleton height={10} width="25%" />
                          <Skeleton height={10} width="30%" />
                        </Group>
                        <Skeleton height={6} radius="sm" />
                      </div>
                    ))
                  ) : (
                    topSchools.map((school, index) => (
                      <div 
                        key={school.name}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          animation: `fadeIn 0.4s ease ${0.7 + (index * 0.15)}s both`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)';
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <Group justify="space-between" mb="xs">
                          <Text fw={500} size="sm">{school.name}</Text>
                          <Badge variant="filled" color="blue">#{index + 1}</Badge>
                        </Group>
                        <Group justify="space-between" mb="xs">
                          <Text size="xs" c="dimmed">Users: {school.users}</Text>
                          <Text size="xs" c="dimmed">Posts: {school.posts}</Text>
                          <Text size="xs" c="dimmed">Revenue: {school.revenue}</Text>
                        </Group>
                        <Progress 
                          value={(school.users / 250) * 100} 
                          size="sm" 
                          color="blue"
                          style={{
                            transition: 'all 0.5s ease'
                          }}
                        />
                      </div>
                    ))
                  )}
                </Stack>
              </Card>
            )}
          </Transition>
        </Grid.Col>
      </Grid>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Stack>
  );
};

export default Dashboard; 