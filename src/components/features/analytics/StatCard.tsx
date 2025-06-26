import { Card, Group, Text, Badge } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  icon: Icon;
  link?: string;
}

const StatCard = ({ title, value, change, color, icon: IconComponent, link }: StatCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card 
      padding="lg" 
      radius="md" 
      withBorder
      style={{
        cursor: link ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (link) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
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