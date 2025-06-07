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
  Modal,
  Select,
  Switch,
  ActionIcon,
  Text,
  Avatar,
} from '@mantine/core';
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconBrandInstagram,
  IconSearch,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface School {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inactive';
  instagramConnected: boolean;
  instagramHandle: string;
  students: number;
  postsCount: number;
  lastActivity: string;
}

const SchoolManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [schools, setSchools] = useState<School[]>([
    {
      id: '1',
      name: 'Harvard University',
      location: 'Cambridge, MA',
      status: 'active',
      instagramConnected: true,
      instagramHandle: '@harvard',
      students: 245,
      postsCount: 89,
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      name: 'Stanford University',
      location: 'Stanford, CA',
      status: 'active',
      instagramConnected: true,
      instagramHandle: '@stanford',
      students: 198,
      postsCount: 76,
      lastActivity: '4 hours ago',
    },
    {
      id: '3',
      name: 'MIT',
      location: 'Cambridge, MA',
      status: 'active',
      instagramConnected: false,
      instagramHandle: '',
      students: 187,
      postsCount: 64,
      lastActivity: '1 day ago',
    },
    {
      id: '4',
      name: 'Yale University',
      location: 'New Haven, CT',
      status: 'inactive',
      instagramConnected: false,
      instagramHandle: '',
      students: 156,
      postsCount: 52,
      lastActivity: '3 days ago',
    },
  ]);

  const handleAddSchool = () => {
    setEditingSchool({
      id: '',
      name: '',
      location: '',
      status: 'active',
      instagramConnected: false,
      instagramHandle: '',
      students: 0,
      postsCount: 0,
      lastActivity: 'Just added',
    });
    open();
  };

  const handleEditSchool = (school: School) => {
    setEditingSchool(school);
    open();
  };

  const handleDeleteSchool = (id: string) => {
    setSchools(schools.filter(school => school.id !== id));
  };

  const toggleInstagramConnection = (id: string) => {
    setSchools(schools.map(school => 
      school.id === id 
        ? { ...school, instagramConnected: !school.instagramConnected }
        : school
    ));
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredSchools.map((school) => (
    <Table.Tr key={school.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius="xl" color="blue">
            {school.name.charAt(0)}
          </Avatar>
          <div>
            <Text fw={500}>{school.name}</Text>
            <Text size="sm" c="dimmed">{school.location}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={school.status === 'active' ? 'green' : 'gray'} variant="light">
          {school.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Switch
            checked={school.instagramConnected}
            onChange={() => toggleInstagramConnection(school.id)}
            size="sm"
          />
          {school.instagramConnected && (
            <Badge leftSection={<IconBrandInstagram size={12} />} color="pink" variant="light">
              {school.instagramHandle}
            </Badge>
          )}
        </Group>
      </Table.Td>
      <Table.Td>{school.students}</Table.Td>
      <Table.Td>{school.postsCount}</Table.Td>
      <Table.Td>{school.lastActivity}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleEditSchool(school)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteSchool(school.id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>School Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddSchool}>
          Add School
        </Button>
      </Group>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={500}>Schools ({schools.length})</Text>
          <TextInput
            placeholder="Search schools..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
            style={{ width: 300 }}
          />
        </Group>

        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>School</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Instagram</Table.Th>
                <Table.Th>Students</Table.Th>
                <Table.Th>Posts</Table.Th>
                <Table.Th>Last Activity</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      <Modal opened={opened} onClose={close} title={editingSchool?.id ? 'Edit School' : 'Add New School'} size="md">
        <Stack gap="md">
          <TextInput
            label="School Name"
            placeholder="Enter school name"
            value={editingSchool?.name || ''}
            onChange={(event) => setEditingSchool(prev => prev ? {...prev, name: event.currentTarget.value} : null)}
          />
          <TextInput
            label="Location"
            placeholder="Enter location"
            value={editingSchool?.location || ''}
            onChange={(event) => setEditingSchool(prev => prev ? {...prev, location: event.currentTarget.value} : null)}
          />
          <Select
            label="Status"
            data={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            value={editingSchool?.status || 'active'}
            onChange={(value) => setEditingSchool(prev => prev ? {...prev, status: value as 'active' | 'inactive'} : null)}
          />
          <TextInput
            label="Instagram Handle"
            placeholder="@schoolname"
            value={editingSchool?.instagramHandle || ''}
            onChange={(event) => setEditingSchool(prev => prev ? {...prev, instagramHandle: event.currentTarget.value} : null)}
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>
              {editingSchool?.id ? 'Update' : 'Add'} School
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default SchoolManagement; 