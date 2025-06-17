import { SimpleGrid, Skeleton, Transition } from '@mantine/core';
import { IconUsers, IconTrendingUp, IconMessages, IconSchool } from '@tabler/icons-react';
import StatCard from './StatCard';

interface StatsData {
  totalColleges: number;
  activeUsers: number;
  postsThisWeek: number;
  revenue: number;
}

interface StatsGridProps {
  analyticsData?: StatsData;
  statsVisible: boolean[];
}

const StatsGrid = ({ analyticsData, statsVisible }: StatsGridProps) => {
  const stats = analyticsData ? [
    {
      title: 'Total Colleges',
      value: analyticsData.totalColleges.toString(),
      change: 'Registered colleges',
      color: 'blue',
      icon: IconSchool,
    },
    {
      title: 'Active Users',
      value: analyticsData.activeUsers.toLocaleString(),
      change: 'Currently active',
      color: 'green',
      icon: IconUsers,
    },
    {
      title: 'Posts This Week',
      value: analyticsData.postsThisWeek.toLocaleString(),
      change: 'Published this week',
      color: 'orange',
      icon: IconMessages,
    },
    {
      title: 'Revenue',
      value: `$${analyticsData.revenue.toLocaleString()}`,
      change: 'Total revenue',
      color: 'teal',
      icon: IconTrendingUp,
    },
  ] : [
    {
      title: 'Total Colleges',
      value: '24',
      change: '+3 this month',
      color: 'blue',
      icon: IconSchool,
    },
    {
      title: 'Active Users',
      value: '1,832',
      change: '+12% from last month',
      color: 'green',
      icon: IconUsers,
    },
    {
      title: 'Posts This Week',
      value: '89',
      change: '+23% from last week',
      color: 'orange',
      icon: IconMessages,
    },
    {
      title: 'Revenue',
      value: '$12,450',
      change: '+8% from last month',
      color: 'teal',
      icon: IconTrendingUp,
    },
  ];

  const StatSkeleton = () => (
    <Skeleton height={120} radius="md" />
  );

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
      {stats.map((stat, index) => (
        <Transition
          key={stat.title}
          mounted={statsVisible[index]}
          transition="slide-up"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              {statsVisible[index] ? (
                <StatCard {...stat} />
              ) : (
                <StatSkeleton />
              )}
            </div>
          )}
        </Transition>
      ))}
    </SimpleGrid>
  );
};

export default StatsGrid; 