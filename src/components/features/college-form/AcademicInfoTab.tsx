import { TextInput, TagsInput, Grid, Divider, Text } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { CreateCollegeRequest, UpdateCollegeRequest } from '../../../types/college';

interface AcademicInfoTabProps {
  form: UseFormReturnType<CreateCollegeRequest | UpdateCollegeRequest>;
  onUserInteraction: () => void;
}

const AcademicInfoTab = ({ form, onUserInteraction }: AcademicInfoTabProps) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Text size="lg" fw={600} mb="md">Academic Information</Text>
      </Grid.Col>
      
      <Grid.Col span={12}>
        <TagsInput
          label="Courses Offered"
          placeholder="Enter courses and press Enter"
          description="Add the main courses/programs offered at this college"
          {...form.getInputProps('coursesOffered')}
          onChange={(value) => {
            form.setFieldValue('coursesOffered', value);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Accreditation"
          placeholder="e.g., NAAC A+ Grade"
          description="Accreditation details"
          {...form.getInputProps('accreditation')}
          onChange={(event) => {
            form.getInputProps('accreditation').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TagsInput
          label="Facilities"
          placeholder="Enter facilities and press Enter"
          description="Campus facilities available"
          {...form.getInputProps('facilities')}
          onChange={(value) => {
            form.setFieldValue('facilities', value);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={12}>
        <Divider my="md" />
        <Text size="lg" fw={600} mb="md">Administrative Contacts</Text>
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Principal Name"
          placeholder="Full name of the principal"
          {...form.getInputProps('principalName')}
          onChange={(event) => {
            form.getInputProps('principalName').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Principal Contact"
          placeholder="Principal's phone number"
          {...form.getInputProps('principalContact')}
          onChange={(event) => {
            form.getInputProps('principalContact').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Admission Contact Email"
          placeholder="admissions@college.edu"
          {...form.getInputProps('admissionContactEmail')}
          onChange={(event) => {
            form.getInputProps('admissionContactEmail').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
      
      <Grid.Col span={6}>
        <TextInput
          label="Admission Contact Phone"
          placeholder="Admissions phone number"
          {...form.getInputProps('admissionContactPhone')}
          onChange={(event) => {
            form.getInputProps('admissionContactPhone').onChange(event);
            onUserInteraction();
          }}
        />
      </Grid.Col>
    </Grid>
  );
};

export default AcademicInfoTab; 