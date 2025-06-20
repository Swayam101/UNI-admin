import {
  Table,
  Badge,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import {
  IconEye,
} from '@tabler/icons-react';
import { Post } from '../../../services/postService';



interface PostTableProps {
  posts: Post[];
  onViewPost: (post: Post) => void;
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

export const PostTable = ({ posts, onViewPost}: PostTableProps) => {
  return (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Content</Table.Th>
          <Table.Th>College</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Instagram</Table.Th>
          {/* <Table.Th>Scheduled</Table.Th> */}
          {/* <Table.Th>Engagement</Table.Th> */}
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {posts.map((post) => (
          <Table.Tr key={post._id}>
            <Table.Td>
              <div>
                <Text size="sm" fw={500} lineClamp={2}>
                  {post.content}
                </Text>
                <Text size="xs" c="dimmed">
                  by {post.author.firstName} {post.author.lastName}
                </Text>
              </div>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{post.college.name}</Text>
            </Table.Td>
            <Table.Td>
              <Badge color={getStatusColor(post.isPublished ? 'published' : 'draft')} variant="light">
                {post.isPublished ? 'Published' : 'Draft'}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge color={getInstagramStatusColor(post.isPostedToInstagram ? 'published' : 'draft')} variant="light">
                {post.isPostedToInstagram ? 'Posted' : 'Not Posted'}
              </Badge>
            </Table.Td>
            {/* <Table.Td>
              <Text size="sm">
                {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : '-'}
              </Text>
            </Table.Td> */}
            {/* <Table.Td>
              <Text size="sm">
                {post.likesCount} likes, {post.commentsCount} comments
              </Text>
            </Table.Td> */}
            <Table.Td>
              <Group gap="xs">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => onViewPost(post)}
                >
                  <IconEye size={16} />
                </ActionIcon>
                
                {/* {post.status === 'scheduled' ? (
                  <ActionIcon
                    variant="subtle"
                    color="orange"
                    onClick={() => onUpdatePostStatus(post._id, 'draft')}
                  >
                    <IconPlayerPause size={16} />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    variant="subtle"
                    color="green"
                    onClick={() => onUpdatePostStatus(post._id, 'scheduled')}
                  >
                    <IconPlayerPlay size={16} />
                  </ActionIcon>
                )} */}
                
                {/* <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => onDeletePost(post.id)}
                >
                  <IconTrash size={16} />
                </ActionIcon> */}
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 