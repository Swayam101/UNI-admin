import { SimpleGrid, Card, Text, Group, ThemeIcon, Transition } from '@mantine/core';
import {
  IconCreditCard,
  IconTrendingUp,
} from '@tabler/icons-react';

interface PaymentStatsProps {
  totalRevenue: number;
  totalTransactions: number;
}

export const PaymentStats = ({
  totalRevenue,
  totalTransactions,
}: PaymentStatsProps) => {
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: IconCreditCard,
      color: 'green',
      gradient: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)',
      bg: 'rgba(81, 207, 102, 0.1)',
    },
    {
      title: 'Total Transactions',
      value: totalTransactions.toLocaleString(),
      icon: IconTrendingUp,
      color: 'blue',
      gradient: 'linear-gradient(135deg, #339af0 0%, #228be6 100%)',
      bg: 'rgba(51, 154, 240, 0.1)',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="lg">
      {stats.map((stat, index) => (
        <Transition
          key={stat.title}
          mounted={true}
          transition="slide-up"
          duration={400}
          timingFunction="ease"
          enterDelay={index * 100}
        >
          {(styles) => (
            <Card
              padding="xl"
              radius="xl"
              withBorder
              style={{
                ...styles,
                backgroundColor: 'white',
                border: `1px solid rgba(${stat.color === 'green' ? '81, 207, 102' : '51, 154, 240'}, 0.2)`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(${stat.color === 'green' ? '81, 207, 102' : '51, 154, 240'}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >

              
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Text 
                    size="sm" 
                    c="dimmed" 
                    fw={500} 
                    mb={8}
                    tt="uppercase"
                    style={{ letterSpacing: '0.5px' }}
                  >
                    {stat.title}
                  </Text>
                  <Text
                    size="2rem"
                    fw={700}
                    style={{
                      background: stat.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </Text>
                </div>
                
                <ThemeIcon
                  size={60}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: stat.color === 'green' ? 'teal' : 'blue', to: stat.color === 'green' ? 'green' : 'cyan' }}
                  style={{
                    boxShadow: `0 8px 20px rgba(${stat.color === 'green' ? '81, 207, 102' : '51, 154, 240'}, 0.4)`,
                  }}
                >
                  <stat.icon size={28} />
                </ThemeIcon>
              </Group>
            </Card>
          )}
        </Transition>
      ))}
    </SimpleGrid>
  );
};