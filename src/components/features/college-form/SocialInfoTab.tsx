import { TextInput, TagsInput, Grid, Text, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateCollegeRequest, UpdateCollegeRequest } from '../../../types/college';

interface SocialInfoTabProps {
  form: UseFormReturnType<CreateCollegeRequest | UpdateCollegeRequest>;
  onUserInteraction: () => void;
}

const SocialInfoTab = ({ form, onUserInteraction }: SocialInfoTabProps) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Text size="lg" fw={600} mb="md">Social Media Integration</Text>
        <Alert icon={<IconInfoCircle size={16} />} color="blue" mb="md">
          Connect your Instagram Business account to automatically sync posts and engagement data.
        </Alert>
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Instagram Business ID"
          placeholder="Your Instagram Business account ID"
          description="Required for Instagram integration"
          {...form.getInputProps('instagramBusinessId')}
          onChange={(event) => {
            form.getInputProps('instagramBusinessId').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Instagram Access Token"
          placeholder="Your Instagram access token"
          description="Required for posting content"
          type="password"
          {...form.getInputProps('instagramAccessToken')}
          onChange={(event) => {
            form.getInputProps('instagramAccessToken').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={12}>
        <TagsInput
          label="Social Media Links"
          placeholder="Enter social media URLs and press Enter"
          description="Add links to your college's social media profiles"
          {...form.getInputProps('socialLinks')}
          onChange={(value) => {
            form.setFieldValue('socialLinks', value);
            onUserInteraction();
          }}
        />
      </Grid.Col>
    </Grid>
  );
};

export default SocialInfoTab; 