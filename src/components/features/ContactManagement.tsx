import { useState } from 'react';
import { Stack, Title, Paper, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { ContactTable, ContactFilters } from './contact-management';
import { useContacts, useUpdateContactStatus } from '../../hooks/useContact';
import type { Contact } from '../../types/contact';

const ContactManagement = () => {
  const [search, setSearch] = useState('');
  const [addressed, setAddressed] = useState<boolean | undefined>(undefined);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isLoading } = useContacts({
    search,
    addressed,
    category,
    page,
    limit,
  });

  const updateContactStatus = useUpdateContactStatus();

  const handleToggleAddressed = async (contact: Contact) => {
    try {
      await updateContactStatus.mutateAsync({
        id: contact._id,
        data: { addressed: !contact.addressed }
      });

      notifications.show({
        title: 'Success',
        message: 'Contact status updated successfully',
        color: 'green',
      });
    } catch (err) {
      console.error('Error updating contact status:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to update contact status',
        color: 'red',
      });
    }
  };

  return (
    <Stack gap="md">
      <Title order={2}>Contact Management</Title>
      <Text c="dimmed">Manage and respond to contact requests from users</Text>

      <Paper p="md" withBorder>
        <Stack gap="lg">
          <ContactFilters
            search={search}
            onSearchChange={setSearch}
            addressed={addressed}
            onAddressedChange={setAddressed}
            category={category}
            onCategoryChange={setCategory}
          />

          <ContactTable
            contacts={response?.contacts || []}
            isLoading={isLoading}
            onToggleAddressed={handleToggleAddressed}
            currentPage={page}
            totalPages={response?.pages || 1}
            onPageChange={setPage}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ContactManagement; 