import { Card, Title, Table, Text, Skeleton, Stack } from '@mantine/core';

interface SchoolData {
  name: string;
  signups: number;
  posts: number;
  revenue: number;
  conversion: number;
}

interface SchoolPerformanceTableProps {
  data: SchoolData[];
  loading?: boolean;
}

const SchoolPerformanceTable = ({ data, loading = false }: SchoolPerformanceTableProps) => {
  const TableSkeleton = () => (
    <Card padding="lg" radius="md" withBorder>
      <Skeleton height={24} mb="md" width={200} />
      <Stack gap="sm">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton height={16} width={100} />
            <Skeleton height={16} width={60} />
            <Skeleton height={16} width={60} />
            <Skeleton height={16} width={80} />
            <Skeleton height={16} width={60} />
          </div>
        ))}
      </Stack>
    </Card>
  );

  if (loading) {
    return <TableSkeleton />;
  }

  const rows = data.map((school) => (
    <Table.Tr key={school.name}>
      <Table.Td>
        <Text fw={500}>{school.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{school.signups.toLocaleString()}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{school.posts}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500} c="green">
          ${school.revenue.toLocaleString()}
        </Text>
      </Table.Td>
      <Table.Td>
        {/* Conversion rate display commented out - remove unused imports */}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">School Performance</Title>
      
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>School</Table.Th>
            <Table.Th>Sign-ups</Table.Th>
            <Table.Th>Posts</Table.Th>
            <Table.Th>Revenue</Table.Th>
            {/* <Table.Th>Conversion Rate</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default SchoolPerformanceTable; 