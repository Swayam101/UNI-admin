import { Card, Title, Group, Select, Skeleton } from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartDataPoint {
  name: string;
  date: string;
  signups: number;
  posts: number;
}

interface TrendChartProps {
  data: ChartDataPoint[];
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  loading?: boolean;
}

const TrendChart = ({ data, dateRange, onDateRangeChange, loading = false }: TrendChartProps) => {
  const ChartSkeleton = () => (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Skeleton height={24} width={200} />
        <Skeleton height={36} width={120} />
      </Group>
      <Skeleton height={300} />
    </Card>
  );

  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={3}>Trend Analysis</Title>
        {/* <Select
          value={dateRange}
          onChange={(value) => onDateRangeChange(value || '30')}
          data={[
            { value: '7', label: 'Last 7 days' },
            { value: '30', label: 'Last 30 days' },
            { value: '90', label: 'Last 3 months' },
            { value: '365', label: 'Last year' },
          ]}
          size="sm"
          w={140}
        /> */}
      </Group>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            fontSize={12} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--mantine-color-body)',
              border: '1px solid var(--mantine-color-gray-3)',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="signups" 
            stroke="var(--mantine-color-blue-6)" 
            strokeWidth={3}
            dot={{ fill: 'var(--mantine-color-blue-6)', strokeWidth: 2, r: 4 }}
            name="Sign-ups"
          />
          <Line 
            type="monotone" 
            dataKey="posts" 
            stroke="var(--mantine-color-orange-6)" 
            strokeWidth={3}
            dot={{ fill: 'var(--mantine-color-orange-6)', strokeWidth: 2, r: 4 }}
            name="Posts"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TrendChart; 