import { useState } from 'react';
import {
  Title,
  Card,
  Stack,
  Alert,
  Pagination,
  Group,
  Select,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useUsers, useUpdateUser } from '../../hooks/useUser';
import type { User } from '../../types/user';
import {
  UserTable,
  UserFilters,
  UserDetailsModal,
} from './user-management';

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API hooks
  const { data: userData, isLoading, error } = useUsers({ 
    page: currentPage, 
    limit: pageSize, 
    search: searchQuery 
  });

  const updateMutation = useUpdateUser();

  // Extract users array and pagination data from structured response
  const users = userData?.users || [];
  const totalUsers = userData?.total || 0;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    open();
  };



  const handleUpdateUserStatus = async (id: string, updates: { isBanned?: boolean; isSubscribed?: boolean }) => {
    try {
      await updateMutation.mutateAsync({ id, data: {
        status: updates.isBanned ? "banned" : "active",
        isSubscribed: updates.isSubscribed,
      } });
      close()
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: string | null) => {
    if (value) {
      setPageSize(parseInt(value));
      setCurrentPage(1);
    }
  };

  return (
    <Stack gap="md">
      <Title order={2}>User Management</Title>
      
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red">
          Error loading users: {error.message}
        </Alert>
      )}

      <Card padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <UserFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <UserTable
            users={users}
            isLoading={isLoading}
            onViewUser={handleViewUser}
          />

          <Group justify="space-between" align="center">
            <Select
              value={pageSize.toString()}
              onChange={handlePageSizeChange}
              data={[
                { value: '5', label: '5 per page' },
                { value: '10', label: '10 per page' },
                { value: '25', label: '25 per page' },
                { value: '50', label: '50 per page' },
              ]}
              style={{ width: 130 }}
            />
            <Pagination
              value={currentPage}
              onChange={handlePageChange}
              total={totalPages}
              boundaries={1}
              siblings={1}
            />
          </Group>
        </Stack>
      </Card>

      {/* User Details Modal */}
      <UserDetailsModal
        opened={opened}
        onClose={close}
        user={selectedUser}
        onUpdateUserStatus={handleUpdateUserStatus}
        isUpdating={updateMutation.isPending}
      />

     
    </Stack>
  );
};

export default UserManagement; 