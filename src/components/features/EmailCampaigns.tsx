import { useState } from 'react';
import {
  Title,
  Card,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  Select,
  Table,
  Badge,
  Text,
  Modal,
  Skeleton,
  Pagination,
  Input,
} from '@mantine/core';
import {
  IconMail,
  IconSearch,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useGetEmailCampaigns, useSendMassEmail } from '../../hooks/useEmail';
import { EmailTargetGroup } from '../../types/email';
import type { EmailCampaign } from '../../types/email';

const EmailCampaigns = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingCampaign, setEditingCampaign] = useState<EmailCampaign | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [group, setGroup] = useState<string>('');

  // API hooks
  const { data: campaignsData, isLoading } = useGetEmailCampaigns({
    page,
    limit: 10,
    search,
    status,
    group,
  });
  const sendMassEmailMutation = useSendMassEmail();

  // Skeleton Components
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Campaign</Table.Th>
          <Table.Th>Recipients</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Sent</Table.Th>
          <Table.Th>Created</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 4 }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <div>
                <Skeleton height={16} width="85%" mb={4} />
                <Skeleton height={12} width="70%" />
              </div>
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={100} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={60} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={60} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={80} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  const recipientGroups = [
    { value: EmailTargetGroup.All, label: 'All Users' },
    { value: EmailTargetGroup.Active, label: 'Active Users' },
    { value: EmailTargetGroup.Expired, label: 'Expired Users' },
    { value: EmailTargetGroup.CompletingProfile, label: 'Completing Profile' },
    { value: EmailTargetGroup.Inactive, label: 'Inactive Users' },
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'sent', label: 'Sent' },
    { value: 'sending', label: 'Sending' },
  ];

  const handleCreateCampaign = () => {
    setEditingCampaign({
      id: '',
      subject: '',
      content: '',
      htmlContent: '',
      recipient: EmailTargetGroup.All,
      status: 'draft',
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
    });
    open();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'green';
      case 'sending': return 'blue';
      case 'scheduled': return 'orange';
      case 'draft': return 'gray';
      default: return 'gray';
    }
  };

  const getRecipientLabel = (recipient: string) => {
    return recipientGroups.find(g => g.value === recipient)?.label || recipient;
  };

  const rows = campaignsData?.data.campaigns.map((campaign) => (
    <Table.Tr key={campaign.id}>
      <Table.Td>
        <div>
          <Text fw={500}>{campaign.subject}</Text>
          <Text size="sm" c="dimmed" lineClamp={1}>{campaign.content}</Text>
        </div>
      </Table.Td>
      <Table.Td>{getRecipientLabel(campaign.recipient)}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(campaign.status)} variant="light">
          {campaign.status}
        </Badge>
      </Table.Td>
      <Table.Td>{campaign.sentCount > 0 ? campaign.sentCount.toLocaleString() : '-'}</Table.Td>
      <Table.Td>{campaign.createdAt}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {isLoading ? (
          <>
            <Skeleton height={32} width={200} />
            <Skeleton height={36} width={140} />
          </>
        ) : (
          <>
            <Title order={1}>Email Campaigns</Title>
            <Button leftSection={<IconMail size={16} />} onClick={handleCreateCampaign}>
              Create Campaign
            </Button>
          </>
        )}
      </Group>

      <Card padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group grow>
            <Input
              placeholder="Search campaigns..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
              placeholder="Filter by status"
              data={statusOptions}
              value={status}
              onChange={(value: string | null) => setStatus(value || '')}
              clearable
            />
            <Select
              placeholder="Filter by recipient group"
              data={recipientGroups}
              value={group}
              onChange={(value: string | null) => setGroup(value || '')}
              clearable
            />
          </Group>

          <Table.ScrollContainer minWidth={1000}>
            {isLoading ? <TableSkeleton /> : (
              <Table verticalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Campaign</Table.Th>
                    <Table.Th>Recipients</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Sent</Table.Th>
                    <Table.Th>Created</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            )}
          </Table.ScrollContainer>

          {campaignsData && (
            <Group justify="center">
              <Pagination
                value={page}
                onChange={setPage}
                total={campaignsData.data.totalPages}
              />
            </Group>
          )}
        </Stack>
      </Card>

      {/* Create/Edit Campaign Modal */}
      <Modal 
        opened={opened} 
        onClose={close} 
        title={editingCampaign?.id ? 'Edit Campaign' : 'Create New Campaign'} 
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="Subject Line"
            placeholder="Enter email subject"
            value={editingCampaign?.subject || ''}
            onChange={(event) => {
              if (!event.currentTarget) return;
              console.log("subject", event.target.value);
              setEditingCampaign(prev => 
                prev ? {...prev, subject: event.target.value} : prev
              );
            }}
          />

          <Select
            label="Recipients"
            data={recipientGroups}
            value={editingCampaign?.recipient || EmailTargetGroup.All}
            onChange={(value: string | null) => {
              if (!value) return;
              setEditingCampaign(prev => 
                prev ? {...prev, recipient: value as EmailTargetGroup} : prev
              );
            }}
          />

          <Textarea
            label="Email Content (Text)"
            placeholder="Write your email content here..."
            value={editingCampaign?.content || ''}
            onChange={(event) => {
              if (!event.currentTarget) return;
              setEditingCampaign(prev => 
                prev ? {...prev, content: event.target.value} : prev
              );
            }}
            minRows={4}
          />

          <Textarea
            label="HTML Content"
            placeholder="Write your HTML content here..."
            value={editingCampaign?.htmlContent || ''}
            onChange={(event) => {
              if (!event.currentTarget) return;
              setEditingCampaign(prev => 
                prev ? {...prev, htmlContent: event.target.value} : prev
              );
            }}
            minRows={4}
          />

          <Group justify="flex-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button 
              onClick={async () => {
                if (!editingCampaign) return;

                if (editingCampaign.id) {
                  // TODO: Implement update functionality
                  notifications.show({
                    title: 'Not Implemented',
                    message: 'Update functionality is not implemented yet.',
                    color: 'yellow',
                  });
                } else {
                  try {
                    await sendMassEmailMutation.mutateAsync({
                      targetGroup: editingCampaign.recipient,
                      subject: editingCampaign.subject,
                      text: editingCampaign.content,
                      html: editingCampaign.htmlContent || editingCampaign.content,
                    });

                    notifications.show({
                      title: 'Success',
                      message: 'Email campaign has been created and queued for sending.',
                      color: 'green',
                    });
                    close();
                  } catch (error) {
                    notifications.show({
                      title: 'Error',
                      message: error instanceof Error ? error.message : 'Failed to create campaign',
                      color: 'red',
                    });
                  }
                }
              }}
              loading={sendMassEmailMutation.isPending}
              disabled={!editingCampaign?.subject?.trim() || !editingCampaign?.content?.trim()}
            >
              {editingCampaign?.id ? 'Update' : 'Create'} Campaign
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default EmailCampaigns; 