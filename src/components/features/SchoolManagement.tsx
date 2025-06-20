import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Title,
  Card,
  Button,
  Group,
  Stack,
  TextInput,
  Text,
  Skeleton,
  Alert,
  Pagination,
  Select,
} from '@mantine/core';
import {
  IconPlus,
  IconSearch,
  IconAlertCircle,
} from '@tabler/icons-react';
import { useColleges } from '../../hooks/useCollege';
import { useDebouncedValue } from '@mantine/hooks';
import { CollegeTable } from './school-management/CollegeTable';

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

  // Extract data from API response
  const colleges = collegeData?.colleges || [];
  const totalColleges = collegeData?.totalDocs || 0;
  const totalPages = collegeData?.pages || 1;

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Memoized event handlers
  const handleAddCollege = useCallback(() => {
    navigate('/schools/add');
  }, [navigate]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value: string | null) => {
    if (value) {
      setPageSize(parseInt(value));
      setCurrentPage(1);
    }
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  }, []);

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={1}>College Management</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddCollege}>
          Add College
        </Button>
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
                  onChange={handleSearchChange}
                  style={{ width: 300 }}
                />
              </Group>
            </>
          )}
        </Group>

        {/* Separate Table Component - only this will re-render during search */}
        <CollegeTable
          colleges={colleges}
          isLoading={isLoading}
          searchQuery={searchQuery}
          pageSize={pageSize}
        />

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