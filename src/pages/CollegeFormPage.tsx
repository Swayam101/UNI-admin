import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Grid,
  NumberInput,
  TagsInput,
  Alert,
  LoadingOverlay,
  Divider,
  Breadcrumbs,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useCreateCollege, useUpdateCollege, useCollege } from '../hooks/useCollege';
import type { CreateCollegeRequest, UpdateCollegeRequest } from '../types/college';

const CollegeFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const createMutation = useCreateCollege();
  const updateMutation = useUpdateCollege();
  const { data: college, isLoading: isLoadingCollege } = useCollege(id || '');
  
  const isLoading = createMutation.isPending || updateMutation.isPending || isLoadingCollege;

  const form = useForm<CreateCollegeRequest | UpdateCollegeRequest>({
    initialValues: {
      name: '',
      description: '',
      logoUrl: '',
      email: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      websiteUrl: '',
      instagramBusinessId: '',
      instagramAccessToken: '',
      socialLinks: [],
      coursesOffered: [],
      accreditation: '',
      establishedYear: undefined,
      campusSize: '',
      facilities: [],
      principalName: '',
      principalContact: '',
      admissionContactEmail: '',
      admissionContactPhone: '',
      faxNumber: '',
      motto: '',
    },
    validate: {
      name: (value: string | undefined) => (!value?.trim() ? 'College name is required' : null),
      description: (value: string | undefined) => (!value?.trim() ? 'Description is required' : null),
      email: (value: string | undefined) => {
        if (!value?.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address (e.g., contact@college.edu)';
        return null;
      },
      phoneNumber: (value: string | undefined) => (!value?.trim() ? 'Phone number is required' : null),
      addressLine1: (value: string | undefined) => (!value?.trim() ? 'Address is required' : null),
      city: (value: string | undefined) => (!value?.trim() ? 'City is required' : null),
      country: (value: string | undefined) => (!value?.trim() ? 'Country is required' : null),
      postalCode: (value: string | undefined) => (!value?.trim() ? 'Postal code is required' : null),
      admissionContactEmail: (value: string | undefined) => {
        if (!value?.trim()) return null; // Optional field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return null;
      },
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  // Reset form when college data loads
  useEffect(() => {
    if (college) {
      form.setValues({
        name: college.name || '',
        description: college.description || '',
        logoUrl: college.logoUrl || '',
        email: college.email || '',
        phoneNumber: college.phoneNumber || '',
        addressLine1: college.addressLine1 || '',
        addressLine2: college.addressLine2 || '',
        city: college.city || '',
        state: college.state || '',
        country: college.country || '',
        postalCode: college.postalCode || '',
        websiteUrl: college.websiteUrl || '',
        instagramBusinessId: college.instagramBusinessId || '',
        instagramAccessToken: college.instagramAccessToken || '',
        socialLinks: college.socialLinks || [],
        coursesOffered: college.coursesOffered || [],
        accreditation: college.accreditation || '',
        establishedYear: college.establishedYear,
        campusSize: college.campusSize || '',
        facilities: college.facilities || [],
        principalName: college.principalName || '',
        principalContact: college.principalContact || '',
        admissionContactEmail: college.admissionContactEmail || '',
        admissionContactPhone: college.admissionContactPhone || '',
        faxNumber: college.faxNumber || '',
        motto: college.motto || '',
      });
    }
  }, [college]);

  const handleSubmit = async (values: CreateCollegeRequest | UpdateCollegeRequest) => {
    try {
      if (isEditing && id) {
        await updateMutation.mutateAsync({ 
          id, 
          data: values as UpdateCollegeRequest 
        });
      } else {
        await createMutation.mutateAsync(values as CreateCollegeRequest);
      }
      
      navigate('/schools');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    navigate('/schools');
  };

  const error = createMutation.error || updateMutation.error;

  const breadcrumbItems = [
    { title: 'College Management', href: '/schools' },
    { title: isEditing ? 'Edit College' : 'Add College', href: '#' },
  ].map((item, index) => (
    <Anchor key={index} href={item.href} onClick={(e) => {
      e.preventDefault();
      if (item.href !== '#') navigate(item.href);
    }}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container size="lg" py="xl">
      <LoadingOverlay visible={isLoading} />
      
      <Stack gap="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

        {/* Header */}
        <Group justify="space-between">
          <Title order={1}>{isEditing ? 'Edit College' : 'Add New College'}</Title>
          <Button 
            variant="subtle" 
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleCancel}
          >
            Back to Colleges
          </Button>
        </Group>

        {/* Error Alert */}
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red">
            {error.message || 'An error occurred while saving the college'}
          </Alert>
        )}

        {/* Form */}
        <Paper p="xl" radius="md" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <Stack gap="xl">
              {/* Basic Information */}
              <div>
                <Title order={3} mb="md">Basic Information</Title>
                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="College Name"
                      placeholder="Enter college name"
                      required
                      name="name"
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>
                  
                  <Grid.Col span={12}>
                    <Textarea
                      label="Description"
                      placeholder="Enter college description"
                      required
                      minRows={4}
                      name="description"
                      {...form.getInputProps('description')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Logo URL"
                      placeholder="https://example.com/logo.png"
                      name="logoUrl"
                      {...form.getInputProps('logoUrl')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Website URL"
                      placeholder="https://www.college.edu"
                      name="websiteUrl"
                      {...form.getInputProps('websiteUrl')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <NumberInput
                      label="Established Year"
                      placeholder="1990"
                      min={1800}
                      max={new Date().getFullYear()}
                      name="establishedYear"
                      {...form.getInputProps('establishedYear')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Campus Size"
                      placeholder="e.g., 100 acres"
                      name="campusSize"
                      {...form.getInputProps('campusSize')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Motto"
                      placeholder="College motto"
                      name="motto"
                      {...form.getInputProps('motto')}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <Divider />

              {/* Contact Information */}
              <div>
                <Title order={3} mb="md">Contact Information</Title>
                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Email"
                      placeholder="contact@college.edu"
                      required
                      type="email"
                      name="email"
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Phone Number"
                      placeholder="+1 (555) 123-4567"
                      required
                      name="phoneNumber"
                      {...form.getInputProps('phoneNumber')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Fax Number"
                      placeholder="+1 (555) 123-4568"
                      name="faxNumber"
                      {...form.getInputProps('faxNumber')}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              {/* Address */}
              <div>
                <Title order={4} mb="md">Address</Title>
                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Address Line 1"
                      placeholder="Street address"
                      required
                      name="addressLine1"
                      {...form.getInputProps('addressLine1')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Address Line 2"
                      placeholder="Apartment, suite, etc. (optional)"
                      name="addressLine2"
                      {...form.getInputProps('addressLine2')}
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <TextInput
                      label="City"
                      placeholder="City"
                      required
                      name="city"
                      {...form.getInputProps('city')}
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <TextInput
                      label="State/Province"
                      placeholder="State or Province"
                      name="state"
                      {...form.getInputProps('state')}
                    />
                  </Grid.Col>

                  <Grid.Col span={4}>
                    <TextInput
                      label="Country"
                      placeholder="Country"
                      required
                      name="country"
                      {...form.getInputProps('country')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Postal Code"
                      placeholder="12345"
                      required
                      name="postalCode"
                      {...form.getInputProps('postalCode')}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              {/* Administrative Contacts */}
              <div>
                <Title order={4} mb="md">Administrative Contacts</Title>
                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Principal Name"
                      placeholder="Dr. John Smith"
                      name="principalName"
                      {...form.getInputProps('principalName')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Principal Contact"
                      placeholder="+1 (555) 123-4567"
                      name="principalContact"
                      {...form.getInputProps('principalContact')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Admission Contact Email"
                      placeholder="admissions@college.edu"
                      type="email"
                      name="admissionContactEmail"
                      {...form.getInputProps('admissionContactEmail')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Admission Contact Phone"
                      placeholder="+1 (555) 123-4567"
                      name="admissionContactPhone"
                      {...form.getInputProps('admissionContactPhone')}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <Divider />

              {/* Academic Information */}
              <div>
                <Title order={3} mb="md">Academic Information</Title>
                <Grid>
                  <Grid.Col span={12}>
                    <TagsInput
                      label="Courses Offered"
                      placeholder="Add courses (press Enter to add)"
                      name="coursesOffered"
                      {...form.getInputProps('coursesOffered')}
                    />
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <TextInput
                      label="Accreditation"
                      placeholder="Accrediting body"
                      name="accreditation"
                      {...form.getInputProps('accreditation')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TagsInput
                      label="Facilities"
                      placeholder="Add facilities (press Enter to add)"
                      name="facilities"
                      {...form.getInputProps('facilities')}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              <Divider />

              {/* Social Media & Integration */}
              <div>
                <Title order={3} mb="md">Social Media & Integration</Title>
                <Grid>
                  <Grid.Col span={12}>
                    <TagsInput
                      label="Social Links"
                      placeholder="Add social media URLs (press Enter to add)"
                      name="socialLinks"
                      {...form.getInputProps('socialLinks')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Instagram Business ID"
                      placeholder="Instagram Business Account ID"
                      name="instagramBusinessId"
                      {...form.getInputProps('instagramBusinessId')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      label="Instagram Access Token"
                      placeholder="Instagram API Access Token"
                      minRows={4}
                      name="instagramAccessToken"
                      {...form.getInputProps('instagramAccessToken')}
                    />
                  </Grid.Col>
                </Grid>
              </div>

              {/* Action Buttons */}
              <Group justify="flex-end" pt="md">
                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  loading={isLoading}
                  leftSection={<IconDeviceFloppy size={16} />}
                >
                  {isEditing ? 'Update College' : 'Create College'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
};

export default CollegeFormPage; 