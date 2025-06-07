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
} from '@mantine/core';
import {
  IconSchool,
  IconUsers,
  IconMessages,
  IconTrendingUp,
  IconCalendar,
} from '@tabler/icons-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Schools',
      value: '24',
      description: '3 new this month',
      color: 'blue',
      icon: IconSchool,
    },
    {
      title: 'Active Users',
      value: '1,832',
      description: '+12% from last month',
      color: 'green',
      icon: IconUsers,
    },
    {
      title: 'Posts Published',
      value: '546',
      description: '89 this week',
      color: 'orange',
      icon: IconMessages,
    },
    {
      title: 'Revenue',
      value: '$12,450',
      description: '+8% from last month',
      color: 'teal',
      icon: IconTrendingUp,
    },
  ];

  const recentActivity = [
    { action: 'New school registered', school: 'Harvard University', time: '2 hours ago' },
    { action: 'Post scheduled', school: 'Stanford University', time: '4 hours ago' },
    { action: 'User profile updated', school: 'MIT', time: '6 hours ago' },
    { action: 'Email campaign sent', school: 'All Schools', time: '1 day ago' },
  ];

  const topSchools = [
    { name: 'Harvard University', users: 245, posts: 89, revenue: '$3,400' },
    { name: 'Stanford University', users: 198, posts: 76, revenue: '$2,850' },
    { name: 'MIT', users: 187, posts: 64, revenue: '$2,650' },
    { name: 'Yale University', users: 156, posts: 52, revenue: '$2,100' },
  ];

  return (
    <Stack gap="lg">
      <Title order={1}>Dashboard Overview</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {stats.map((stat) => (
          <Card key={stat.title} padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
                <Text c="dimmed" size="sm">
                  {stat.description}
                </Text>
              </div>
              <div>
                <stat.icon size={40} color={`var(--mantine-color-${stat.color}-6)`} />
              </div>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Recent Activity</Title>
            <Stack gap="sm">
              {recentActivity.map((activity, index) => (
                <Group 
                  key={index} 
                  justify="space-between" 
                  p="sm" 
                  style={{ 
                    borderRadius: '8px',
                    backgroundColor: 'var(--mantine-color-default-hover)',
                    border: '1px solid var(--mantine-color-default-border)'
                  }}
                >
                  <div>
                    <Text fw={500}>{activity.action}</Text>
                    <Text size="sm" c="dimmed">{activity.school}</Text>
                  </div>
                  <Badge variant="outline" leftSection={<IconCalendar size={12} />}>
                    {activity.time}
                  </Badge>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Top Performing Schools</Title>
            <Stack gap="md">
              {topSchools.map((school, index) => (
                <div key={school.name}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500} size="sm">{school.name}</Text>
                    <Badge variant="filled" color="blue">#{index + 1}</Badge>
                  </Group>
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" c="dimmed">Users: {school.users}</Text>
                    <Text size="xs" c="dimmed">Posts: {school.posts}</Text>
                    <Text size="xs" c="dimmed">Revenue: {school.revenue}</Text>
                  </Group>
                  <Progress value={(school.users / 250) * 100} size="sm" color="blue" />
                </div>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Dashboard; 