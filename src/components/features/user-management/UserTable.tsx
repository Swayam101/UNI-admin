import {
  Table,
  Group,
  Badge,
  Text,
  Avatar,
  ActionIcon,
  Skeleton,
} from '@mantine/core';
import {
  IconEye,
} from '@tabler/icons-react';
import type { User } from '../../../types/user';
import { ProfileStage } from '../../../types/user';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onViewUser: (user: User) => void;
}

const UserTable = ({ 
  users, 
  isLoading, 
  onViewUser,
}: UserTableProps) => {
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Student</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Profile Stage</Table.Th>
          <Table.Th>Major/University</Table.Th>
          <Table.Th>Graduation Year</Table.Th>
          <Table.Th>Premium</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 4 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Group gap="sm">
                <Skeleton height={40} width={40} circle />
                <div>
                  <Skeleton height={16} width={120} mb={4} />
                  <Skeleton height={12} width={180} />
                </div>
              </Group>
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={60} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={80} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={100} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={60} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={50} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Skeleton height={28} width={28} circle />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  const getProfileStageColor = (stage: ProfileStage | undefined,isProfileComplete:boolean) => {
    if(isProfileComplete) return 'green';
    switch (stage) {
      case ProfileStage.UPLOAD_PHOTOS:
        return 'red';
      case ProfileStage.ABOUT_YOU:
        return 'orange';
      case ProfileStage.PREFERENCES:
        return 'yellow';
      case ProfileStage.PROFILE_PREVIEW:
        return 'blue';
      case ProfileStage.PAYMENT:
        return 'turquoise';
      default:
        return 'gray';
    }
  };

  const getProfileStageLabel = (stage: ProfileStage | undefined,isProfileComplete:boolean) => {
    if (!stage) return 'Not Started';
    if (isProfileComplete) return 'Complete';
    return stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  const rows = users.map((user) => (
    <Table.Tr key={user._id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius="xl" src={user.profilePicture} color="blue">
            {!user.profilePicture && getInitials(user.firstName, user.lastName)}
          </Avatar>
          <div>
            <Text fw={500}>{user.firstName} {user.lastName}</Text>
            <Text size="sm" c="dimmed">{user.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color="blue" variant="light">
          {user.role || 'student'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={getProfileStageColor(user.profileStage,!!user.isProfileCompleted)} variant="light">
          {getProfileStageLabel(user.profileStage,!!user.isProfileCompleted)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <div>
          <Text size="sm">{user.major || 'Not specified'}</Text>
          {user.university && (
            <Text size="xs" c="dimmed">{user.university}</Text>
          )}
        </div>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.collegeGraduationYear || 'N/A'}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={user.isSubscribed ? 'gold' : 'gray'} variant="outline">
          {user.isSubscribed ? 'Premium' : 'Free'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => onViewUser(user)}>
            <IconEye size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table verticalSpacing="sm" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Student</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Profile Stage</Table.Th>
          <Table.Th>Major/University</Table.Th>
          <Table.Th>Graduation Year</Table.Th>
          <Table.Th>Premium</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default UserTable; 