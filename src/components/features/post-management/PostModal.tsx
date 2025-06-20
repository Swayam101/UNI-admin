import { Modal, Stack, Text, Badge, Group, Image, SimpleGrid, Button } from '@mantine/core';
import { Post } from '../../../services/postService';
import { useUpdatePost } from '../../../hooks/usePosts';

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
  const updatePostMutation = useUpdatePost();

  if (!post) return null;

  const handleBanToggle = async () => {
    try {
      await updatePostMutation.mutateAsync({
        postId: post._id,
        postData: {
          isArchived: !post.isArchived
        }
      });
      onClose();
    } catch (error) {
      // Error is already handled in the mutation's onError
      console.error('Ban toggle failed:', error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Post Details"
      size="lg"
      centered
    >
      <Stack gap="md">
        <div>
          <Text fw={500} mb="xs">Content</Text>
          <Text>{post.content}</Text>
        </div>

        {post.images && post.images.length > 0 && (
          <div>
            <Text fw={500} mb="xs">
              Images ({post.images.length})
            </Text>
            <SimpleGrid
              cols={{ base: 2, sm: 3 }}
              spacing="sm"
            >
              {post.images.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  radius="sm"
                  fit="cover"
                  h={120}
                />
              ))}
            </SimpleGrid>
          </div>
        )}

        <Group justify="space-between">
          <div>
            <Text fw={500}>Author</Text>
            <Text size="sm">
              {post.author.firstName} {post.author.lastName}
            </Text>
          </div>

          <div>
            <Text fw={500}>College</Text>
            <Text size="sm">{post.college.name}</Text>
          </div>
        </Group>

        <Group justify="space-between">
          <div>
            <Text fw={500} mb="xs">Status</Text>
            <Badge 
              color={getStatusColor(post.isPublished ? 'published' : 'draft')} 
              variant="light"
            >
              {post.isPublished ? 'Published' : 'Draft'}
            </Badge>
          </div>

          <div>
            <Text fw={500} mb="xs">Instagram Status</Text>
            <Badge 
              color={getInstagramStatusColor(post.isPostedToInstagram ? 'published' : 'pending')} 
              variant="light"
            >
              {post.isPostedToInstagram ? 'Posted' : 'Not Posted'}
            </Badge>
          </div>

          <div>
            <Text fw={500} mb="xs">Post Status</Text>
            <Badge 
              color={getStatusColor(post.isArchived ? 'banned' : 'active')} 
              variant="light"
            >
              {post.isArchived ? 'Banned' : 'Active'}
            </Badge>
          </div>
        </Group>

        <div>
          <Text fw={500}>Scheduled Time</Text>
          <Text size="sm">
            {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : 'Not scheduled'}
          </Text>
        </div>

        {post.scheduledAt && (
          <div>
            <Text fw={500}>Published Time</Text>
            <Text size="sm">{new Date(post.scheduledAt).toLocaleString()}</Text>
          </div>
        )}

        {/* Ban/Unban Button */}
        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            color={post.isArchived ? 'green' : 'red'}
            onClick={handleBanToggle}
            loading={updatePostMutation.isPending}
          >
            {post.isArchived ? 'Unban Post' : 'Ban Post'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};