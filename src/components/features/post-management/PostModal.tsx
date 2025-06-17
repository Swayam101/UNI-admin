import { Modal, Stack, Text, Badge, Group } from '@mantine/core';

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

interface PostModalProps {
  opened: boolean;
  onClose: () => void;
  post: Post | null;
}

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

export const PostModal = ({ opened, onClose, post }: PostModalProps) => {
  if (!post) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Post Details"
      size="lg"
    >
      <Stack gap="md">
        <div>
          <Text size="sm" c="dimmed" mb={4}>Content</Text>
          <Text>{post.content}</Text>
        </div>

        <Group>
          <div>
            <Text size="sm" c="dimmed" mb={4}>Author</Text>
            <Text fw={500}>{post.author}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed" mb={4}>College</Text>
            <Text fw={500}>{post.college}</Text>
          </div>
        </Group>

        <Group>
          <div>
            <Text size="sm" c="dimmed" mb={4}>Status</Text>
            <Badge color={getStatusColor(post.status)} variant="light">
              {post.status}
            </Badge>
          </div>
          <div>
            <Text size="sm" c="dimmed" mb={4}>Instagram Status</Text>
            <Badge color={getInstagramStatusColor(post.instagramStatus)} variant="light">
              {post.instagramStatus}
            </Badge>
          </div>
        </Group>

        <Group>
          <div>
            <Text size="sm" c="dimmed" mb={4}>Scheduled Time</Text>
            <Text>{post.scheduledTime ? new Date(post.scheduledTime).toLocaleString() : 'Not scheduled'}</Text>
          </div>
          {post.publishedTime && (
            <div>
              <Text size="sm" c="dimmed" mb={4}>Published Time</Text>
              <Text>{new Date(post.publishedTime).toLocaleString()}</Text>
            </div>
          )}
        </Group>

        <div>
          <Text size="sm" c="dimmed" mb={4}>Engagement</Text>
          <Group gap="lg">
            <Text size="sm">
              <Text component="span" fw={500}>{post.engagement.likes}</Text> likes
            </Text>
            <Text size="sm">
              <Text component="span" fw={500}>{post.engagement.comments}</Text> comments
            </Text>
          </Group>
        </div>
      </Stack>
    </Modal>
  );
}; 