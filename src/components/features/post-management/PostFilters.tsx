import { Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface PostFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export const PostFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: PostFiltersProps) => {
  console.log(statusFilter);
  console.log(onStatusFilterChange);
  
  return (
    <Group gap="md">
      <TextInput
        placeholder="Search posts..."
        leftSection={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        style={{ flex: 1 }}
      />
      
      {/* <Select
        placeholder="Filter by status"
        value={statusFilter}
        onChange={(value) => onStatusFilterChange(value || 'all')}
        data={[
          { value: 'all', label: 'All Status' },
          { value: 'published', label: 'Published' },
          { value: 'scheduled', label: 'Scheduled' },
          { value: 'queued', label: 'Queued' },
          { value: 'draft', label: 'Draft' },
        ]}
        clearable
        style={{ minWidth: 150 }}
      /> */}
    </Group>
  );
}; 