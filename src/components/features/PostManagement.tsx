import { useState, useEffect, useMemo } from 'react';
import {
  Title,
  Card,
  Button,
  Group,
  Stack,
  Modal,
  Switch,
  NumberInput,
  Grid,
  Pagination,
  Text,
  Center,
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
import { useGetAllPosts, useGetInstagramWindow, useUpdateInstagramWindow } from '../../hooks/usePosts';
import { Post } from '../../services/postService';

const ITEMS_PER_PAGE = 10;

const PostManagement = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: postsData, isLoading: isPostsLoading } = useGetAllPosts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery,
  });

  const { data: instagramWindowData, isLoading: isInstagramWindowLoading } = useGetInstagramWindow();

  const { posts, totalPages } = useMemo(() => {
    if (!postsData) return { posts: [], totalPages: 0 };

    return {
      posts: postsData.data.posts,
      totalPages: Math.ceil(postsData.data.totalDocs / ITEMS_PER_PAGE),
    };
  }, [postsData]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Prefill form data when Instagram window data loads
  useEffect(() => {
    if (instagramWindowData?.data) {
      const config = instagramWindowData.data;
      setStartTime(config.instagramPostWindowStart);
      setEndTime(config.instagramPostWindowEnd);
      setPostInterval(config.instagramPostFrequencyInMinutes);
    }
  }, [instagramWindowData]);

  // Global posting settings
  const [autoPostingEnabled, setAutoPostingEnabled] = useState(true);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(18);
  const [postInterval, setPostInterval] = useState(30); // minutes

  const updateInstagramWindowMutation = useUpdateInstagramWindow();

  const handleSaveSettings = async () => {
    try {
      await updateInstagramWindowMutation.mutateAsync({
        start: startTime,
        end: endTime,
        frequencyInMinutes: postInterval,
      });
      closeSettings();
    } catch (error) {
      // Error is handled by the mutation
      console.error('Save settings failed:', error);
    }
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    open();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Post Management</Title>
        <Button
          leftSection={<IconSettings size={16} />}
          variant="outline"
          onClick={openSettings}
        >
          Posting Schedule
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

          {loading || isPostsLoading ? (
            <PostTableSkeleton />
          ) : (
            <>
              <PostTable
                posts={posts}
                onViewPost={handleViewPost}
              />
              
              {posts.length > 0 ? (
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    Showing {Math.min(ITEMS_PER_PAGE * (currentPage - 1) + 1, postsData?.data.totalDocs || 0)} - {Math.min(ITEMS_PER_PAGE * currentPage, postsData?.data.totalDocs || 0)} of {postsData?.data.totalDocs || 0} posts
                  </Text>
                  <Pagination 
                    value={currentPage}
                    onChange={handlePageChange}
                    total={totalPages}
                    radius="md"
                  />
                </Group>
              ) : (
                <Center>
                  <Text c="dimmed">No posts found</Text>
                </Center>
              )}
            </>
          )}
        </Stack>
      </Card>

      {/* Post Details Modal */}
      <PostModal
        opened={opened}
        onClose={close}
        post={selectedPost || null}
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
            disabled={isInstagramWindowLoading}
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
                disabled={isInstagramWindowLoading}
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
                disabled={isInstagramWindowLoading}
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
            disabled={isInstagramWindowLoading}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={closeSettings}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveSettings}
              loading={updateInstagramWindowMutation.isPending || isInstagramWindowLoading}
              disabled={isInstagramWindowLoading}
            >
              Save Settings
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default PostManagement; 