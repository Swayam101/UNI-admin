import { useEffect } from 'react';
import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  LoadingOverlay,
  Title,
  Text,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconBrandInstagram } from '@tabler/icons-react';
import { useCreateCollege, useUpdateCollege } from '../../hooks/useCollege';
import type { College, CreateCollegeRequest, UpdateCollegeRequest } from '../../types/college';

interface CollegeFormProps {
  opened: boolean;
  onClose: () => void;
  college?: College | null;
  onSuccess?: () => void;
}

const CollegeForm = ({ opened, onClose, college, onSuccess }: CollegeFormProps) => {
  const createMutation = useCreateCollege();
  const updateMutation = useUpdateCollege();
  
  const isEditing = !!college;
  const isLoading = createMutation.isPending || updateMutation.isPending;

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

  // Reset form when college changes
  useEffect(() => {
    if (opened) {
      if (college) {
        form.setValues({
          name: college.name || '',
          instagramBusinessId: college.instagramBusinessId || '',
          instagramAccessToken: college.instagramAccessToken || '',
        });
      } else {
        form.reset();
      }
    }
  }, [college, opened]);

  const handleSubmit = async (values: CreateCollegeRequest | UpdateCollegeRequest) => {
    try {
      if (isEditing && college && college._id) {
        await updateMutation.mutateAsync({
          id: college._id,
          data: values as UpdateCollegeRequest,
        });
      } else {
        await createMutation.mutateAsync(values as CreateCollegeRequest);
      }
      
      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error('Error saving college:', error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const hasError = createMutation.isError || updateMutation.isError;
  const error = createMutation.error || updateMutation.error;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="sm">
          <IconBrandInstagram size={24} color="#E4405F" />
          <Title order={3}>
            {isEditing ? 'Edit College' : 'Add New College'}
          </Title>
        </Group>
      }
      size="md"
      centered
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <LoadingOverlay visible={isLoading} />
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
          <Text size="sm" c="dimmed">
            Set up Instagram integration for the college by providing the required credentials.
          </Text>

          {hasError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Error"
              color="red"
              radius="md"
              variant="light"
            >
              {error?.message || 'An error occurred while saving the college. Please try again.'}
            </Alert>
          )}

          <TextInput
            label="College Name"
            placeholder="Enter college name"
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

          <Group justify="flex-end" mt="xl">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={isLoading}
              leftSection={<IconBrandInstagram size={16} />}
            >
              {isEditing ? 'Update College' : 'Create College'}
            </Button>
          </Group>
        </Stack>
        </form>
    </Modal>
  );
};

export default CollegeForm; 