import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Skeleton,
  Alert,
  Switch,
  Pagination,
  Select,
} from '@mantine/core';
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconBrandInstagram,
  IconSearch,
  IconAlertCircle,
} from '@tabler/icons-react';
import { useColleges, useDeleteCollege, useUpdateCollege } from '../../hooks/useCollege';
import type { College } from '../../types/college';
import { useDebouncedValue } from '@mantine/hooks';

const SchoolManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Debounce search query to avoid too many API calls
  const [debouncedSearch] = useDebouncedValue(searchQuery, 500);

  // API hooks with parameters
  const { data: collegeData, isLoading, error, refetch } = useColleges({
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: pageSize,
  });
  
  const deleteMutation = useDeleteCollege();
  const updateMutation = useUpdateCollege();

  // Extract data from API response
  const colleges = collegeData?.colleges || [];
  const totalColleges = collegeData?.total || 0;
  const totalPages = collegeData?.pages || 1;

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Skeleton Components
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>College</Table.Th>
          <Table.Th>Location</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Established</Table.Th>
          <Table.Th>Instagram</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: pageSize }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Group gap="sm">
                <Skeleton height={40} width={40} circle />
                <div>
                  <Skeleton height={16} width={140} mb={4} />
                  <Skeleton height={12} width={120} />
                </div>
              </Group>
            </Table.Td>
            <Table.Td>
              <div>
                <Skeleton height={14} width={100} mb={2} />
                <Skeleton height={12} width={80} />
              </div>
            </Table.Td>
            <Table.Td>
              <div>
                <Skeleton height={14} width={150} mb={2} />
                <Skeleton height={12} width={120} />
              </div>
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={60} />
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Skeleton height={16} width={16} circle />
                <Skeleton height={20} width={80} radius="sm" />
              </Group>
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

  const handleAddCollege = () => {
    navigate('/schools/add');
  };

  const handleEditCollege = (college: College) => {
    navigate(`/schools/edit/${college._id}`);
  };

  const handleDeleteCollege = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting college:', error);
      }
    }
  };

  const handleInstagramToggle = async (college: College) => {
    if (!college._id) return;
    
    try {
      await updateMutation.mutateAsync({
        id: college._id,
        data: {
          isInstagramActive: !college.isInstagramActive
        }
      });
    } catch (error) {
      console.error('Error updating Instagram status:', error);
    }
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value: string | null) => {
    if (value) {
      setPageSize(parseInt(value));
      setCurrentPage(1);
    }
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  const getFullLocation = (college: College) => {
    const parts = [college.city, college.state, college.country].filter(Boolean);
    return parts.join(', ');
  };

  const hasInstagramIntegration = (college: College) => {
    return !!(college.instagramBusinessId && college.instagramAccessToken);
  };

  const rows = colleges.map((college) => (
    <Table.Tr key={college._id}>
      <Table.Td>  
        <Group gap="sm">
          <Avatar 
            size={40} 
            radius="xl" 
            src={college.logoUrl}
            color="blue"
          >
            {!college.logoUrl && getInitials(college.name)}
          </Avatar>
          <div>
            <Text fw={500}>{college.name}</Text>
            <Text size="sm" c="dimmed" lineClamp={1}>{college.description}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <div>
          <Text size="sm">{getFullLocation(college)}</Text>
          <Text size="xs" c="dimmed">{college.postalCode}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <div>
          <Text size="sm">{college.email}</Text>
          <Text size="xs" c="dimmed">{college.phoneNumber}</Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{college.establishedYear || 'N/A'}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Switch
            checked={college.isInstagramActive || false}
            onChange={() => handleInstagramToggle(college)}
            disabled={!hasInstagramIntegration(college) || updateMutation.isPending}
            size="sm"
          />
          {hasInstagramIntegration(college) && (
            <Badge 
              leftSection={<IconBrandInstagram size={12} />} 
              color={college.isInstagramActive ? "green" : "gray"} 
              variant="light"
            >
              {college.isInstagramActive ? "Active" : "Inactive"}
            </Badge>
          )}
          {!hasInstagramIntegration(college) && (
            <Badge color="red" variant="light">
              Not Setup
            </Badge>
          )}
        </Group>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleEditCollege(college)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon 
            variant="subtle" 
            color="red" 
            onClick={() => handleDeleteCollege(college._id!)}
            loading={deleteMutation.isPending}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {isLoading ? (
          <>
            <Skeleton height={32} width={220} />
            <Skeleton height={36} width={120} />
          </>
        ) : (
          <>
            <Title order={1}>College Management </Title>
            <Button leftSection={<IconPlus size={16} />} onClick={handleAddCollege}>
              Add College
            </Button>
          </>
        )}
      </Group>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red">
          Error loading colleges: {error.message}
          <Button variant="outline" size="xs" ml="md" onClick={() => refetch()}>
            Retry
          </Button>
        </Alert>
      )}

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          {isLoading ? (
            <>
              <Skeleton height={16} width={120} />
              <Group>
                <Skeleton height={36} width={100} />
                <Skeleton height={36} width={300} />
              </Group>
            </>
          ) : (
            <>
              <Text fw={500}>
                Colleges ({colleges.length} of {totalColleges})
                {debouncedSearch && ` - Search: "${debouncedSearch}"`}
              </Text>
              <Group>
                <Select
                  value={pageSize.toString()}
                  onChange={handlePageSizeChange}
                  data={[
                    { value: '5', label: '5 per page' },
                    { value: '10', label: '10 per page' },
                    { value: '25', label: '25 per page' },
                    { value: '50', label: '50 per page' },
                  ]}
                  w={120}
                />
                <TextInput
                  placeholder="Search colleges..."
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
          {isLoading ? <TableSkeleton /> : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>College</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Contact</Table.Th>
                  <Table.Th>Established</Table.Th>
                  <Table.Th>Instagram</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows && rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={6}>
                      <Text ta="center" py="xl" c="dimmed">
                        {searchQuery ? 'No colleges found matching your search.' : 'No colleges found. Add your first college!'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </Table.ScrollContainer>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <Group justify="center" mt="md">
            <Pagination
              value={currentPage}
              onChange={handlePageChange}
              total={totalPages}
              size="sm"
              withEdges
            />
          </Group>
        )}
      </Card>
    </Stack>
  );
};

export default SchoolManagement; 