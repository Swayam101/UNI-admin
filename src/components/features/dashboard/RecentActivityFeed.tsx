import { Card, Stack, Group, Text, Badge, Transition } from '@mantine/core';
import {
  IconSchool,
  IconMail,
  IconUserPlus,
  IconFileText,
} from '@tabler/icons-react';
import type { RecentActivity } from '../../../types/dashboard';

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

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

interface ActivityItemProps {
  activity: RecentActivity;
  index: number;
}

const ActivityItem = ({ activity, index }: ActivityItemProps) => {
  const { color, icon: Icon } = getActivityTypeConfig(activity.type);
  
  return (
    <Transition
      mounted={true}
      transition="slide-right"
      duration={300}
      timingFunction="ease"
      enterDelay={index * 50}
    >
      {(styles) => (
        <Group
          gap="md"
          style={{
            ...styles,
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-0)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <div
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: `var(--mantine-color-${color}-1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={16} color={`var(--mantine-color-${color}-6)`} />
          </div>
          
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500} mb={2}>
              {activity.title}
            </Text>
            <Text size="xs" c="dimmed" mb={4}>
              {activity.description}
            </Text>
            <Group gap="xs" align="center">
              <Badge variant="light" color={color} size="xs">
                {activity.type}
              </Badge>
              <Text size="xs" c="dimmed">
                {formatTimeAgo(activity.createdAt)}
              </Text>
            </Group>
          </div>
        </Group>
      )}
    </Transition>
  );
};

interface RecentActivityFeedProps {
  activities?: RecentActivity[];
  title?: string;
}

export const RecentActivityFeed = ({ activities, title = "Recent Activity" }: RecentActivityFeedProps) => {
  const defaultActivities: RecentActivity[] = [
    {
      type: 'college',
      title: 'New College Registration',
      description: 'Harvard University has been successfully registered',
      createdAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    },
    {
      type: 'user',
      title: 'New User Registration',
      description: 'Sarah Johnson has joined the platform',
      createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    },
    {
      type: 'email',
      title: 'Email Campaign Sent',
      description: 'Welcome Newsletter campaign was sent to all users',
      createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    },
    {
      type: 'post',
      title: 'New Post Published',
      description: 'Campus Life at MIT post has been published',
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      type: 'user',
      title: 'Profile Completed',
      description: 'Mike Chen has completed their profile setup',
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
  ];

  const activityList = activities || defaultActivities;

  return (
    <Card padding="lg" radius="md" withBorder h="100%">
      <Stack gap="md" h="100%">
        <Text size="lg" fw={600}>
          {title}
        </Text>
        
        <Stack gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
          {activityList.map((activity, index) => (
            <ActivityItem
              key={`${activity.type}-${index}`}
              activity={activity}
              index={index}
            />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}; 