import { Group, TextInput, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

type PaymentType = 'all' | 'post' | 'subscription';

interface PaymentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  paymentType: PaymentType;
  onPaymentTypeChange: (value: PaymentType) => void;
}

export const PaymentFilters = ({
  searchQuery,
  onSearchChange,
  paymentType,
  onPaymentTypeChange,
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
        placeholder="Filter by type"
        value={paymentType}
        onChange={(value) => onPaymentTypeChange((value || 'all') as PaymentType)}
        data={[
          { value: 'all', label: 'All Types' },
          { value: 'post', label: 'Post Payment' },
          { value: 'subscription', label: 'Subscription' },
        ]}
        clearable
        style={{ minWidth: 150 }}
      />
    </Group>
  );
};