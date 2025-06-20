import {
  Table,
  Group,
  Text,
  Avatar,
  Skeleton,
} from '@mantine/core';
import { Payment } from '../../../services/transactionService';


interface PaymentTableProps {
  payments: Payment[];
  isLoading?: boolean;
}


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
    minute: '2-digit'
  });
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

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
              <Skeleton height={32} circle />
              <div>
                <Skeleton height={12} width={120} mb={4} />
                <Skeleton height={8} width={180} mb={4} />
                <Skeleton height={8} width={100} />
              </div>
            </Group>
          </Table.Td>
          <Table.Td><Skeleton height={12} width={80} /></Table.Td>
          <Table.Td><Skeleton height={20} width={80} radius="xl" /></Table.Td>
          <Table.Td><Skeleton height={20} width={80} radius="xl" /></Table.Td>
          <Table.Td><Skeleton height={12} width={100} /></Table.Td>
          <Table.Td><Skeleton height={12} width={120} /></Table.Td>
          <Table.Td><Skeleton height={12} width={150} /></Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);

export const PaymentTable = ({ payments, isLoading = false }: PaymentTableProps) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Type</Table.Th>
          {/* <Table.Th>Status</Table.Th> */}
          {/* <Table.Th>Payment Method</Table.Th> */}
          <Table.Th>Date</Table.Th>
          <Table.Th>Transaction ID</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {payments.map((payment) => (
          <Table.Tr key={payment._id}>
            <Table.Td>
              <Group gap="sm">
                <Avatar
                  src={payment.user.profilePicture}
                  alt={payment.user.firstName}
                  radius="xl"
                  size="sm"
                >
                  {getInitials(payment.user.firstName)}
                </Avatar>
                <div>
                  <Text size="sm" fw={500}>
                    {payment.user.firstName} {payment.user.lastName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {payment.user.email}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {payment.college.name}
                  </Text>
                </div>
              </Group>
            </Table.Td>
            <Table.Td>
              <Text fw={500}>
                {formatCurrency(payment.amount, 'USD')}
              </Text>
            </Table.Td>
            {/* <Table.Td>
              <Badge color={getTypeColor(payment.paymentType)} variant="light">
                {getTypeLabel(payment.paymentType)}
              </Badge>
            </Table.Td> */}
            {/* <Table.Td>
              <Badge color={getStatusColor(payment.status)} variant="light">
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </Badge>
            </Table.Td> */}
            <Table.Td>
              <Text size="sm">
                {getPaymentMethodLabel(payment.paymentType)}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">
                {formatDate(payment.createdAt)}
              </Text>
            </Table.Td>
            <Table.Td>
              <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                {payment.stripePaymentIntentId}
              </Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 