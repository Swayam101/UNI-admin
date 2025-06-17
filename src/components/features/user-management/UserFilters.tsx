import { Group, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const UserFilters = ({
  searchQuery,
  onSearchChange,
}: UserFiltersProps) => {
  return (
    <Group justify="space-between" mb="md">
      <TextInput
        placeholder="Search users..."
        leftSection={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(event) => onSearchChange(event.currentTarget.value)}
        style={{ flex: 1, maxWidth: 400 }}
      />
    </Group>
  );
};

export default UserFilters; 