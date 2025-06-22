import { Group, TextInput, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface ContactFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  addressed: boolean | undefined;
  onAddressedChange: (value: boolean | undefined) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

const ContactFilters = ({
  search,
  onSearchChange,
  addressed,
  onAddressedChange,
  category,
  onCategoryChange,
}: ContactFiltersProps) => {
  return (
    <Group gap="md">
      <TextInput
        placeholder="Search by name, email or subject..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        style={{ flex: 1 }}
      />
      <Select
        value={addressed === undefined ? '' : addressed ? 'true' : 'false'}
        onChange={(value) => {
          if (value === '') onAddressedChange(undefined);
          else onAddressedChange(value === 'true');
        }}
        placeholder="Filter by status"
        data={[
          { value: '', label: 'All' },
          { value: 'true', label: 'Addressed' },
          { value: 'false', label: 'Pending' },
        ]}
        style={{ width: 150 }}
      />
      <Select
        value={category}
        onChange={(value) => onCategoryChange(value || '')}
        placeholder="Filter by category"
        data={[
          { value: '', label: 'All Categories' },
          { value: 'general', label: 'General' },
          { value: 'technical', label: 'Technical' },
          { value: 'billing', label: 'Billing' },
          { value: 'feedback', label: 'Feedback' },
          { value: 'other', label: 'Other' },
        ]}
        style={{ width: 180 }}
      />
    </Group>
  );
};

export default ContactFilters; 