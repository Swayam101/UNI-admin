import {
  Modal,
  Stack,
  Group,
  Avatar,
  Text,
  Badge,
  Button,
  SimpleGrid,
  Divider,
  Alert,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandSnapchat,
  IconCalendar,
  IconMapPin,
} from '@tabler/icons-react';
import type { User } from '../../../types/user';

interface UserDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onUpdateUserStatus: (id: string, updates: { isApproved?: boolean; isPremium?: boolean }) => void;
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

  const handleApprovalToggle = () => {
    if (user._id) {
      onUpdateUserStatus(user._id, { isApproved: !user.isApproved });
    }
  };

  const handlePremiumToggle = () => {
    if (user._id) {
      onUpdateUserStatus(user._id, { isPremium: !user.isPremium });
    }
  };

  const getLocationDisplay = (location: any) => {
    if (!location) return 'Not specified';
    if (typeof location === 'string') return location;
    if (location.coordinates && Array.isArray(location.coordinates)) {
      return `${location.coordinates[1]}, ${location.coordinates[0]}`;
    }
    return 'Not specified';
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="User Details"
      size="lg"
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
            {!user.profilePicture && getInitials(user.firstName, user.lastName)}
          </Avatar>
          <div style={{ flex: 1 }}>
            <Text size="xl" fw={600}>
              {user.firstName} {user.lastName}
            </Text>
            <Text size="sm" c="dimmed" mb="xs">
              {user.email}
            </Text>
            <Group gap="xs">
              <Badge color={user.isApproved ? 'green' : 'yellow'} variant="light">
                {user.isApproved ? 'Approved' : 'Pending'}
              </Badge>
              <Badge color={user.isPremium ? 'gold' : 'gray'} variant="outline">
                {user.isPremium ? 'Premium' : 'Free'}
              </Badge>
              <Badge color="blue" variant="light">
                {user.role || 'student'}
              </Badge>
            </Group>
          </div>
        </Group>

        <Divider />

        {/* User Information */}
        <SimpleGrid cols={2} spacing="md">
          <div>
            <Text size="sm" fw={500} c="dimmed" mb={4}>
              Field of Study
            </Text>
            <Text size="sm">{user.studying || 'Not specified'}</Text>
          </div>
          
          <div>
            <Text size="sm" fw={500} c="dimmed" mb={4}>
              Graduation Year
            </Text>
            <Group gap="xs">
              <IconCalendar size={16} />
              <Text size="sm">{user.collegeGraduationYear || 'N/A'}</Text>
            </Group>
          </div>
          
          <div>
            <Text size="sm" fw={500} c="dimmed" mb={4}>
              Location
            </Text>
            <Group gap="xs">
              <IconMapPin size={16} />
              <Text size="sm">{getLocationDisplay(user.location)}</Text>
            </Group>
          </div>
          
          <div>
            <Text size="sm" fw={500} c="dimmed" mb={4}>
              Join Date
            </Text>
            <Text size="sm">{formatDate(user.createdAt)}</Text>
          </div>
        </SimpleGrid>

        {/* Bio */}
        {user.bio && (
          <>
            <Divider />
            <div>
              <Text size="sm" fw={500} c="dimmed" mb={4}>
                Bio
              </Text>
              <Text size="sm">{user.bio}</Text>
            </div>
          </>
        )}

        {/* Social Links */}
        {(user.instagram || user.twitter || user.snapchat) && (
          <>
            <Divider />
            <div>
              <Text size="sm" fw={500} c="dimmed" mb={8}>
                Social Media
              </Text>
              <Group gap="md">
                {user.instagram && (
                  <Group gap="xs">
                    <IconBrandInstagram size={16} color="#E4405F" />
                    <Text size="sm">@{user.instagram}</Text>
                  </Group>
                )}
                {user.twitter && (
                  <Group gap="xs">
                    <IconBrandTwitter size={16} color="#1DA1F2" />
                    <Text size="sm">@{user.twitter}</Text>
                  </Group>
                )}
                {user.snapchat && (
                  <Group gap="xs">
                    <IconBrandSnapchat size={16} color="#FFFC00" />
                    <Text size="sm">@{user.snapchat}</Text>
                  </Group>
                )}
              </Group>
            </div>
          </>
        )}

        {/* Admin Actions */}
        <Divider />
        <div>
          <Text size="sm" fw={500} c="dimmed" mb="md">
            Admin Actions
          </Text>
          
          {!user.isApproved && (
            <Alert icon={<IconAlertCircle size={16} />} color="yellow" mb="md">
              This user is pending approval. Review their information and approve if appropriate.
            </Alert>
          )}
          
          <Group>
            <Button
              variant={user.isApproved ? 'light' : 'filled'}
              color={user.isApproved ? 'red' : 'green'}
              onClick={handleApprovalToggle}
              loading={isUpdating}
              disabled={!user._id}
            >
              {user.isApproved ? 'Revoke Approval' : 'Approve User'}
            </Button>
            
            <Button
              variant={user.isPremium ? 'light' : 'filled'}
              color={user.isPremium ? 'gray' : 'gold'}
              onClick={handlePremiumToggle}
              loading={isUpdating}
              disabled={!user._id}
            >
              {user.isPremium ? 'Remove Premium' : 'Grant Premium'}
            </Button>
          </Group>
        </div>
      </Stack>
    </Modal>
  );
};

export default UserDetailsModal; 