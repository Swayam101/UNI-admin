import { Card, Group, Text, Badge } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: Icon;
}

const StatCard = ({ title, value, change, color, icon: IconComponent }: StatCardProps) => {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <div style={{ flex: 1 }}>
          <Text size="sm" c="dimmed" fw={500} tt="uppercase">
            {title}
          </Text>
          <Text size="xl" fw={700} my="xs">
            {value}
          </Text>
          <Badge color={color} variant="light" size="sm">
            {change}
          </Badge>
        </div>
        <IconComponent size={40} stroke={1.5} color={`var(--mantine-color-${color}-6)`} />
      </Group>
    </Card>
  );
};

export default StatCard; 