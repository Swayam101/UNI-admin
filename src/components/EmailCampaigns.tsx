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
  ActionIcon,
  Modal,
  Grid,
} from '@mantine/core';
import {
  IconMail,
  IconSend,
  IconTrash,
  IconEye,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface EmailCampaign {
  id: string;
  subject: string;
  content: string;
  recipient: 'all' | 'students' | 'schools' | 'paid' | 'free';
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

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: '1',
      subject: 'Welcome to our platform!',
      content: 'Thank you for joining our university social network...',
      recipient: 'all',
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
      recipient: 'students',
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
      recipient: 'free',
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
      recipient: 'all',
      status: 'draft',
      sentCount: 0,
      openRate: 0,
      clickRate: 0,
      createdAt: '2024-03-21',
    },
  ]);

  const recipientGroups = [
    { value: 'all', label: 'All Users', count: 1832 },
    { value: 'students', label: 'Students Only', count: 1456 },
    { value: 'schools', label: 'School Admins', count: 24 },
    { value: 'paid', label: 'Paid Users', count: 567 },
    { value: 'free', label: 'Free Users', count: 1265 },
  ];

  const handleCreateCampaign = () => {
    setEditingCampaign({
      id: '',
      subject: '',
      content: '',
      recipient: 'all',
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

  const handleSendCampaign = (id: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id 
        ? { 
            ...campaign, 
            status: 'sending' as const,
            // Simulate sending process
            sentCount: recipientGroups.find(g => g.value === campaign.recipient)?.count || 0
          }
        : campaign
    ));
    
    // Simulate completion after 3 seconds
    setTimeout(() => {
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === id 
          ? { 
              ...campaign, 
              status: 'sent' as const,
              openRate: Math.random() * 80 + 10, // Random rate between 10-90%
              clickRate: Math.random() * 25 + 5, // Random rate between 5-30%
            }
          : campaign
      ));
    }, 3000);
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
  const avgOpenRate = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.openRate, 0) / campaigns.filter(c => c.status === 'sent').length || 0;
  const avgClickRate = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.clickRate, 0) / campaigns.filter(c => c.status === 'sent').length || 0;

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
              onClick={() => handleSendCampaign(campaign.id)}
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
        <Title order={1}>Email Campaigns</Title>
        <Button leftSection={<IconMail size={16} />} onClick={handleCreateCampaign}>
          Create Campaign
        </Button>
      </Group>

      {/* Campaign Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Total Sent</Text>
            <Text fw={700} size="xl">{totalSent.toLocaleString()}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Campaigns</Text>
            <Text fw={700} size="xl">{campaigns.length}</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Avg Open Rate</Text>
            <Text fw={700} size="xl">{avgOpenRate.toFixed(1)}%</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card padding="lg" radius="md" withBorder>
            <Text c="dimmed" size="sm" tt="uppercase" fw={700}>Avg Click Rate</Text>
            <Text fw={700} size="xl">{avgClickRate.toFixed(1)}%</Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={500}>Campaign History</Text>
        </Group>

        <Table.ScrollContainer minWidth={1000}>
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
            description={`Will send to ${getRecipientCount(editingCampaign?.recipient || 'all').toLocaleString()} users`}
            data={recipientGroups.map(group => ({
              value: group.value,
              label: `${group.label} (${group.count.toLocaleString()})`
            }))}
            value={editingCampaign?.recipient || 'all'}
            onChange={(value) => setEditingCampaign(prev => 
              prev ? {...prev, recipient: value as 'all' | 'students' | 'schools' | 'paid' | 'free'} : null
            )}
          />

          <Textarea
            label="Email Content"
            placeholder="Write your email content here..."
            value={editingCampaign?.content || ''}
            onChange={(event) => setEditingCampaign(prev => 
              prev ? {...prev, content: event.currentTarget.value} : null
            )}
            minRows={6}
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