import { SimpleGrid, Card, Stack, Group, Skeleton } from '@mantine/core';

export const StatSkeleton = () => (
  <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} padding="lg" radius="md" withBorder>
        <Group justify="apart" align="flex-start">
          <div style={{ flex: 1 }}>
            <Skeleton height={14} width="60%" mb={8} />
            <Skeleton height={28} width="80%" />
          </div>
          <Skeleton height={24} width={24} circle />
        </Group>
      </Card>
    ))}
  </SimpleGrid>
);

export const ActivitySkeleton = () => (
  <Card padding="lg" radius="md" withBorder h="100%">
    <Stack gap="md" h="100%">
      <Skeleton height={24} width="40%" />
      
      <Stack gap="xs" style={{ flex: 1 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Group key={index} gap="md" style={{ padding: '12px' }}>
            <Skeleton height={32} width={32} circle />
            <div style={{ flex: 1 }}>
              <Skeleton height={16} width="85%" mb={4} />
              <Group gap="xs">
                <Skeleton height={18} width={60} radius="sm" />
                <Skeleton height={12} width={80} />
              </Group>
            </div>
          </Group>
        ))}
      </Stack>
    </Stack>
  </Card>
);

export const WeatherSkeleton = () => (
  <Card 
    padding="md" 
    radius="md" 
    withBorder
    style={{ minWidth: 320 }}
  >
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Skeleton height={24} width={120} />
        <Group gap="xs">
          <Skeleton height={24} width={60} radius="sm" />
          <Skeleton height={24} width={50} radius="sm" />
        </Group>
      </Group>
      
      <Group gap="lg" justify="center">
        {Array.from({ length: 3 }).map((_, index) => (
          <Stack key={index} align="center" gap="xs">
            <Skeleton height={20} width={20} circle />
            <Skeleton height={16} width={40} />
            <Skeleton height={12} width={30} />
          </Stack>
        ))}
      </Group>
    </Stack>
  </Card>
);

export const TopSchoolsSkeleton = () => (
  <Card padding="lg" radius="md" withBorder h="100%">
    <Stack gap="md" h="100%">
      <Skeleton height={24} width="50%" />
      
      <Stack gap="xs" style={{ flex: 1 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Group key={index} gap="md" style={{ padding: '12px' }}>
            <Skeleton height={32} width={32} circle />
            <div style={{ flex: 1 }}>
              <Group justify="space-between" align="center" mb={4}>
                <Skeleton height={16} width="60%" />
                <Skeleton height={12} width="80px" />
              </Group>
              <Skeleton height={4} width="100%" radius="xl" />
            </div>
          </Group>
        ))}
      </Stack>
    </Stack>
  </Card>
); 