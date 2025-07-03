import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Title,
  Paper,
  TextInput,
  Button,
  Group,
  Stack,
  Alert,
  LoadingOverlay,
  Breadcrumbs,
  Anchor,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconArrowLeft, IconDeviceFloppy, IconBrandInstagram } from '@tabler/icons-react';
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
      instagramBusinessId: '',
      instagramAccessToken: '',
    },
    validate: {
      name: (value: string | undefined) => (!value?.trim() ? 'College name is required' : null),
      instagramBusinessId: (value: string | undefined) => (!value?.trim() ? 'Instagram Business ID is required' : null),
      instagramAccessToken: (value: string | undefined) => (!value?.trim() ? 'Instagram Access Token is required' : null),
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  // Reset form when college data loads
  useEffect(() => {
    if (college) {
      form.setValues({
        name: college.name || '',
        instagramBusinessId: college.instagramBusinessId || '',
        instagramAccessToken: college.instagramAccessToken || '',
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
    <Container size="md" py="xl">
      <LoadingOverlay visible={isLoading} />
      
      <Stack gap="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>

        {/* Header */}
        <Group justify="space-between">
          <Group gap="sm">
            <IconBrandInstagram size={32} color="#E4405F" />
          <Title order={1}>{isEditing ? 'Edit College' : 'Add New College'}</Title>
          </Group>
          <Button 
            variant="subtle" 
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleCancel}
          >
            Back to Colleges
          </Button>
        </Group>

        <Text size="sm" c="dimmed">
          Set up Instagram integration for the college by providing the required credentials below.
        </Text>

        {/* Error Alert */}
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red">
            {error.message || 'An error occurred while saving the college'}
          </Alert>
        )}

        {/* Form */}
        <Paper p="xl" radius="md" withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <Stack gap="lg">
              <Title order={3} mb="sm">College Information</Title>

                    <TextInput
                      label="College Name"
                      placeholder="Enter college name"
                description="The official name of the college"
                      required
                      {...form.getInputProps('name')}
                    />

                    <TextInput
                      label="Instagram Business ID"
                placeholder="Enter Instagram Business ID"
                description="The unique identifier for the Instagram Business account"
                required
                      {...form.getInputProps('instagramBusinessId')}
                    />

              <TextInput
                      label="Instagram Access Token"
                placeholder="Enter Instagram Access Token"
                description="The access token for Instagram Business API integration"
                type="password"
                required
                      {...form.getInputProps('instagramAccessToken')}
                    />

              {/* Submit Actions */}
              <Group justify="flex-end" mt="xl">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isLoading}
                >
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