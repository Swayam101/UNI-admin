import { useState, useEffect } from 'react';
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
  ActionIcon,
  Modal,
  Grid,
  Skeleton,
} from '@mantine/core';
import {
  IconMail,
  IconSend,
  IconTrash,
  IconEye,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useSendMassEmail } from '../../hooks/useEmail';
import { EmailTargetGroup } from '../../types/email';
import type { SendMassEmailDto } from '../../types/email';

interface EmailCampaign {
  id: string;
  subject: string;
  content: string;
  htmlContent: string;
  recipient: EmailTargetGroup;
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  sentCount: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  scheduledAt?: string;
}

const EmailCampaigns = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editingCampaign, setEditingCampaign] = useState<EmailCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  // API hooks
  const sendMassEmailMutation = useSendMassEmail();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Skeleton Components
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Campaign</Table.Th>
          <Table.Th>Recipients</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Sent</Table.Th>
          <Table.Th>Open Rate</Table.Th>
          <Table.Th>Click Rate</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Actions</Table.Th>
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
              <Skeleton height={14} width={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={40} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={80} />
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Skeleton height={28} width={28} circle />
                <Skeleton height={28} width={28} circle />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      subject: 'Welcome to our platform!',
      content: 'Thank you for joining our university social network...',
      htmlContent: '',
      recipient: EmailTargetGroup.All,
      status: 'sent',
      sentCount: 1245,
      openRate: 68.5,
      clickRate: 12.3,
      createdAt: '2024-03-15',
    },
    {
      id: '2',
      subject: 'New features available now',
      content: 'Exciting updates have been released...',
      htmlContent: '',
      recipient: EmailTargetGroup.Active,
      status: 'sent',
      sentCount: 892,
      openRate: 72.1,
      clickRate: 18.7,
      createdAt: '2024-03-18',
    },
    {
      id: '3',
      subject: 'Premium features - Special offer',
      content: 'Upgrade your account and get exclusive benefits...',
      htmlContent: '',
      recipient: EmailTargetGroup.Inactive,
      status: 'scheduled',
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-03-20',
      scheduledAt: '2024-03-22T10:00:00',
    },
    {
      id: '4',
      subject: 'Monthly newsletter - March 2024',
      content: 'Here\'s what happened this month...',
      htmlContent: '',
      recipient: EmailTargetGroup.All,
      status: 'draft',
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-03-21',
    },
  ]);

  const recipientGroups = [
    { value: EmailTargetGroup.All, label: 'All Users', count: 1832 },
    { value: EmailTargetGroup.Active, label: 'Active Users', count: 1456 },
    { value: EmailTargetGroup.Expired, label: 'Expired Users', count: 234 },
    { value: EmailTargetGroup.CompletingProfile, label: 'Completing Profile', count: 142 },
    { value: EmailTargetGroup.Inactive, label: 'Inactive Users', count: 98 },
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

  const handleEditCampaign = (campaign: EmailCampaign) => {
    setEditingCampaign(campaign);
    open();
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const handleSendCampaign = async (campaign: EmailCampaign) => {
    if (!campaign.subject.trim() || !campaign.content.trim()) {
      notifications.show({
        title: 'Validation Error',
        message: 'Subject and content are required to send the campaign.',
        color: 'red',
      });
      return;
    }

    try {
      // Update campaign status to sending
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, status: 'sending' as const } : c
      ));

      const emailData: SendMassEmailDto = {
        targetGroup: campaign.recipient,
        subject: campaign.subject,
        text: campaign.content,
        html: campaign.htmlContent || campaign.content, // Use HTML content if available, otherwise fallback to text
      };

      await sendMassEmailMutation.mutateAsync(emailData);

      // Update campaign status to sent
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id 
          ? { 
              ...c, 
              status: 'sent' as const,
              sentCount: getRecipientCount(campaign.recipient),
              openRate: Math.random() * 80 + 10, // Mock data
              clickRate: Math.random() * 25 + 5, // Mock data
            }
          : c
      ));

      notifications.show({
        title: 'Success',
        message: `Email campaign sent successfully to ${getRecipientCount(campaign.recipient)} users!`,
        color: 'green',
      });

    } catch {
      // Revert campaign status back to draft on error
      setCampaigns(prev => prev.map(c => 
        c.id === campaign.id ? { ...c, status: 'draft' as const } : c
      ));

      notifications.show({
        title: 'Error',
        message: 'Failed to send email campaign. Please try again.',
        color: 'red',
      });
    }
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

  const getRecipientCount = (recipient: string) => {
    return recipientGroups.find(g => g.value === recipient)?.count || 0;
  };

  const totalSent = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.sentCount, 0);

  const rows = campaigns.map((campaign) => (
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
      <Table.Td>{campaign.status === 'sent' ? `${campaign.openRate.toFixed(1)}%` : '-'}</Table.Td>
      <Table.Td>{campaign.status === 'sent' ? `${campaign.clickRate.toFixed(1)}%` : '-'}</Table.Td>
      <Table.Td>{campaign.createdAt}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleEditCampaign(campaign)}>
            <IconEye size={16} />
          </ActionIcon>
          {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
            <ActionIcon 
              variant="subtle" 
              color="green" 
              onClick={() => handleSendCampaign(campaign)}
              loading={sendMassEmailMutation.isPending}
              disabled={sendMassEmailMutation.isPending}
            >
              <IconSend size={16} />
            </ActionIcon>
          )}
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteCampaign(campaign.id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        {loading ? (
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

      {/* Campaign Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card padding="lg" radius="md" withBorder>
            {loading ? (
              <>
                <Skeleton height={12} width="60%" mb="xs" />
                <Skeleton height={28} width="50%" />
              </>
            ) : (
              <>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Total Sent</Text>
                <Text fw={700} size="xl">{totalSent.toLocaleString()}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card padding="lg" radius="md" withBorder>
            {loading ? (
              <>
                <Skeleton height={12} width="60%" mb="xs" />
                <Skeleton height={28} width="40%" />
              </>
            ) : (
              <>
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Campaigns</Text>
                <Text fw={700} size="xl">{campaigns.length}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          {loading ? (
            <Skeleton height={16} width={140} />
          ) : (
            <Text fw={500}>Campaign History</Text>
          )}
        </Group>

        <Table.ScrollContainer minWidth={1000}>
          {loading ? <TableSkeleton /> : (
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Campaign</Table.Th>
                  <Table.Th>Recipients</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Sent</Table.Th>
                  <Table.Th>Open Rate</Table.Th>
                  <Table.Th>Click Rate</Table.Th>
                  <Table.Th>Created</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Table.ScrollContainer>
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
            onChange={(event) => setEditingCampaign(prev => 
              prev ? {...prev, subject: event.currentTarget.value} : null
            )}
          />

          <Select
            label="Recipients"
            description={`Will send to ${getRecipientCount(editingCampaign?.recipient || EmailTargetGroup.All).toLocaleString()} users`}
            data={recipientGroups.map(group => ({
              value: group.value,
              label: group.label
            }))}
            value={editingCampaign?.recipient || EmailTargetGroup.All}
            onChange={(value) => setEditingCampaign(prev => 
              prev ? {...prev, recipient: value as EmailTargetGroup} : null
            )}
          />

          <Textarea
            label="Email Content (Text)"
            placeholder="Write your email content here..."
            value={editingCampaign?.content || ''}
            onChange={(event) => setEditingCampaign(prev => 
              prev ? {...prev, content: event.currentTarget.value} : null
            )}
            minRows={4}
          />

          <Textarea
            label="HTML Content (Optional)"
            placeholder="Write your HTML content here..."
            value={editingCampaign?.htmlContent || ''}
            onChange={(event) => setEditingCampaign(prev => 
              prev ? {...prev, htmlContent: event.currentTarget.value} : null
            )}
            minRows={4}
          />

          <Group justify="flex-end">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                if (editingCampaign?.id) {
                  // Update existing campaign
                  setCampaigns(prev => prev.map(c => 
                    c.id === editingCampaign.id ? editingCampaign : c
                  ));
                } else {
                  // Create new campaign
                  const newCampaign = {
                    ...editingCampaign!,
                    id: Date.now().toString(),
                  };
                  setCampaigns(prev => [...prev, newCampaign]);
                }
                close();
              }}
              disabled={!editingCampaign?.subject.trim() || !editingCampaign?.content.trim()}
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