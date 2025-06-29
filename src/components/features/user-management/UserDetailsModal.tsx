import {
  Modal,
  Stack,
  Group,
  Avatar,
  Text,
  Badge,
  Button,
  Divider,
  Alert,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCalendar,
} from '@tabler/icons-react';
import type { User } from '../../../types/user';

interface UserDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUserStatus: (id: string, updates: { isBanned?: boolean; isSubscribed?: boolean }) => void;
  isUpdating?: boolean;
}

const UserDetailsModal = ({
  opened,
  onClose,
  user,
  onUpdateUserStatus,
  isUpdating = false,
}: UserDetailsModalProps) => {
  if (!user) return null;

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleBanToggle = () => {
    if (user._id) {
      onUpdateUserStatus(user._id, { isBanned: user.status!=="banned" });
    }
  };

  const handlePremiumToggle = () => {
    if (user._id) {
      onUpdateUserStatus(user._id, { isSubscribed: !user.isSubscribed });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="User Details"
      size="md"
      centered
    >
      <Stack gap="md">
        {/* User Header */}
        <Group>
          <Avatar
            size={80}
            radius="xl"
            src={user.profilePicture}
            color="blue"
          >
            {!user.profilePicture && getInitials(user.firstName || '', user.lastName || '')}
          </Avatar>
          <div style={{ flex: 1 }}>
            <Text size="xl" fw={600}>
              {user.firstName} {user.lastName}
            </Text>
            <Text size="sm" c="dimmed" mb="xs">
              {user.email}
            </Text>
            <Group gap="xs">
              <Badge color={user.status==="banned" ? 'red' : 'green'} variant="light">
                {user.status==="banned" ? 'Banned' : 'Active'}
              </Badge>
              <Badge color={user.isSubscribed ? 'gold' : 'gray'} variant="outline">
                {user.isSubscribed ? 'Premium' : 'Free'}
              </Badge>
              <Badge color="blue" variant="light">
                {user.role || 'student'}
              </Badge>
            </Group>
          </div>
        </Group>

        <Divider />

        {/* Basic User Information */}
        <Group justify="space-between">
          <div>
            <Text size="sm" fw={500} c="dimmed" mb={4}>
              Join Date
            </Text>
            <Group gap="xs">
              <IconCalendar size={16} />
              <Text size="sm">{formatDate(new Date(user.createdAt!).toISOString())}</Text>
            </Group>
          </div>
          
          <div>
            <Text size="sm" fw={500} c="dimmed" mb={4}>
              User ID
            </Text>
            <Text size="sm" style={{ fontFamily: 'monospace' }}>
              {user._id?.slice(-8) || 'N/A'}
            </Text>
          </div>
        </Group>

        {/* Admin Actions */}
        <Divider />
        <div>
          <Text size="sm" fw={500} c="dimmed" mb="md">
            Admin Actions
          </Text>
          
          {user.status==="banned" && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
              This user is currently banned and cannot access the platform.
            </Alert>
          )}
          
          <Group>
            <Button
              variant={user.status==="banned" ? 'light' : 'filled'}
              color={user.status==="banned" ? 'green' : 'red'}
              onClick={handleBanToggle}
              loading={isUpdating}
              disabled={!user._id}
            >
              {user.status==="banned" ? 'Unban User' : 'Ban User'}
            </Button>
            
            <Button
              variant={user.isSubscribed ? 'light' : 'filled'}
              color={user.isSubscribed ? 'gray' : 'gold'}
              c={"white"}
              onClick={handlePremiumToggle}
              loading={isUpdating}
              disabled={!user._id}
            >
              {user.isSubscribed ? 'Remove Premium' : 'Grant Premium'}
            </Button>
          </Group>
        </div>
      </Stack>
    </Modal>
  );
};

export default UserDetailsModal;