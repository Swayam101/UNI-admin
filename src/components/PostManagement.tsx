import { useState, useEffect } from 'react';
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
  Select,
  Modal,
  Switch,
  NumberInput,
  Textarea,
  Grid,
  Skeleton,
} from '@mantine/core';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconTrash,
  IconEye,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Post {
  id: string;
  content: string;
  author: string;
  college: string;
  status: 'scheduled' | 'published' | 'draft' | 'queued';
  scheduledTime: string;
  publishedTime: string | null;
  instagramStatus: 'pending' | 'published' | 'failed';
  engagement: { likes: number; comments: number };
}

const PostManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Global posting settings
  const [autoPostingEnabled, setAutoPostingEnabled] = useState(true);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(18);
  const [postInterval, setPostInterval] = useState(30); // minutes

  // Skeleton Components
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Content</Table.Th>
          <Table.Th>College</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Instagram</Table.Th>
          <Table.Th>Scheduled</Table.Th>
          <Table.Th>Engagement</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 4 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <div>
                <Skeleton height={16} width="90%" mb={4} />
                <Skeleton height={12} width="60%" />
              </div>
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={120} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={70} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={80} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={140} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={60} />
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Skeleton height={28} width={28} circle />
                <Skeleton height={28} width={28} circle />
                <Skeleton height={28} width={28} circle />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Amazing campus life at Harvard! 📚✨ #HarvardLife #StudentLife',
      author: 'John Smith',
      college: 'Harvard University',
      status: 'published',
      scheduledTime: '2024-03-20T10:00:00',
      publishedTime: '2024-03-20T10:00:00',
      instagramStatus: 'published',
      engagement: { likes: 245, comments: 18 },
    },
    {
      id: '2',
      content: 'Study session at the library before finals 💪 #StanfordStudy #Finals',
      author: 'Sarah Johnson',
      college: 'Stanford University',
      status: 'scheduled',
      scheduledTime: '2024-03-21T14:30:00',
      publishedTime: null,
      instagramStatus: 'pending',
      engagement: { likes: 0, comments: 0 },
    },
    {
      id: '3',
      content: 'MIT hackathon this weekend! Who\'s joining? 🚀 #MITHackathon #Tech',
      author: 'Mike Chen',
      college: 'MIT',
      status: 'queued',
      scheduledTime: '2024-03-22T16:00:00',
      publishedTime: null,
      instagramStatus: 'pending',
      engagement: { likes: 0, comments: 0 },
    },
    {
      id: '4',
      content: 'Beautiful autumn at Yale campus 🍂 #YaleLife #Autumn',
      author: 'Emily Davis',
      college: 'Yale University',
      status: 'draft',
      scheduledTime: '',
      publishedTime: null,
      instagramStatus: 'pending',
      engagement: { likes: 0, comments: 0 },
    },
  ]);

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    open();
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleUpdatePostStatus = (id: string, newStatus: 'scheduled' | 'published' | 'draft' | 'queued') => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'green';
      case 'scheduled': return 'blue';
      case 'queued': return 'orange';
      case 'draft': return 'gray';
      default: return 'gray';
    }
  };

  const getInstagramStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'green';
      case 'pending': return 'yellow';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const rows = filteredPosts.map((post) => (
    <Table.Tr key={post.id}>
      <Table.Td>
        <div>
          <Text fw={500} lineClamp={2}>{post.content}</Text>
          <Text size="sm" c="dimmed">by {post.author}</Text>
        </div>
      </Table.Td>
      <Table.Td>{post.college}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(post.status)} variant="light">
          {post.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={getInstagramStatusColor(post.instagramStatus)} variant="outline">
          {post.instagramStatus}
        </Badge>
      </Table.Td>
      <Table.Td>
        {post.scheduledTime ? new Date(post.scheduledTime).toLocaleString() : 'Not set'}
      </Table.Td>
      <Table.Td>
        {post.status === 'published' ? `${post.engagement.likes} likes` : '-'}
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleViewPost(post)}>
            <IconEye size={16} />
          </ActionIcon>
          {post.status === 'scheduled' && (
            <ActionIcon 
              variant="subtle" 
              color="orange" 
              onClick={() => handleUpdatePostStatus(post.id, 'queued')}
            >
              <IconPlayerPause size={16} />
            </ActionIcon>
          )}
          {post.status === 'queued' && (
            <ActionIcon 
              variant="subtle" 
              color="green" 
              onClick={() => handleUpdatePostStatus(post.id, 'scheduled')}
            >
              <IconPlayerPlay size={16} />
            </ActionIcon>
          )}
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeletePost(post.id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {loading ? (
          <>
            <Skeleton height={32} width={200} />
            <Skeleton height={36} width={140} />
          </>
        ) : (
          <>
            <Title order={1}>Post Management</Title>
            <Button leftSection={<IconSettings size={16} />} onClick={openSettings}>
              Queue Settings
            </Button>
          </>
        )}
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            {loading ? (
              <>
                <Skeleton height={12} width="60%" mb="xs" />
                <Skeleton height={28} width="40%" />
              </>
            ) : (
              <>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Total Posts</Text>
                <Text fw={700} size="xl">{posts.length}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            {loading ? (
              <>
                <Skeleton height={12} width="60%" mb="xs" />
                <Skeleton height={28} width="40%" />
              </>
            ) : (
              <>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Scheduled</Text>
                <Text fw={700} size="xl">{posts.filter(p => p.status === 'scheduled').length}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            {loading ? (
              <>
                <Skeleton height={12} width="60%" mb="xs" />
                <Skeleton height={28} width="40%" />
              </>
            ) : (
              <>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>In Queue</Text>
                <Text fw={700} size="xl">{posts.filter(p => p.status === 'queued').length}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            {loading ? (
              <>
                <Skeleton height={12} width="60%" mb="xs" />
                <Skeleton height={28} width="40%" />
              </>
            ) : (
              <>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Published</Text>
                <Text fw={700} size="xl">{posts.filter(p => p.status === 'published').length}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          {loading ? (
            <>
              <Skeleton height={16} width={120} />
              <Group>
                <Skeleton height={36} width={150} />
                <Skeleton height={36} width={300} />
              </Group>
            </>
          ) : (
            <>
              <Text fw={500}>Posts Queue</Text>
              <Group>
                <Select
                  placeholder="Filter by status"
                  data={[
                    { value: 'all', label: 'All Posts' },
                    { value: 'scheduled', label: 'Scheduled' },
                    { value: 'queued', label: 'Queued' },
                    { value: 'published', label: 'Published' },
                    { value: 'draft', label: 'Draft' },
                  ]}
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value || 'all')}
                  style={{ width: 150 }}
                />
                <TextInput
                  placeholder="Search posts..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                  style={{ width: 300 }}
                />
              </Group>
            </>
          )}
        </Group>

        <Table.ScrollContainer minWidth={1000}>
          {loading ? <TableSkeleton /> : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Content</Table.Th>
                  <Table.Th>College</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Instagram</Table.Th>
                  <Table.Th>Scheduled Time</Table.Th>
                  <Table.Th>Engagement</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Table.ScrollContainer>
      </Card>

      {/* Post Details Modal */}
      <Modal opened={opened} onClose={close} title="Post Details" size="md">
        {selectedPost && (
          <Stack gap="md">
            <div>
              <Text fw={500} mb="xs">Content</Text>
              <Textarea value={selectedPost.content} readOnly minRows={3} />
            </div>

            <Group grow>
              <div>
                <Text size="sm" c="dimmed">Author</Text>
                <Text fw={500}>{selectedPost.author}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">College</Text>
                <Text fw={500}>{selectedPost.college}</Text>
              </div>
            </Group>

            <Group grow>
              <div>
                <Text size="sm" c="dimmed">Status</Text>
                <Badge color={getStatusColor(selectedPost.status)} variant="light">
                  {selectedPost.status}
                </Badge>
              </div>
              <div>
                <Text size="sm" c="dimmed">Instagram Status</Text>
                <Badge color={getInstagramStatusColor(selectedPost.instagramStatus)} variant="outline">
                  {selectedPost.instagramStatus}
                </Badge>
              </div>
            </Group>

            {selectedPost.status === 'published' && (
              <Group grow>
                <div>
                  <Text size="sm" c="dimmed">Likes</Text>
                  <Text fw={500}>{selectedPost.engagement.likes}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Comments</Text>
                  <Text fw={500}>{selectedPost.engagement.comments}</Text>
                </div>
              </Group>
            )}

            <Group justify="flex-end">
              <Button onClick={close}>Close</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Queue Settings Modal */}
      <Modal opened={settingsOpened} onClose={closeSettings} title="Queue Settings" size="md">
        <Stack gap="md">
          <Switch
            label="Enable Auto-posting"
            description="Automatically post content during set hours"
            checked={autoPostingEnabled}
            onChange={(event) => setAutoPostingEnabled(event.currentTarget.checked)}
          />

          <Group grow>
            <NumberInput
              label="Start Time (24h)"
              description="Start posting from this hour"
              value={startTime}
              onChange={(value) => setStartTime(Number(value))}
              min={0}
              max={23}
            />
            <NumberInput
              label="End Time (24h)"
              description="Stop posting at this hour"
              value={endTime}
              onChange={(value) => setEndTime(Number(value))}
              min={0}
              max={23}
            />
          </Group>

          <NumberInput
            label="Post Interval (minutes)"
            description="Time between posts"
            value={postInterval}
            onChange={(value) => setPostInterval(Number(value))}
            min={5}
            max={480}
          />

          <Group justify="flex-end">
            <Button variant="outline" onClick={closeSettings}>
              Cancel
            </Button>
            <Button onClick={closeSettings}>
              Save Settings
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default PostManagement; 