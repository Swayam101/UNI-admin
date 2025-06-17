import { Group, TextInput, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface PaymentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
}

export const PaymentFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
}: PaymentFiltersProps) => {
  return (
    <Group gap="md">
      <TextInput
        placeholder="Search payments..."
        leftSection={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        style={{ flex: 1 }}
      />
      
      <Select
        placeholder="Filter by status"
        value={statusFilter}
        onChange={(value) => onStatusFilterChange(value || 'all')}
        data={[
          { value: 'all', label: 'All Status' },
          { value: 'completed', label: 'Completed' },
          { value: 'pending', label: 'Pending' },
          { value: 'failed', label: 'Failed' },
        ]}
        clearable
        style={{ minWidth: 150 }}
      />
      
      <Select
        placeholder="Filter by type"
        value={typeFilter}
        onChange={(value) => onTypeFilterChange(value || 'all')}
        data={[
          { value: 'all', label: 'All Types' },
          { value: 'premium_subscription', label: 'Premium' },
          { value: 'boost_visibility', label: 'Boost' },
          { value: 'super_like', label: 'Super Like' },
        ]}
        clearable
        style={{ minWidth: 150 }}
      />
    </Group>
  );
}; 