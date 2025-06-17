import {
  Table,
  Badge,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconTrash,
  IconEye,
} from '@tabler/icons-react';

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

interface PostTableProps {
  posts: Post[];
  onViewPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  onUpdatePostStatus: (id: string, newStatus: 'scheduled' | 'published' | 'draft' | 'queued') => void;
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

export const PostTable = ({ posts, onViewPost, onDeletePost, onUpdatePostStatus }: PostTableProps) => {
  return (
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
        {posts.map((post) => (
          <Table.Tr key={post.id}>
            <Table.Td>
              <div>
                <Text size="sm" fw={500} lineClamp={2}>
                  {post.content}
                </Text>
                <Text size="xs" c="dimmed">
                  by {post.author}
                </Text>
              </div>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{post.college}</Text>
            </Table.Td>
            <Table.Td>
              <Badge color={getStatusColor(post.status)} variant="light">
                {post.status}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge color={getInstagramStatusColor(post.instagramStatus)} variant="light">
                {post.instagramStatus}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {post.scheduledTime ? new Date(post.scheduledTime).toLocaleString() : '-'}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {post.engagement.likes} likes, {post.engagement.comments} comments
              </Text>
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => onViewPost(post)}
                >
                  <IconEye size={16} />
                </ActionIcon>
                
                {post.status === 'scheduled' ? (
                  <ActionIcon
                    variant="subtle"
                    color="orange"
                    onClick={() => onUpdatePostStatus(post.id, 'draft')}
                  >
                    <IconPlayerPause size={16} />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    onClick={() => onUpdatePostStatus(post.id, 'scheduled')}
                  >
                    <IconPlayerPlay size={16} />
                  </ActionIcon>
                )}
                
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => onDeletePost(post.id)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 