import { SimpleGrid, Card, Text, Group, Transition } from '@mantine/core';
import {
  IconSchool,
  IconUsers,
  IconMessages,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import type { Icon } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { TrendData } from '../../../types/dashboard';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: Icon;
  color: string;
  index: number;
  revenue: number;
  link?: string;
}

const StatCard = ({ title, value, subtitle, icon: Icon, color, index, link }: StatCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Transition
      mounted={true}
      transition="slide-up"
      duration={500}
      timingFunction="ease"
      enterDelay={index * 100}
    >
      {(styles) => (
        <Card
          padding="lg"
          radius="md"
          withBorder
          style={{
            ...styles,
            cursor: link ? 'pointer' : 'default',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (link) {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (link) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }
          }}
          onClick={handleClick}
        >
          <Group justify="apart" align="flex-start">
            <div style={{ flex: 1 }}>
              <Text size="sm" c="dimmed" fw={500} mb={4}>
                {title}
              </Text>
              <Text
                size="xl"
                fw={700}
                mb={2}
                style={{
                  background: `linear-gradient(45deg, var(--mantine-color-${color}-6), var(--mantine-color-${color}-8))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </Text>
              <Text size="xs" c="dimmed" fw={400}>
                {subtitle}
              </Text>
            </div>
            <Icon size={24} color={`var(--mantine-color-${color}-6)`} />
          </Group>
        </Card>
      )}
    </Transition>
  );
};

interface DashboardStatsProps {
  data?: {
    totalSchools: number;
    totalUsers: number;
    totalPosts: number;
    totalColleges: number;
    collegesLastWeek: number;
    collegeIncreasePercentage: number;
    activeUsers: number;
    usersAddedLastWeek: number;
    postsThisWeek: number;
    revenue: number;
    signupTrend: TrendData[];
    postTrend: TrendData[];
    lastMonthRevenue: number;
  };
}

export const DashboardStats = ({ data }: DashboardStatsProps) => {
  const stats = data || {
    totalSchools: 156,
    totalUsers: 12847,
    totalPosts: 3521,
    growthRate: 23.5,
    collegesLastWeek: 8,
    usersAddedLastWeek: 342,
    postsThisWeek: 89,
    revenue: 100000,
    lastMonthRevenue: 90000,
  };

  const statsData = [
    {
      title: 'Total Schools',
      value: stats.totalSchools.toLocaleString(),
      subtitle: `+${stats.collegesLastWeek || 8} this week`,
      icon: IconSchool,
      color: 'blue',
      link: '/schools',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      subtitle: `+${stats.usersAddedLastWeek || 342} this week`,
      icon: IconUsers,
      color: 'green',
      link: '/users',
    },
    {
      title: 'Total Posts',
      value: stats.totalPosts.toLocaleString(),
      subtitle: `+${stats.postsThisWeek || 89} this week`,
      icon: IconMessages,
      color: 'orange',
      link: '/posts',
    },
    {
      title: 'Revenue This Month',
      value: `$${stats.revenue}`,
      subtitle: `Last month: $${stats.lastMonthRevenue}`,
      icon: IconCurrencyDollar,
      color: 'teal',
      link: '/payments',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          color={stat.color}
          index={index}
          revenue={stats.revenue}
          link={stat.link}
        />
      ))}
    </SimpleGrid>
  );
};