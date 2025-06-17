import { TextInput, Textarea, NumberInput, Grid } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateCollegeRequest, UpdateCollegeRequest } from '../../../types/college';

interface BasicInfoTabProps {
  form: UseFormReturnType<CreateCollegeRequest | UpdateCollegeRequest>;
  onUserInteraction: () => void;
}

const BasicInfoTab = ({ form, onUserInteraction }: BasicInfoTabProps) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          label="College Name"
          placeholder="Enter college name"
          required
          {...form.getInputProps('name')}
          onChange={(event) => {
            form.getInputProps('name').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={12}>
        <Textarea
          label="Description"
          placeholder="Enter college description"
          required
          minRows={4}
          {...form.getInputProps('description')}
          onChange={(event) => {
            form.getInputProps('description').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Logo URL"
          placeholder="https://example.com/logo.png"
          {...form.getInputProps('logoUrl')}
          onChange={(event) => {
            form.getInputProps('logoUrl').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <NumberInput
          label="Established Year"
          placeholder="e.g., 1985"
          min={1800}
          max={new Date().getFullYear()}
          {...form.getInputProps('establishedYear')}
          onChange={(value) => {
            form.setFieldValue('establishedYear', typeof value === 'number' ? value : undefined);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Campus Size"
          placeholder="e.g., 200 acres"
          {...form.getInputProps('campusSize')}
          onChange={(event) => {
            form.getInputProps('campusSize').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <Textarea
          label="Motto"
          placeholder="College motto or slogan"
          {...form.getInputProps('motto')}
          onChange={(event) => {
            form.getInputProps('motto').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
    </Grid>
  );
};

export default BasicInfoTab; 