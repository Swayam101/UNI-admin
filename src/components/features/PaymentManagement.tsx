import { useState, useEffect } from 'react';
import { Stack, Title, Card, Table, Text, Loader, Center, Button, Group, Modal, NumberInput } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { useDisclosure, useDebouncedValue } from '@mantine/hooks';
import { PaymentStats } from './payment-management/PaymentStats';
import { PaymentFilters } from './payment-management/PaymentFilters';
import { PaymentTable } from './payment-management/PaymentTable';
import { useGetAllPayments } from '../../hooks/useTransactions';
import { useUpdatePricing } from '../../hooks/usePosts';

type PaymentType = 'all' | 'post' | 'subscription';

const PaymentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);
  const [paymentType, setPaymentType] = useState<PaymentType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pricingOpened, { open: openPricing, close: closePricing }] = useDisclosure(false);

  // Pricing settings
  const [postPrice, setPostPrice] = useState(10);
  const [premiumPrice, setPremiumPrice] = useState(50);

  const updatePricingMutation = useUpdatePricing();

  const handleSavePricing = async () => {
    try {
      await updatePricingMutation.mutateAsync({
        post: postPrice,
        premium: premiumPrice,
      });
      closePricing();
    } catch (error) {
      // Error is handled by the mutation
      console.error('Save pricing failed:', error);
    }
  };

  const backendParams = {
    page: currentPage,
    limit: 10,
    search: debouncedSearch.trim() || undefined,
    paymentType: paymentType === 'all' ? undefined : paymentType,
  };

  const { data, isLoading, isError } = useGetAllPayments(backendParams);
  const payments = data?.data?.transactions || [];

  // Stats from API data
  const stats = {
    totalRevenue: data?.data?.totalRevenue || 0,
    totalTransactions: data?.data?.totalDocs || 0,
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, paymentType]);

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Payment Management</Title>
        <Button
          leftSection={<IconSettings size={16} />}
          variant="outline"
          onClick={openPricing}
        >
          Pricing Settings
        </Button>
      </Group>

      <Card padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <PaymentStats totalRevenue={stats.totalRevenue} totalTransactions={stats.totalTransactions} />

          <PaymentFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            paymentType={paymentType}
            onPaymentTypeChange={setPaymentType}
          />

          {isLoading ? (
            <Center py="xl">
              <Loader size="md" />
            </Center>
          ) : isError ? (
            <Text ta="center" py="xl" c="red">
              Failed to load payments. Please try again later.
            </Text>
          ) : (
            <>
              <Table.ScrollContainer minWidth={1200}>
                <PaymentTable payments={payments} isLoading={false} />
              </Table.ScrollContainer>

              {payments.length === 0 && (
                <Text ta="center" py="xl" c="dimmed">
                  No payments found matching your filters.
                </Text>
              )}
            </>
          )}
        </Stack>
      </Card>

      {/* Pricing Modal */}
      <Modal
        opened={pricingOpened}
        onClose={closePricing}
        title="Pricing Settings"
        size="md"
      >
        <Stack gap="md">
          <NumberInput
            label="Post Price"
            description="Price per post in USD"
            value={postPrice}
            onChange={(value) => setPostPrice(Number(value))}
            min={0}
            decimalScale={2}
            prefix="$"
          />

          <NumberInput
            label="Premium Price"
            description="Premium subscription price in USD"
            value={premiumPrice}
            onChange={(value) => setPremiumPrice(Number(value))}
            min={0}
            decimalScale={2}
            prefix="$"
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={closePricing}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePricing}
              loading={updatePricingMutation.isPending}
            >
              Save Pricing
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default PaymentManagement;
