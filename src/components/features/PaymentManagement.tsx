import { useState } from 'react';
import {
  Title,
  Card,
  Table,
  Group,
  Badge,
  Stack,
  TextInput,
  Text,
  Avatar,
  Select,
  Skeleton,
  SimpleGrid,
  Paper,
} from '@mantine/core';
import {
  IconSearch,
  IconCreditCard,
  IconTrendingUp,
  IconUsers,
  IconCalendar,
} from '@tabler/icons-react';

// Mock payment data
const mockPayments = [
  {
    id: 'pay_001',
    userId: 'user001',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@university.edu',
    userAvatar: null,
    amount: 49.99,
    currency: 'USD',
    type: 'premium_subscription',
    status: 'completed',
    paymentMethod: 'credit_card',
    transactionId: 'txn_1234567890',
    createdAt: '2024-03-15T10:30:00Z',
    description: 'Premium Subscription - Monthly',
    schoolName: 'Stanford University',
  },
  {
    id: 'pay_002',
    userId: 'user002',
    userName: 'Michael Chen',
    userEmail: 'michael.chen@tech.edu',
    userAvatar: null,
    amount: 149.99,
    currency: 'USD',
    type: 'premium_subscription',
    status: 'completed',
    paymentMethod: 'paypal',
    transactionId: 'txn_1234567891',
    createdAt: '2024-03-15T09:15:00Z',
    description: 'Premium Subscription - Yearly',
    schoolName: 'MIT',
  },
  {
    id: 'pay_003',
    userId: 'user003',
    userName: 'Emma Wilson',
    userEmail: 'emma.wilson@state.edu',
    userAvatar: null,
    amount: 49.99,
    currency: 'USD',
    type: 'premium_subscription',
    status: 'pending',
    paymentMethod: 'credit_card',
    transactionId: 'txn_1234567892',
    createdAt: '2024-03-15T08:45:00Z',
    description: 'Premium Subscription - Monthly',
    schoolName: 'UCLA',
  },
  {
    id: 'pay_004',
    userId: 'user004',
    userName: 'David Rodriguez',
    userEmail: 'david.rodriguez@college.edu',
    userAvatar: null,
    amount: 29.99,
    currency: 'USD',
    type: 'boost_visibility',
    status: 'completed',
    paymentMethod: 'apple_pay',
    transactionId: 'txn_1234567893',
    createdAt: '2024-03-14T16:20:00Z',
    description: 'Profile Boost - 7 days',
    schoolName: 'Harvard University',
  },
  {
    id: 'pay_005',
    userId: 'user005',
    userName: 'Lisa Thompson',
    userEmail: 'lisa.thompson@uni.edu',
    userAvatar: null,
    amount: 19.99,
    currency: 'USD',
    type: 'super_like',
    status: 'failed',
    paymentMethod: 'credit_card',
    transactionId: 'txn_1234567894',
    createdAt: '2024-03-14T14:10:00Z',
    description: 'Super Likes Pack - 10 likes',
    schoolName: 'Yale University',
  },
  {
    id: 'pay_006',
    userId: 'user006',
    userName: 'James Park',
    userEmail: 'james.park@university.edu',
    userAvatar: null,
    amount: 49.99,
    currency: 'USD',
    type: 'premium_subscription',
    status: 'completed',
    paymentMethod: 'google_pay',
    transactionId: 'txn_1234567895',
    createdAt: '2024-03-14T11:30:00Z',
    description: 'Premium Subscription - Monthly',
    schoolName: 'Princeton University',
  },
  {
    id: 'pay_007',
    userId: 'user007',
    userName: 'Sophie Anderson',
    userEmail: 'sophie.anderson@college.edu',
    userAvatar: null,
    amount: 149.99,
    currency: 'USD',
    type: 'premium_subscription',
    status: 'completed',
    paymentMethod: 'credit_card',
    transactionId: 'txn_1234567896',
    createdAt: '2024-03-14T09:45:00Z',
    description: 'Premium Subscription - Yearly',
    schoolName: 'Columbia University',
  },
  {
    id: 'pay_008',
    userId: 'user008',
    userName: 'Ryan Kim',
    userEmail: 'ryan.kim@tech.edu',
    userAvatar: null,
    amount: 39.99,
    currency: 'USD',
    type: 'boost_visibility',
    status: 'completed',
    paymentMethod: 'venmo',
    transactionId: 'txn_1234567897',
    createdAt: '2024-03-13T17:15:00Z',
    description: 'Profile Boost - 14 days',
    schoolName: 'Carnegie Mellon',
  },
];

const PaymentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isLoading] = useState(false); // Set to false since we're using mock data

  // Calculate stats
  const totalRevenue = mockPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalTransactions = mockPayments.length;
  const completedTransactions = mockPayments.filter(p => p.status === 'completed').length;
  const pendingTransactions = mockPayments.filter(p => p.status === 'pending').length;

  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Payment Method</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Transaction ID</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Group gap="sm">
                <Skeleton height={40} width={40} circle />
                <div>
                  <Skeleton height={16} width={120} mb={4} />
                  <Skeleton height={12} width={180} />
                </div>
              </Group>
            </Table.Td>
            <Table.Td><Skeleton height={16} width={80} /></Table.Td>
            <Table.Td><Skeleton height={20} width={100} radius="sm" /></Table.Td>
            <Table.Td><Skeleton height={20} width={80} radius="sm" /></Table.Td>
            <Table.Td><Skeleton height={16} width={100} /></Table.Td>
            <Table.Td><Skeleton height={16} width={100} /></Table.Td>
            <Table.Td><Skeleton height={16} width={150} /></Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter !== 'all') {
      matchesStatus = payment.status === statusFilter;
    }

    let matchesType = true;
    if (typeFilter !== 'all') {
      matchesType = payment.type === typeFilter;
    }
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'yellow';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium_subscription': return 'blue';
      case 'boost_visibility': return 'purple';
      case 'super_like': return 'pink';
      default: return 'gray';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'premium_subscription': return 'Premium';
      case 'boost_visibility': return 'Boost';
      case 'super_like': return 'Super Like';
      default: return type;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'paypal': return 'PayPal';
      case 'apple_pay': return 'Apple Pay';
      case 'google_pay': return 'Google Pay';
      case 'venmo': return 'Venmo';
      default: return method;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const rows = filteredPayments.map((payment) => (
    <Table.Tr key={payment.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius="xl" src={payment.userAvatar} color="blue">
            {!payment.userAvatar && getInitials(payment.userName)}
          </Avatar>
          <div>
            <Text fw={500}>{payment.userName}</Text>
            <Text size="sm" c="dimmed">{payment.userEmail}</Text>
            <Text size="xs" c="dimmed">{payment.schoolName}</Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fw={600} size="sm">
          {formatCurrency(payment.amount, payment.currency)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getTypeColor(payment.type)} variant="light" size="sm">
          {getTypeLabel(payment.type)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(payment.status)} variant="light" size="sm">
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{getPaymentMethodLabel(payment.paymentMethod)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{formatDate(payment.createdAt)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
          {payment.transactionId}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {isLoading ? (
          <Skeleton height={32} width={200} />
        ) : (
          <Title order={1}>Payment Management</Title>
        )}
      </Group>

      {/* Stats Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Total Revenue
              </Text>
              <Text size="xl" fw={700} c="green">
                {formatCurrency(totalRevenue, 'USD')}
              </Text>
            </div>
            <IconTrendingUp size={24} color="var(--mantine-color-green-6)" />
          </Group>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Total Transactions
              </Text>
              <Text size="xl" fw={700}>
                {totalTransactions}
              </Text>
            </div>
            <IconCreditCard size={24} color="var(--mantine-color-blue-6)" />
          </Group>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Completed
              </Text>
              <Text size="xl" fw={700} c="green">
                {completedTransactions}
              </Text>
            </div>
            <IconUsers size={24} color="var(--mantine-color-green-6)" />
          </Group>
        </Paper>

        <Paper p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" fw={500}>
                Pending
              </Text>
              <Text size="xl" fw={700} c="yellow">
                {pendingTransactions}
              </Text>
            </div>
            <IconCalendar size={24} color="var(--mantine-color-yellow-6)" />
          </Group>
        </Paper>
      </SimpleGrid>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          {isLoading ? (
            <>
              <Skeleton height={16} width={120} />
              <Group>
                <Skeleton height={36} width={120} />
                <Skeleton height={36} width={120} />
                <Skeleton height={36} width={300} />
              </Group>
            </>
          ) : (
            <>
              <Text fw={500}>Payments ({filteredPayments.length})</Text>
              <Group>
                <Select
                  placeholder="Filter by status"
                  data={[
                    { value: 'all', label: 'All Status' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'failed', label: 'Failed' },
                  ]}
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value || 'all')}
                  style={{ width: 120 }}
                />
                <Select
                  placeholder="Filter by type"
                  data={[
                    { value: 'all', label: 'All Types' },
                    { value: 'premium_subscription', label: 'Premium' },
                    { value: 'boost_visibility', label: 'Boost' },
                    { value: 'super_like', label: 'Super Like' },
                  ]}
                  value={typeFilter}
                  onChange={(value) => setTypeFilter(value || 'all')}
                  style={{ width: 120 }}
                />
                <TextInput
                  placeholder="Search payments..."
                  leftSection={<IconSearch size={16} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                  style={{ width: 300 }}
                />
              </Group>
            </>
          )}
        </Group>

        <Table.ScrollContainer minWidth={1200}>
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Payment Method</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Transaction ID</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? rows : (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text ta="center" py="xl" c="dimmed">
                        {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' 
                          ? 'No payments found matching your filters.' 
                          : 'No payments found.'}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </Table.ScrollContainer>
      </Card>
    </Stack>
  );
};

export default PaymentManagement; 