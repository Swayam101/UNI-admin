import { useState } from 'react';
import {
  Title,
  Card,
  Stack,
  Alert,
  Pagination,
  Group,
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

  // API hooks
  const { data: userData, isLoading, error } = useUsers({ 
    page: currentPage, 
    limit: 10, 
    search: searchQuery 
  });

  const updateMutation = useUpdateUser();

  // Extract users array and pagination data from structured response
  const users = userData?.users || [];
  const totalUsers = userData?.totalDocs || 0;
  const totalPages = Math.ceil(totalUsers / 10);

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