import { SimpleGrid, Paper, Text, Group } from '@mantine/core';
import {
  IconCreditCard,
  IconTrendingUp,
  IconUsers,
  IconCalendar,
} from '@tabler/icons-react';

interface PaymentStatsProps {
  totalRevenue: number;
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
}

export const PaymentStats = ({
  totalRevenue,
  totalTransactions,
  completedTransactions,
  pendingTransactions,
}: PaymentStatsProps) => {
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: IconCreditCard,
      color: 'green',
    },
    {
      title: 'Total Transactions',
      value: totalTransactions.toLocaleString(),
      icon: IconTrendingUp,
      color: 'blue',
    },
    {
      title: 'Completed',
      value: completedTransactions.toLocaleString(),
      icon: IconUsers,
      color: 'teal',
    },
    {
      title: 'Pending',
      value: pendingTransactions.toLocaleString(),
      icon: IconCalendar,
      color: 'orange',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="lg">
      {stats.map((stat) => (
        <Paper key={stat.title} p="md" radius="md" withBorder>
          <Group justify="apart">
            <div>
              <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                {stat.title}
              </Text>
              <Text fw={700} size="xl" c={stat.color}>
                {stat.value}
              </Text>
            </div>
            <stat.icon size={32} color={`var(--mantine-color-${stat.color}-6)`} />
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}; 