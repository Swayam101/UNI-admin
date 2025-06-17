import {
  Table,
  Badge,
  Group,
  Text,
  Avatar,
} from '@mantine/core';

interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string | null;
  amount: number;
  currency: string;
  type: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  description: string;
  schoolName: string;
}

interface PaymentTableProps {
  payments: Payment[];
}

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
    case 'boost_visibility': return 'orange';
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
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const PaymentTable = ({ payments }: PaymentTableProps) => {
  return (
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
        {payments.map((payment) => (
          <Table.Tr key={payment.id}>
            <Table.Td>
              <Group gap="sm">
                <Avatar
                  src={payment.userAvatar}
                  alt={payment.userName}
                  radius="xl"
                  size="sm"
                >
                  {getInitials(payment.userName)}
                </Avatar>
                <div>
                  <Text size="sm" fw={500}>
                    {payment.userName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {payment.userEmail}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {payment.schoolName}
                  </Text>
                </div>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text fw={500}>
                {formatCurrency(payment.amount, payment.currency)}
              </Text>
            </Table.Td>
            <Table.Td>
              <Badge color={getTypeColor(payment.type)} variant="light">
                {getTypeLabel(payment.type)}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Badge color={getStatusColor(payment.status)} variant="light">
                {payment.status}
              </Badge>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {getPaymentMethodLabel(payment.paymentMethod)}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {formatDate(payment.createdAt)}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                {payment.transactionId}
              </Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 