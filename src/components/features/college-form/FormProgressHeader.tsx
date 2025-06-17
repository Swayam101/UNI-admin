import { Progress, Tabs, Alert, Text, Group, ActionIcon } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';

interface TabCompletion {
  basic: boolean;
  contact: boolean;
  academic: boolean;
  social: boolean;
}

interface FormProgressHeaderProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  tabCompletion: TabCompletion;
  showAutoAdvanceNotification: boolean;
  autoAdvanceCountdown: number;
  onCancelAutoAdvance: () => void;
}

const FormProgressHeader = ({
  activeTab,
  setActiveTab,
  tabCompletion,
  showAutoAdvanceNotification,
  autoAdvanceCountdown,
  onCancelAutoAdvance,
}: FormProgressHeaderProps) => {
  const completedTabs = Object.values(tabCompletion).filter(Boolean).length;
  const progressPercentage = (completedTabs / 4) * 100;

  const getTabIcon = (isComplete: boolean) => {
    return isComplete ? <IconCheck size={16} /> : null;
  };

  return (
    <>
      <Progress value={progressPercentage} size="sm" mb="md" />
      
      {showAutoAdvanceNotification && (
        <Alert mb="md" color="blue">
          <Group justify="space-between">
            <Text size="sm">
              Auto-advancing to next section in {autoAdvanceCountdown} seconds...
            </Text>
            <ActionIcon
              variant="subtle"
              color="blue"
              size="sm"
              onClick={onCancelAutoAdvance}
            >
              <IconX size={16} />
            </ActionIcon>
          </Group>
        </Alert>
      )}

      <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
        <Tabs.List>
          <Tabs.Tab
            value="basic"
            rightSection={getTabIcon(tabCompletion.basic)}
            color={tabCompletion.basic ? 'green' : undefined}
          >
            Basic Info
          </Tabs.Tab>
          <Tabs.Tab
            value="contact"
            rightSection={getTabIcon(tabCompletion.contact)}
            color={tabCompletion.contact ? 'green' : undefined}
          >
            Contact
          </Tabs.Tab>
          <Tabs.Tab
            value="academic"
            rightSection={getTabIcon(tabCompletion.academic)}
            color={tabCompletion.academic ? 'green' : undefined}
          >
            Academic
          </Tabs.Tab>
          <Tabs.Tab
            value="social"
            rightSection={getTabIcon(tabCompletion.social)}
            color={tabCompletion.social ? 'green' : undefined}
          >
            Social
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
};

export default FormProgressHeader; 