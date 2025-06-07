import { useState, useEffect } from 'react';
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
  Skeleton,
  Transition,
} from '@mantine/core';
import {
  IconUsers,
  IconTrendingUp,
  IconMessages,
  IconSchool,
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState([false, false, false, false]);
  const [chartsVisible, setChartsVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);

  // Simulate loading and staggered animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setMounted(true);
      
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
  }, []);

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

  // Skeleton Components
  const StatSkeleton = () => (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <div style={{ flex: 1 }}>
          <Skeleton height={12} width="60%" mb="xs" />
          <Skeleton height={28} width="40%" mb="xs" />
          <Skeleton height={20} width="80%" />
        </div>
        <Skeleton height={40} width={40} circle />
      </Group>
    </Card>
  );

  const ChartSkeleton = ({ height = 300 }) => (
    <Card padding="lg" radius="md" withBorder>
      <Skeleton height={24} width="50%" mb="md" />
      <Skeleton height={height} radius="md" />
    </Card>
  );

  const TableSkeleton = () => (
    <Card padding="lg" radius="md" withBorder>
      <Skeleton height={24} width="40%" mb="md" />
      <Stack gap="md">
        {Array.from({ length: 5 }).map((_, index) => (
          <Group key={index} justify="space-between">
            <Skeleton height={16} width="20%" />
            <Skeleton height={16} width="15%" />
            <Skeleton height={16} width="15%" />
            <Skeleton height={16} width="20%" />
            <Skeleton height={8} width="25%" />
          </Group>
        ))}
      </Stack>
    </Card>
  );

  return (
    <Stack gap="lg">
      <Transition
        mounted={mounted}
        transition="slide-down"
        duration={700}
        timingFunction="ease"
      >
        {(styles) => (
          <Group justify="space-between" style={styles}>
            <Title order={1}>
              Analytics Dashboard
            </Title>
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
                styles={{
                  input: {
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 15px rgba(51, 154, 240, 0.2)'
                    }
                  }
                }}
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
                styles={{
                  input: {
                    transition: 'all 0.3s ease',
                    '&:focus': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 15px rgba(51, 154, 240, 0.2)'
                    }
                  }
                }}
              />
            </Group>
          </Group>
        )}
      </Transition>

      {/* Key Metrics with Animation */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatSkeleton key={index} />
          ))
        ) : (
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(102, 126, 234, 0.15)`;
                    e.currentTarget.style.background = `linear-gradient(135deg, var(--mantine-color-${stat.color}-0), var(--mantine-color-${stat.color}-1))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.background = 'linear-gradient(135deg, var(--mantine-color-default-0), var(--mantine-color-default-1))';
                  }}
                >
                  <Group justify="space-between">
                    <div>
                      <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                        {stat.title}
                      </Text>
                      <Text 
                        fw={700} 
                        size="xl" 
                      >
                        {stat.value}
                      </Text>
                      <Group gap="xs">
                        <Badge 
                          color={stat.color} 
                          variant="light"
                        >
                          {stat.change}
                        </Badge>
                        <Text size="sm" c="dimmed">vs last period</Text>
                      </Group>
                    </div>
                    <div 
                      style={{
                        padding: '15px',
                        borderRadius: '16px',
                        background: `linear-gradient(135deg, var(--mantine-color-${stat.color}-1), var(--mantine-color-${stat.color}-0))`,
                        transition: 'all 0.3s ease',
                        border: `2px solid var(--mantine-color-${stat.color}-2)`,
                      }}
                    >
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
        {/* Signups & Posts Trend */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Transition
            mounted={chartsVisible}
            transition="slide-right"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              loading ? (
                <ChartSkeleton />
              ) : (
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder 
                  style={{
                    ...styles,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(51, 154, 240, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Title order={3} mb="md">
                    Signups & Posts Trend
                  </Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={signupData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Line 
                        type="monotone" 
                        dataKey="signups" 
                        stroke="#339af0" 
                        strokeWidth={3}
                        dot={{ fill: '#339af0', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#339af0', strokeWidth: 2, fill: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="posts" 
                        stroke="#51cf66" 
                        strokeWidth={3}
                        dot={{ fill: '#51cf66', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#51cf66', strokeWidth: 2, fill: '#fff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              )
            )}
          </Transition>
        </Grid.Col>

        {/* User Status Distribution */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Transition
            mounted={chartsVisible}
            transition="slide-left"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              loading ? (
                <ChartSkeleton />
              ) : (
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder 
                  style={{
                    ...styles,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Title order={3} mb="md">
                    User Distribution
                  </Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {userStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <Stack gap="xs" mt="md">
                    {userStatusData.map((item, index) => (
                      <Group 
                        key={item.name} 
                        justify="space-between"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          animation: `fadeInUp 0.4s ease ${0.1 * index}s both`
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
                        <Group gap="xs">
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: item.color,
                              boxShadow: `0 0 10px ${item.color}40`,
                            }}
                          />
                          <Text size="sm" fw={500}>{item.name}</Text>
                        </Group>
                        <Badge variant="light" color="gray">
                          {item.value}
                        </Badge>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              )
            )}
          </Transition>
        </Grid.Col>
      </Grid>

      <Grid>
        {/* School Performance */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Transition
            mounted={tableVisible}
            transition="slide-up"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              loading ? (
                <TableSkeleton />
              ) : (
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder 
                  style={{
                    ...styles,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Title order={3} mb="md">
                    School Performance
                  </Title>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr style={{ background: 'var(--mantine-color-gray-0)' }}>
                        <Table.Th>School</Table.Th>
                        <Table.Th>Signups</Table.Th>
                        <Table.Th>Posts</Table.Th>
                        <Table.Th>Revenue</Table.Th>
                        <Table.Th>Conversion</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {schoolPerformance.map((school, index) => (
                        <Table.Tr 
                          key={school.name}
                          style={{
                            transition: 'all 0.2s ease',
                            animation: `slideInUp 0.3s ease ${0.1 * index}s both`,
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--mantine-color-blue-0)';
                            e.currentTarget.style.transform = 'scale(1.01)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <Table.Td>
                            <Text fw={600}>
                              {school.name}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge variant="light" color="blue">
                              {school.signups}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Badge variant="light" color="green">
                              {school.posts}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text fw={600}>
                              ${school.revenue.toLocaleString()}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <Progress 
                                value={school.conversion} 
                                size="lg" 
                                style={{ 
                                  flex: 1,
                                  background: 'var(--mantine-color-gray-1)'
                                }}
                                color={school.conversion > 60 ? 'green' : school.conversion > 50 ? 'yellow' : 'red'}
                              />
                              <Text size="sm" fw={600}>
                                {school.conversion}%
                              </Text>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Card>
              )
            )}
          </Transition>
        </Grid.Col>

        {/* Conversion Rate Trend */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Transition
            mounted={tableVisible}
            transition="fade"
            duration={800}
            timingFunction="ease"
          >
            {(styles) => (
              loading ? (
                <ChartSkeleton height={250} />
              ) : (
                <Card 
                  padding="lg" 
                  radius="md" 
                  withBorder 
                  style={{
                    ...styles,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(32, 201, 151, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Title order={3} mb="md">
                    Conversion Rate
                  </Title>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Bar 
                        dataKey="rate" 
                        fill="#339af0" 
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <Group justify="space-between" mt="md">
                    <Text size="sm" c="dimmed">
                      Average conversion rate
                    </Text>
                    <Badge 
                      variant="light" 
                      color="teal" 
                      size="lg"
                    >
                      68.5%
                    </Badge>
                  </Group>
                </Card>
              )
            )}
          </Transition>
        </Grid.Col>
      </Grid>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
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

export default Analytics; 