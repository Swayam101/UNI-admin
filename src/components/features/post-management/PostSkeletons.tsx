import { Table, Group, Skeleton } from '@mantine/core';

export const PostTableSkeleton = () => (
  <Table verticalSpacing="sm">
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Content</Table.Th>
        <Table.Th>College</Table.Th>
        <Table.Th>Status</Table.Th>
        <Table.Th>Instagram</Table.Th>
        <Table.Th>Scheduled</Table.Th>
        <Table.Th>Engagement</Table.Th>
        <Table.Th>Actions</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      {Array.from({ length: 4 }).map((_, index) => (
        <Table.Tr key={index}>
          <Table.Td>
            <div>
              <Skeleton height={16} width="90%" mb={4} />
              <Skeleton height={12} width="60%" />
            </div>
          </Table.Td>
          <Table.Td>
            <Skeleton height={14} width={120} />
          </Table.Td>
          <Table.Td>
            <Skeleton height={20} width={70} radius="sm" />
          </Table.Td>
          <Table.Td>
            <Skeleton height={20} width={80} radius="sm" />
          </Table.Td>
          <Table.Td>
            <Skeleton height={14} width={140} />
          </Table.Td>
          <Table.Td>
            <Skeleton height={14} width={60} />
          </Table.Td>
          <Table.Td>
            <Group gap="xs">
              <Skeleton height={28} width={28} circle />
              <Skeleton height={28} width={28} circle />
              <Skeleton height={28} width={28} circle />
            </Group>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
); 