import { useState } from 'react';
import {
  Title,
  Card,
  Text,
  Group,
  Stack,
  Select,
  Grid,
  Progress,
  Badge,
  Table,
  SimpleGrid,
} from '@mantine/core';
import {
  IconTrendingUp,
  IconUsers,
  IconMessages,
  IconCash,
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [schoolFilter, setSchoolFilter] = useState('all');

  // Mock data for charts
  const signupData = [
    { name: 'Week 1', signups: 12, posts: 45, revenue: 450 },
    { name: 'Week 2', signups: 18, posts: 62, revenue: 680 },
    { name: 'Week 3', signups: 25, posts: 78, revenue: 920 },
    { name: 'Week 4', signups: 22, posts: 85, revenue: 1100 },
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

  const conversionData = [
    { period: 'Jan', signup: 120, paid: 78, rate: 65 },
    { period: 'Feb', signup: 145, paid: 95, rate: 66 },
    { period: 'Mar', signup: 167, paid: 118, rate: 71 },
    { period: 'Apr', signup: 189, paid: 134, rate: 71 },
  ];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,680',
      change: '+12.5%',
      color: 'green',
      icon: IconCash,
    },
    {
      title: 'Active Users',
      value: '1,832',
      change: '+8.2%',
      color: 'blue',
      icon: IconUsers,
    },
    {
      title: 'Total Posts',
      value: '946',
      change: '+15.7%',
      color: 'orange',
      icon: IconMessages,
    },
    {
      title: 'Conversion Rate',
      value: '68.5%',
      change: '+2.1%',
      color: 'teal',
      icon: IconTrendingUp,
    },
  ];

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>Analytics Dashboard</Title>
        <Group>
          <Select
            data={[
              { value: 'all', label: 'All Schools' },
              { value: 'harvard', label: 'Harvard University' },
              { value: 'stanford', label: 'Stanford University' },
              { value: 'mit', label: 'MIT' },
              { value: 'yale', label: 'Yale University' },
            ]}
            value={schoolFilter}
            onChange={(value) => setSchoolFilter(value || 'all')}
            placeholder="Filter by school"
            style={{ width: 200 }}
          />
          <Select
            data={[
              { value: '7', label: 'Last 7 days' },
              { value: '30', label: 'Last 30 days' },
              { value: '90', label: 'Last 3 months' },
              { value: '365', label: 'Last year' },
            ]}
            value={dateRange}
            onChange={(value) => setDateRange(value || '30')}
            placeholder="Select date range"
            style={{ width: 150 }}
          />
        </Group>
      </Group>

      {/* Key Metrics */}
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
                <Group gap="xs">
                  <Badge color={stat.color} variant="light">
                    {stat.change}
                  </Badge>
                  <Text size="sm" c="dimmed">vs last period</Text>
                </Group>
              </div>
              <stat.icon size={40} color={`var(--mantine-color-${stat.color}-6)`} />
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Grid>
        {/* Signups & Posts Trend */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Signups & Posts Trend</Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={signupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="signups" stroke="#339af0" strokeWidth={2} />
                <Line type="monotone" dataKey="posts" stroke="#51cf66" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        {/* User Status Distribution */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">User Distribution</Title>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Stack gap="xs" mt="md">
              {userStatusData.map((item) => (
                <Group key={item.name} justify="space-between">
                  <Group gap="xs">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    />
                    <Text size="sm">{item.name}</Text>
                  </Group>
                  <Text size="sm" fw={500}>{item.value}</Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        {/* School Performance */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">School Performance</Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>School</Table.Th>
                  <Table.Th>Signups</Table.Th>
                  <Table.Th>Posts</Table.Th>
                  <Table.Th>Revenue</Table.Th>
                  <Table.Th>Conversion</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {schoolPerformance.map((school) => (
                  <Table.Tr key={school.name}>
                    <Table.Td>
                      <Text fw={500}>{school.name}</Text>
                    </Table.Td>
                    <Table.Td>{school.signups}</Table.Td>
                    <Table.Td>{school.posts}</Table.Td>
                    <Table.Td>${school.revenue.toLocaleString()}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Progress value={school.conversion} size="sm" style={{ flex: 1 }} />
                        <Text size="sm">{school.conversion}%</Text>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        {/* Conversion Rate Trend */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">Conversion Rate</Title>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Bar dataKey="rate" fill="#339af0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <Text size="sm" c="dimmed" mt="md">
              Average conversion rate: 68.5%
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Analytics; 