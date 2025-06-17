import { useState, useEffect } from 'react';
import {
  Title,
  Card,
  Button,
  Group,
  Stack,
  Modal,
  Switch,
  NumberInput,
  Textarea,
  Grid,
} from '@mantine/core';
import {
  IconSettings,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import {
  PostTable,
  PostFilters,
  PostModal,
  PostTableSkeleton,
} from './post-management';

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

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Post Management</Title>
        <Button
          leftSection={<IconSettings size={16} />}
          variant="outline"
          onClick={openSettings}
        >
          Settings
        </Button>
      </Group>

      <Card padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <PostFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          {loading ? (
            <PostTableSkeleton />
          ) : (
            <PostTable
              posts={filteredPosts}
              onViewPost={handleViewPost}
              onDeletePost={handleDeletePost}
              onUpdatePostStatus={handleUpdatePostStatus}
            />
          )}
        </Stack>
      </Card>

      {/* Post Details Modal */}
      <PostModal
        opened={opened}
        onClose={close}
        post={selectedPost}
      />

      {/* Settings Modal */}
      <Modal
        opened={settingsOpened}
        onClose={closeSettings}
        title="Post Management Settings"
        size="md"
      >
        <Stack gap="md">
          <Switch
            label="Enable Auto Posting"
            description="Automatically post scheduled content"
            checked={autoPostingEnabled}
            onChange={(event) => setAutoPostingEnabled(event.currentTarget.checked)}
          />

          <Grid>
            <Grid.Col span={6}>
              <NumberInput
                label="Start Time (24h)"
                description="Hour to start posting"
                value={startTime}
                onChange={(value) => setStartTime(Number(value))}
                min={0}
                max={23}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="End Time (24h)"
                description="Hour to stop posting"
                value={endTime}
                onChange={(value) => setEndTime(Number(value))}
                min={0}
                max={23}
              />
            </Grid.Col>
          </Grid>

          <NumberInput
            label="Post Interval (minutes)"
            description="Time between posts"
            value={postInterval}
            onChange={(value) => setPostInterval(Number(value))}
            min={5}
            max={1440}
          />

          <Textarea
            label="Default Hashtags"
            description="Default hashtags to add to posts"
            placeholder="#university #college #student"
            rows={3}
          />

          <Group justify="flex-end" mt="md">
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