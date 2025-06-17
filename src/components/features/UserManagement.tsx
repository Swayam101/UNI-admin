import { useState } from 'react';
import {
  Title,
  Card,
  Stack,
  Alert,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useUsers, useUpdateUser } from '../../hooks/useUser';
import TestimonialModal from '../common/TestimonialModal';
import type { User } from '../../types/user';
import {
  UserTable,
  UserFilters,
  UserDetailsModal,
} from './user-management';

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [testimonialOpened, { open: openTestimonial, close: closeTestimonial }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [testimonialUser, setTestimonialUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // API hooks
  const { data: userData, isLoading, error } = useUsers();
  const updateMutation = useUpdateUser();

  // Extract users array from structured response
  const users = userData?.users || [];
  // const totalUsers = userData?.total || 0;

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    open();
  };

  const handleCreateTestimonial = (user: User) => {
    setTestimonialUser(user);
    openTestimonial();
  };

  const handleUpdateUserStatus = async (id: string, updates: { isApproved?: boolean; isPremium?: boolean }) => {
    try {
      await updateMutation.mutateAsync({ id, data: updates });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.major && user.major.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (user.university && user.university.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <Stack gap="md">
      <Title order={2}>User Management </Title>
      
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red">
          Error loading users: {error.message}
        </Alert>
      )}

      <Card padding="lg" radius="md" withBorder>
        <UserFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <UserTable
          users={filteredUsers}
          isLoading={isLoading}
          onViewUser={handleViewUser}
          onCreateTestimonial={handleCreateTestimonial}
        />
      </Card>

      {/* User Details Modal */}
      <UserDetailsModal
        opened={opened}
        onClose={close}
        user={selectedUser}
        onUpdateUserStatus={handleUpdateUserStatus}
        isUpdating={updateMutation.isPending}
      />

      {/* Testimonial Modal */}
      <TestimonialModal
        opened={testimonialOpened}
        onClose={closeTestimonial}
        user={testimonialUser}
      />
    </Stack>
  );
};

export default UserManagement; 