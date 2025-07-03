import { useState, useEffect } from 'react';
import { Stack, Title, Card, Table, Text, Loader, Center, Button, Group, Modal, NumberInput, Badge, Box, List, ThemeIcon, Divider, Pagination } from '@mantine/core';
import { IconSettings, IconCheck } from '@tabler/icons-react';
import { useDisclosure, useDebouncedValue } from '@mantine/hooks';
import { PaymentStats } from './payment-management/PaymentStats';
import { PaymentFilters } from './payment-management/PaymentFilters';
import { PaymentTable } from './payment-management/PaymentTable';
import { useGetAllPayments } from '../../hooks/useTransactions';
import { useUpdatePricing } from '../../hooks/usePosts';

type PaymentType = 'all' | 'post' | 'subscription';

const ITEMS_PER_PAGE = 10;

const PaymentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebouncedValue(searchQuery, 300);
  const [paymentType, setPaymentType] = useState<PaymentType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pricingOpened, { open: openPricing, close: closePricing }] = useDisclosure(false);

  // Pricing settings - updated defaults to match new pricing
  const [starterPackPrice, setStarterPackPrice] = useState(5.99);
  const [premiumPackPrice, setPremiumPackPrice] = useState(9.99);

  const updatePricingMutation = useUpdatePricing();

  const handleSavePricing = async () => {
    try {
      // Still use the same API structure but with updated values
      await updatePricingMutation.mutateAsync({
        post: starterPackPrice,
        premium: premiumPackPrice,
      });
      closePricing();
    } catch (error) {
      // Error is handled by the mutation
      console.error('Save pricing failed:', error);
    }
  };

  const backendParams = {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch.trim() || undefined,
    paymentType: paymentType === 'all' ? undefined : paymentType,
  };

  const { data, isLoading, isError } = useGetAllPayments(backendParams);
  const payments = data?.data?.transactions || [];
  const totalPages = Math.ceil((data?.data?.totalDocs || 0) / ITEMS_PER_PAGE);

  // Stats from API data
  const stats = {
    totalRevenue: data?.data?.totalRevenue || 0,
    totalTransactions: data?.data?.totalDocs || 0,
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, paymentType]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const starterFeatures = [
    'Submit 1 post to Instagram + website feed',
    'View your own post + 10 other student profiles',
    'No filters available',
    'No AI matching',
    'No expedited posting',
    'After 10 profile views, upgrade prompt appears'
  ];

  const premiumFeatures = [
    'Expedited posting (moved to front of queue)',
    'Unlimited profile views',
    'Unlimited posts',
    'AI-powered roommate matching enabled',
    'Full filter access (major, vibe, interests, dorm, etc.)'
  ];

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

              {payments.length === 0 ? (
                <Text ta="center" py="xl" c="dimmed">
                  No payments found matching your filters.
                </Text>
              ) : (
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    Showing {Math.min(ITEMS_PER_PAGE * (currentPage - 1) + 1, stats.totalTransactions)} - {Math.min(ITEMS_PER_PAGE * currentPage, stats.totalTransactions)} of {stats.totalTransactions} payments
                  </Text>
                  <Pagination 
                    value={currentPage}
                    onChange={handlePageChange}
                    total={totalPages}
                    radius="md"
                  />
                </Group>
              )}
            </>
          )}
        </Stack>
      </Card>

      {/* Updated Pricing Modal */}
      <Modal
        opened={pricingOpened}
        onClose={closePricing}
        title="Pricing Settings"
        size="lg"
      >
        <Stack gap="lg">
          {/* Starter Pack Section */}
          <Box>
            <Group justify="space-between" align="flex-start" mb="sm">
              <div>
                <Title order={4} c="blue">Tier 1: Starter Plan</Title>
                <Text size="sm" c="dimmed">Perfect for getting started</Text>
              </div>
              <NumberInput
                label="Price (USD/month)"
                value={starterPackPrice}
                onChange={(value) => setStarterPackPrice(Number(value))}
                min={0}
                decimalScale={2}
                prefix="$"
                w={150}
              />
            </Group>
            
            <Text fw={500} mb="xs">Features included:</Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="blue" size={18} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {starterFeatures.map((feature, index) => (
                <List.Item key={index}>{feature}</List.Item>
              ))}
            </List>
          </Box>

          <Divider />

          {/* Premium Pack Section */}
          <Box>
            <Group justify="space-between" align="flex-start" mb="sm">
              <div>
                <Group align="center" gap="xs">
                  <Title order={4} c="orange">Tier 2: Premium Match+</Title>
                  <Badge color="orange" size="sm">Most Popular</Badge>
                </Group>
                <Text size="sm" c="dimmed">Full access with AI matching</Text>
              </div>
              <NumberInput
                label="Price (USD/month)"
                value={premiumPackPrice}
                onChange={(value) => setPremiumPackPrice(Number(value))}
                min={0}
                decimalScale={2}
                prefix="$"
                w={150}
              />
            </Group>
            
            <Text fw={500} mb="xs">Features included:</Text>
            <List
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="orange" size={18} radius="xl">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {premiumFeatures.map((feature, index) => (
                <List.Item key={index}>{feature}</List.Item>
              ))}
            </List>
          </Box>

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={closePricing}>
              Cancel
            </Button>
            <Button 
              onClick={handleSavePricing}
              loading={updatePricingMutation.isPending}
              color="orange"
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
