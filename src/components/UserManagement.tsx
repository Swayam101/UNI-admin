import { useState } from 'react';
import {
  Title,
  Card,
  Table,
  Button,
  Group,
  Badge,
  Stack,
  TextInput,
  ActionIcon,
  Text,
  Avatar,
  Select,
  Modal,
  Textarea,
  Skeleton,
  Alert,
  Divider,
  SimpleGrid,
} from '@mantine/core';
import {
  IconEye,
  IconSearch,
  IconAlertCircle,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandSnapchat,
  IconCalendar,
  IconMapPin,
  IconMessageDots,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useUsers, useUpdateUser } from '../hooks/useUser';
import TestimonialModal from './TestimonialModal';
import type { User } from '../types/user';

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [testimonialOpened, { open: openTestimonial, close: closeTestimonial }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [testimonialUser, setTestimonialUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // API hooks
  const { data: users = [], isLoading, error, refetch } = useUsers();
  const updateMutation = useUpdateUser();

  // Skeleton Components
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Student</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Field of Study</Table.Th>
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
              <Skeleton height={20} width={60} radius="sm" />
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
                <Skeleton height={28} width={28} circle />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

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
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.studying && user.studying.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesStatus = true;
    if (statusFilter === 'approved') {
      matchesStatus = user.isApproved === true;
    } else if (statusFilter === 'pending') {
      matchesStatus = user.isApproved !== true;
    } else if (statusFilter === 'premium') {
      matchesStatus = user.isPremium === true;
    }
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (isApproved: boolean | undefined) => {
    return isApproved ? 'green' : 'yellow';
  };

  const getStatusLabel = (isApproved: boolean | undefined) => {
    return isApproved ? 'Approved' : 'Pending';
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const rows = filteredUsers.map((user) => (
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
        <Badge color={getStatusColor(user.isApproved)} variant="light">
          {getStatusLabel(user.isApproved)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.studying || 'Not specified'}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.collegeGraduationYear || 'N/A'}</Text>
      </Table.Td>
      <Table.Td>
        <Badge color={user.isPremium ? 'gold' : 'gray'} variant="outline">
          {user.isPremium ? 'Premium' : 'Free'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleViewUser(user)}>
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="orange" onClick={() => handleCreateTestimonial(user)}>
            <IconMessageDots size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {isLoading ? (
          <>
            <Skeleton height={32} width={200} />
          </>
        ) : (
          <>
            <Title order={1}>User Management</Title>
          </>
        )}
      </Group>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red">
          Error loading users: {error.message}
          <Button variant="outline" size="xs" ml="md" onClick={() => refetch()}>
            Retry
          </Button>
        </Alert>
      )}

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          {isLoading ? (
            <>
              <Skeleton height={16} width={120} />
              <Group>
                <Skeleton height={36} width={150} />
                <Skeleton height={36} width={300} />
              </Group>
            </>
          ) : (
            <>
              <Text fw={500}>Users ({users.length})</Text>
              <Group>
                <Select
                  placeholder="Filter by status"
                  data={[
                    { value: 'all', label: 'All Users' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'premium', label: 'Premium' },
                  ]}
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value || 'all')}
                  style={{ width: 150 }}
                />
                <TextInput
                  placeholder="Search users..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                  style={{ width: 300 }}
                />
              </Group>
            </>
          )}
        </Group>

        <Table.ScrollContainer minWidth={900}>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Student</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Field of Study</Table.Th>
                  <Table.Th>Graduation Year</Table.Th>
                  <Table.Th>Premium</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text ta="center" py="xl" c="dimmed">
                        {searchQuery ? 'No users found matching your search.' : 'No users found.'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </Table.ScrollContainer>
      </Card>

      <Modal opened={opened} onClose={close} title="Student Profile Details" size="xl">
        {selectedUser && (
          <Stack gap="lg">
            {/* Header Section */}
            <Group>
              <Avatar size={80} radius="xl" src={selectedUser.profilePicture} color="blue">
                {!selectedUser.profilePicture && getInitials(selectedUser.firstName, selectedUser.lastName)}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text fw={600} size="xl">{selectedUser.firstName} {selectedUser.lastName}</Text>
                <Text c="dimmed" size="md">{selectedUser.email}</Text>
                {selectedUser.mobileNumber && (
                  <Text c="dimmed" size="sm">{selectedUser.mobileNumber}</Text>
                )}
                <Group gap="xs" mt="sm">
                  <Badge color={getStatusColor(selectedUser.isApproved)} variant="light">
                    {getStatusLabel(selectedUser.isApproved)}
                  </Badge>
                  <Badge color="blue" variant="light">
                    {selectedUser.role || 'student'}
                  </Badge>
                  {selectedUser.isPremium && (
                    <Badge color="gold" variant="light">Premium</Badge>
                  )}
                </Group>
              </div>
            </Group>

            {/* Bio Section */}
            {selectedUser.bio && (
              <div>
                <Text fw={500} mb="xs">About</Text>
                <Textarea
                  value={selectedUser.bio}
                  readOnly
                  minRows={3}
                  styles={{
                    input: {
                      backgroundColor: 'var(--mantine-color-gray-0)',
                      border: '1px solid var(--mantine-color-gray-3)',
                    },
                  }}
                />
              </div>
            )}

            <Divider label="Academic Information" labelPosition="left" />

            {/* Academic Information */}
            <SimpleGrid cols={3} spacing="md">
              <div>
                <Text size="sm" c="dimmed" mb={4}>Field of Study</Text>
                <Text fw={500}>{selectedUser.studying || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Graduation Year</Text>
                <Text fw={500}>{selectedUser.collegeGraduationYear || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Date of Birth</Text>
                <Group gap="xs">
                  <IconCalendar size={16} color="var(--mantine-color-dimmed)" />
                  <Text fw={500}>{formatDate(selectedUser.dob)}</Text>
                </Group>
              </div>
            </SimpleGrid>

            <Divider label="Personal Information" labelPosition="left" />

            {/* Personal Information */}
            <SimpleGrid cols={2} spacing="md">
              <div>
                <Text size="sm" c="dimmed" mb={4}>Gender</Text>
                <Text fw={500}>{selectedUser.gender || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Religion</Text>
                <Text fw={500}>{selectedUser.religion || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Zodiac Sign</Text>
                <Text fw={500}>{selectedUser.zodiac || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Personality Type</Text>
                <Text fw={500}>{selectedUser.personality || 'Not specified'}</Text>
              </div>
            </SimpleGrid>

            {/* Address */}
            {selectedUser.address && (
              <div>
                <Text size="sm" c="dimmed" mb={4}>Address</Text>
                <Group gap="xs">
                  <IconMapPin size={16} color="var(--mantine-color-dimmed)" />
                  <Text fw={500}>{selectedUser.address}</Text>
                </Group>
              </div>
            )}

            <Divider label="Lifestyle & Preferences" labelPosition="left" />

            {/* Lifestyle Information */}
            <SimpleGrid cols={2} spacing="md">
              <div>
                <Text size="sm" c="dimmed" mb={4}>Housing Preference</Text>
                <Text fw={500}>{selectedUser.housing || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Sleep Schedule</Text>
                <Text fw={500}>{selectedUser.sleepSchedule || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Cleanliness</Text>
                <Text fw={500}>{selectedUser.cleanliness || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Guests Policy</Text>
                <Text fw={500}>{selectedUser.guests || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Substances</Text>
                <Text fw={500}>{selectedUser.substances || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Physical Activity</Text>
                <Text fw={500}>{selectedUser.physicalActivity || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Food Preference</Text>
                <Text fw={500}>{selectedUser.food || 'Not specified'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Pastimes</Text>
                <Text fw={500}>{selectedUser.pastimes || 'Not specified'}</Text>
              </div>
            </SimpleGrid>

            {/* Interests */}
            {selectedUser.interests && selectedUser.interests.length > 0 && (
              <div>
                <Text size="sm" c="dimmed" mb="xs">Interests & Hobbies</Text>
                <Group gap="xs">
                  {selectedUser.interests.map((interest, index) => (
                    <Badge key={index} variant="outline" size="sm" color="blue">
                      {interest}
                    </Badge>
                  ))}
                </Group>
              </div>
            )}

            {/* Social Media */}
            {(selectedUser.instagram || selectedUser.snapchat || selectedUser.twitter) && (
              <>
                <Divider label="Social Media" labelPosition="left" />
                <Group gap="md">
                  {selectedUser.instagram && (
                    <Group gap="xs">
                      <IconBrandInstagram size={16} color="#E4405F" />
                      <Text size="sm">@{selectedUser.instagram}</Text>
                    </Group>
                  )}
                  {selectedUser.snapchat && (
                    <Group gap="xs">
                      <IconBrandSnapchat size={16} color="#FFFC00" />
                      <Text size="sm">@{selectedUser.snapchat}</Text>
                    </Group>
                  )}
                  {selectedUser.twitter && (
                    <Group gap="xs">
                      <IconBrandTwitter size={16} color="#1DA1F2" />
                      <Text size="sm">@{selectedUser.twitter}</Text>
                    </Group>
                  )}
                </Group>
              </>
            )}

            <Divider />

            {/* Action Buttons */}
            <Group justify="flex-end">
              {!selectedUser.isApproved && (
                <Button 
                  color="green" 
                  variant="outline"
                  loading={updateMutation.isPending}
                  onClick={() => {
                    handleUpdateUserStatus(selectedUser._id!, { isApproved: true });
                    close();
                  }}
                >
                  Approve User
                </Button>
              )}
              {selectedUser.isApproved && (
                <Button 
                  color="red" 
                  variant="outline"
                  loading={updateMutation.isPending}
                  onClick={() => {
                    handleUpdateUserStatus(selectedUser._id!, { isApproved: false });
                    close();
                  }}
                >
                  Revoke Approval
                </Button>
              )}
              {!selectedUser.isPremium && (
                <Button 
                  color="gold" 
                  variant="outline"
                  loading={updateMutation.isPending}
                  onClick={() => {
                    handleUpdateUserStatus(selectedUser._id!, { isPremium: true });
                    close();
                  }}
                >
                  Grant Premium
                </Button>
              )}
              <Button onClick={close}>Close</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <TestimonialModal
        opened={testimonialOpened}
        onClose={closeTestimonial}
        user={testimonialUser}
      />
    </Stack>
  );
};

export default UserManagement; 