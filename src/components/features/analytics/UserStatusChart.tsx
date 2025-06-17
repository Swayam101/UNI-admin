import { Card, Title, Text, Group, Stack, Skeleton } from '@mantine/core';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface UserStatusData {
  name: string;
  value: number;
  color: string;
}

interface UserStatusChartProps {
  data: UserStatusData[];
  loading?: boolean;
}

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const UserStatusChart = ({ data, loading = false }: UserStatusChartProps) => {
  const ChartSkeleton = () => (
    <Card padding="lg" radius="md" withBorder>
      <Skeleton height={24} mb="md" width={150} />
      <Group>
        <Skeleton height={200} width={200} circle />
        <Stack gap="xs" flex={1}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Group key={index} gap="xs">
              <Skeleton height={12} width={12} />
              <Skeleton height={16} width={80} />
              <Skeleton height={16} width={40} />
            </Group>
          ))}
        </Stack>
      </Group>
    </Card>
  );

  if (loading) {
    return <ChartSkeleton />;
  }

  const renderCustomizedLabel = (entry: PieLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = entry.innerRadius + (entry.outerRadius - entry.innerRadius) * 0.5;
    const x = entry.cx + radius * Math.cos(-entry.midAngle * RADIAN);
    const y = entry.cy + radius * Math.sin(-entry.midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > entry.cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {`${(entry.percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">User Status Distribution</Title>
      
      <Group align="flex-start">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [value.toLocaleString(), 'Users']}
              contentStyle={{
                backgroundColor: 'var(--mantine-color-body)',
                border: '1px solid var(--mantine-color-gray-3)',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <Stack gap="xs" flex={1}>
          {data.map((entry, index) => (
            <Group key={index} gap="sm">
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  borderRadius: '50%',
                }}
              />
              <Text size="sm" flex={1}>
                {entry.name}
              </Text>
              <Text size="sm" fw={600}>
                {entry.value.toLocaleString()}
              </Text>
            </Group>
          ))}
        </Stack>
      </Group>
    </Card>
  );
};

export default UserStatusChart; 