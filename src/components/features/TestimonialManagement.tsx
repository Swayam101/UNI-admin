import { useState } from 'react';
import {
  Title,
  Card,
  Table,
  Button,
  Group,
  Stack,
  TextInput,
  ActionIcon,
  Text,
  Avatar,
  Modal,
  Skeleton,
  Alert,
  Paper,
  SimpleGrid,
  Divider,
} from '@mantine/core';
import {
  IconEye,
  IconSearch,
  IconAlertCircle,
  IconMessageDots,
  IconCalendar,
  IconUser,
  IconTrash,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useTestimonials, useDeleteTestimonial } from '../../hooks/useTestimonial';
import type { Testimonial } from '../../types/testimonial';

const TestimonialManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // API hooks
  const { data: testimonialData, isLoading, error, refetch } = useTestimonials();
  const deleteTestimonialMutation = useDeleteTestimonial();

  // Extract testimonials array from structured response
  const testimonials = testimonialData?.testimonials || [];
  const totalTestimonials = testimonialData?.total || testimonials.length;

  // Calculate stats
  const activeTestimonials = testimonials.filter(t => t.isActive !== false).length;

  // Skeleton Components
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Message Preview</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 5 }).map((_, index) => (
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
              <Skeleton height={16} width={200} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={16} width={100} />
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

  const handleViewTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    open();
  };

  const handleDeleteTestimonial = (testimonial: Testimonial) => {
    const user = testimonial.user;
    const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User' : 'Unknown User';
    
    modals.openConfirmModal({
      title: 'Delete Testimonial',
      children: (
        <Text size="sm">
          Are you sure you want to delete the testimonial by <strong>{userName}</strong>? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          if (testimonial._id) {
            await deleteTestimonialMutation.mutateAsync(testimonial._id);
            notifications.show({
              title: 'Success',
              message: 'Testimonial deleted successfully',
              color: 'green',
            });
          }
        } catch {
          notifications.show({
            title: 'Error',
            message: 'Failed to delete testimonial. Please try again.',
            color: 'red',
          });
        }
      },
    });
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const user = testimonial.user;
    const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '';
    const userEmail = user?.email || '';
    
    const matchesSearch = testimonial.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateMessage = (message: string, maxLength: number = 80) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  const rows = filteredTestimonials.map((testimonial) => {
    const user = testimonial.user;
    const userName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User' : 'Unknown User';
    const userEmail = user?.email || 'No email';

    return (
      <Table.Tr key={testimonial._id}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} radius="xl" src={user?.profilePicture} color="blue">
              {user?.firstName && user?.lastName && getInitials(user.firstName, user.lastName)}
            </Avatar>
            <div>
              <Text fw={500}>{userName}</Text>
              <Text size="sm" c="dimmed">{userEmail}</Text>
              {user?.studying && (
                <Text size="xs" c="dimmed">{user.studying}</Text>
              )}
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text size="sm" style={{ maxWidth: 200 }}>
            {truncateMessage(testimonial.message)}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{formatDate(testimonial.createdAt)}</Text>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            <ActionIcon variant="subtle" color="blue" onClick={() => handleViewTestimonial(testimonial)}>
              <IconEye size={16} />
            </ActionIcon>
            <ActionIcon 
              variant="subtle" 
              color="red" 
              onClick={() => handleDeleteTestimonial(testimonial)}
              loading={deleteTestimonialMutation.isPending}
              disabled={deleteTestimonialMutation.isPending}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {isLoading ? (
          <Skeleton height={32} width={200} />
        ) : (
          <Title order={1}>Testimonial Management </Title>
        )}
      </Group>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red">
          Error loading testimonials: {error.message}
          <Button variant="outline" size="xs" ml="md" onClick={() => refetch()}>
            Retry
          </Button>
        </Alert>
      )}

      {/* Stats Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Total Testimonials
              </Text>
              <Text size="xl" fw={700}>
                {totalTestimonials}
              </Text>
            </div>
            <IconMessageDots size={24} color="var(--mantine-color-blue-6)" />
          </Group>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Active Testimonials
              </Text>
              <Text size="xl" fw={700} c="green">
                {activeTestimonials}
              </Text>
            </div>
            <IconUser size={24} color="var(--mantine-color-green-6)" />
          </Group>
        </Paper>

        
      </SimpleGrid>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          {isLoading ? (
            <>
              <Skeleton height={16} width={120} />
              <Group>
                <Skeleton height={36} width={120} />
                <Skeleton height={36} width={300} />
              </Group>
            </>
          ) : (
            <>
              <Text fw={500}>Testimonials ({filteredTestimonials.length})</Text>
              <Group>
                <TextInput
                  placeholder="Search testimonials..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                  style={{ width: 300 }}
                />
              </Group>
            </>
          )}
        </Group>

        <Table.ScrollContainer minWidth={800}>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Message Preview</Table.Th>
                  <Table.Th>Created</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={5}>
                      <Text ta="center" py="xl" c="dimmed">
                        {searchQuery ? 'No testimonials found matching your search.' : 'No testimonials found.'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </Table.ScrollContainer>
      </Card>

      {/* Testimonial Detail Modal */}
      <Modal opened={opened} onClose={close} title="Testimonial Details" size="lg">
        {selectedTestimonial && (
          <Stack gap="lg">
            {/* User Info Header */}
            <Paper p="md" bg="gray.0" radius="md">
              <Group>
                <Avatar 
                  size={60} 
                  radius="xl" 
                  src={selectedTestimonial.user?.profilePicture} 
                  color="blue"
                >
                  {selectedTestimonial.user?.firstName && selectedTestimonial.user?.lastName && 
                    getInitials(
                      selectedTestimonial.user.firstName, 
                      selectedTestimonial.user.lastName
                    )
                  }
                </Avatar>
                <div style={{ flex: 1 }}>
                  <Text fw={600} size="lg">
                    {selectedTestimonial.user 
                      ? `${selectedTestimonial.user.firstName || ''} ${selectedTestimonial.user.lastName || ''}`.trim() || 'Unknown User'
                      : 'Unknown User'
                    }
                  </Text>
                  <Text c="dimmed" size="sm">
                    {selectedTestimonial.user?.email || 'No email available'}
                  </Text>
                  {selectedTestimonial.user?.studying && (
                    <Text c="dimmed" size="xs">
                      {selectedTestimonial.user.studying} • {selectedTestimonial.user.collegeGraduationYear || 'N/A'}
                    </Text>
                  )}
                </div>
              </Group>
            </Paper>

            <Divider label="Testimonial Details" labelPosition="left" />

            {/* Message */}
            <div>
              <Text fw={500} mb="xs">Message</Text>
              <Paper p="md" bg="gray.0" radius="md">
                <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {selectedTestimonial.message}
                </Text>
              </Paper>
            </div>

            <Divider label="Metadata" labelPosition="left" />

            {/* Metadata */}
            <SimpleGrid cols={2} spacing="md">
              <div>
                <Text size="sm" c="dimmed" mb={4}>Created Date</Text>
                <Group gap="xs">
                  <IconCalendar size={16} color="var(--mantine-color-dimmed)" />
                  <Text fw={500}>{formatDate(selectedTestimonial.createdAt)}</Text>
                </Group>
              </div>
              <div>
                <Text size="sm" c="dimmed" mb={4}>Created By</Text>
                <Text fw={500}>{selectedTestimonial.createdBy || 'System'}</Text>
              </div>
            </SimpleGrid>

            <Group justify="flex-end">
              <Button onClick={close}>Close</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
};

export default TestimonialManagement; 