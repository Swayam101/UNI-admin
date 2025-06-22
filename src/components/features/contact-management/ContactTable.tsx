import {
  Table,
  Group,
  Badge,
  Text,
  ActionIcon,
  Skeleton,
  Switch,
  Pagination,
  Stack,
} from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import type { Contact } from '../../../types/contact';

interface ContactTableProps {
  contacts: Contact[];
  isLoading: boolean;
  onToggleAddressed: (contact: Contact) => void;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const ContactTable = ({ 
  contacts, 
  isLoading, 
  onToggleAddressed,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
}: ContactTableProps) => {
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Subject</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Message</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 4 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td><Skeleton height={16} width={120} /></Table.Td>
            <Table.Td><Skeleton height={16} width={180} /></Table.Td>
            <Table.Td><Skeleton height={16} width={150} /></Table.Td>
            <Table.Td><Skeleton height={16} width={100} /></Table.Td>
            <Table.Td><Skeleton height={16} width={250} /></Table.Td>
            <Table.Td><Skeleton height={20} width={80} radius="sm" /></Table.Td>
            <Table.Td><Skeleton height={16} width={100} /></Table.Td>
            <Table.Td><Skeleton height={28} width={28} circle /></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const rows = contacts.map((contact) => (
    <Table.Tr key={contact._id}>
      <Table.Td>
        <Text fw={500}>{contact.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{contact.email}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{contact.subject}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="light">{contact.category}</Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" lineClamp={2}>{contact.message}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={contact.addressed ? 'green' : 'yellow'} variant="light">
          {contact.addressed ? 'Addressed' : 'Pending'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="gray" size="sm">
            <IconClock size={16} />
          </ActionIcon>
          <Text size="sm">{formatDate(contact.createdAt)}</Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Switch
          checked={contact.addressed}
          onChange={() => onToggleAddressed(contact)}
          size="md"
          color="green"
          label="Mark as addressed"
          labelPosition="left"
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Subject</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Message</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      
      {totalPages > 1 && (
        <Group justify="center">
          <Pagination
            value={currentPage}
            onChange={onPageChange}
            total={totalPages}
          />
        </Group>
      )}
    </Stack>
  );
};

export default ContactTable; 