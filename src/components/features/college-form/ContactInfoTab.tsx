import { TextInput, Grid } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateCollegeRequest, UpdateCollegeRequest } from '../../../types/college';

interface ContactInfoTabProps {
  form: UseFormReturnType<CreateCollegeRequest | UpdateCollegeRequest>;
  onUserInteraction: () => void;
}

const ContactInfoTab = ({ form, onUserInteraction }: ContactInfoTabProps) => {
  return (
    <Grid>
      <Grid.Col span={6}>
        <TextInput
          label="Email"
          placeholder="contact@college.edu"
          required
          {...form.getInputProps('email')}
          onChange={(event) => {
            form.getInputProps('email').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Phone Number"
          placeholder="+1 (555) 123-4567"
          required
          {...form.getInputProps('phoneNumber')}
          onChange={(event) => {
            form.getInputProps('phoneNumber').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={12}>
        <TextInput
          label="Address Line 1"
          placeholder="Street address"
          required
          {...form.getInputProps('addressLine1')}
          onChange={(event) => {
            form.getInputProps('addressLine1').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={12}>
        <TextInput
          label="Address Line 2"
          placeholder="Apartment, suite, etc. (optional)"
          {...form.getInputProps('addressLine2')}
          onChange={(event) => {
            form.getInputProps('addressLine2').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={4}>
        <TextInput
          label="City"
          placeholder="City"
          required
          {...form.getInputProps('city')}
          onChange={(event) => {
            form.getInputProps('city').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={4}>
        <TextInput
          label="State/Province"
          placeholder="State or Province"
          {...form.getInputProps('state')}
          onChange={(event) => {
            form.getInputProps('state').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={4}>
        <TextInput
          label="Country"
          placeholder="Country"
          required
          {...form.getInputProps('country')}
          onChange={(event) => {
            form.getInputProps('country').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Postal Code"
          placeholder="Postal/ZIP code"
          required
          {...form.getInputProps('postalCode')}
          onChange={(event) => {
            form.getInputProps('postalCode').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Fax Number"
          placeholder="+1 (555) 123-4567"
          {...form.getInputProps('faxNumber')}
          onChange={(event) => {
            form.getInputProps('faxNumber').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={12}>
        <TextInput
          label="Website URL"
          placeholder="https://www.college.edu"
          {...form.getInputProps('websiteUrl')}
          onChange={(event) => {
            form.getInputProps('websiteUrl').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
    </Grid>
  );
};

export default ContactInfoTab; 