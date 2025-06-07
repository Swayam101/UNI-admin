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
} from '@mantine/core';
import {
  IconTrash,
  IconEye,
  IconSearch,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  status: 'active' | 'banned' | 'pending';
  profileBio: string;
  signupDate: string;
  lastPostDate: string;
  postsCount: number;
  isPaid: boolean;
}

const UserManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@harvard.edu',
      school: 'Harvard University',
      status: 'active',
      profileBio: 'Computer Science student passionate about AI and machine learning.',
      signupDate: '2024-01-15',
      lastPostDate: '2024-03-20',
      postsCount: 12,
      isPaid: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@stanford.edu',
      school: 'Stanford University',
      status: 'active',
      profileBio: 'Studying bioengineering and love sharing campus life moments.',
      signupDate: '2024-02-01',
      lastPostDate: '2024-03-18',
      postsCount: 8,
      isPaid: false,
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@mit.edu',
      school: 'MIT',
      status: 'pending',
      profileBio: 'Physics major exploring quantum computing research.',
      signupDate: '2024-03-10',
      lastPostDate: 'Never',
      postsCount: 0,
      isPaid: false,
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@yale.edu',
      school: 'Yale University',
      status: 'banned',
      profileBio: 'Art history student and photography enthusiast.',
      signupDate: '2024-01-20',
      lastPostDate: '2024-02-15',
      postsCount: 15,
      isPaid: true,
    },
  ]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    open();
  };

  const handleRemoveUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleUpdateUserStatus = (id: string, newStatus: 'active' | 'banned') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.school.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'banned': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius="xl" color="blue">
            {user.name.charAt(0)}
          </Avatar>
          <div>
            <Text fw={500}>{user.name}</Text>
            <Text size="sm" c="dimmed">{user.email}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>{user.school}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(user.status)} variant="light">
          {user.status}
        </Badge>
      </Table.Td>
      <Table.Td>{user.signupDate}</Table.Td>
      <Table.Td>{user.lastPostDate}</Table.Td>
      <Table.Td>{user.postsCount}</Table.Td>
      <Table.Td>
        <Badge color={user.isPaid ? 'green' : 'gray'} variant="outline">
          {user.isPaid ? 'Paid' : 'Free'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleViewUser(user)}>
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => handleRemoveUser(user.id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Title order={1}>User Management</Title>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={500}>Users ({users.length})</Text>
          <Group>
            <Select
              placeholder="Filter by status"
              data={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'pending', label: 'Pending' },
                { value: 'banned', label: 'Banned' },
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
        </Group>

        <Table.ScrollContainer minWidth={900}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>School</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Signup Date</Table.Th>
                <Table.Th>Last Post</Table.Th>
                <Table.Th>Posts</Table.Th>
                <Table.Th>Payment</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      <Modal opened={opened} onClose={close} title="User Profile Details" size="md">
        {selectedUser && (
          <Stack gap="md">
            <Group>
              <Avatar size={60} radius="xl" color="blue">
                {selectedUser.name.charAt(0)}
              </Avatar>
              <div>
                <Text fw={500} size="lg">{selectedUser.name}</Text>
                <Text c="dimmed">{selectedUser.email}</Text>
                <Badge color={getStatusColor(selectedUser.status)} variant="light" mt="xs">
                  {selectedUser.status}
                </Badge>
              </div>
            </Group>

            <div>
              <Text fw={500} mb="xs">Profile Bio</Text>
              <Textarea
                value={selectedUser.profileBio}
                readOnly
                minRows={3}
              />
            </div>

            <Group grow>
              <div>
                <Text size="sm" c="dimmed">School</Text>
                <Text fw={500}>{selectedUser.school}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Posts Count</Text>
                <Text fw={500}>{selectedUser.postsCount}</Text>
              </div>
            </Group>

            <Group grow>
              <div>
                <Text size="sm" c="dimmed">Signup Date</Text>
                <Text fw={500}>{selectedUser.signupDate}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Last Post</Text>
                <Text fw={500}>{selectedUser.lastPostDate}</Text>
              </div>
            </Group>

            <Group justify="flex-end">
              {selectedUser.status === 'active' && (
                <Button 
                  color="red" 
                  variant="outline"
                  onClick={() => {
                    handleUpdateUserStatus(selectedUser.id, 'banned');
                    close();
                  }}
                >
                  Ban User
                </Button>
              )}
              {selectedUser.status === 'banned' && (
                <Button 
                  color="green" 
                  variant="outline"
                  onClick={() => {
                    handleUpdateUserStatus(selectedUser.id, 'active');
                    close();
                  }}
                >
                  Unban User
                </Button>
              )}
              <Button onClick={close}>Close</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
};

export default UserManagement; 