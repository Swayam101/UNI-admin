import { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Group,
  Stack,
  Tabs,
  Alert,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useCreateCollege, useUpdateCollege } from '../../hooks/useCollege';
import type { College, CreateCollegeRequest, UpdateCollegeRequest } from '../../types/college';
import {
  FormProgressHeader,
  BasicInfoTab,
  ContactInfoTab,
  AcademicInfoTab,
  SocialInfoTab,
  useAutoAdvance,
} from './college-form';

interface CollegeFormProps {
  opened: boolean;
  onClose: () => void;
  college?: College | null;
  onSuccess?: () => void;
}

const CollegeForm = ({ opened, onClose, college, onSuccess }: CollegeFormProps) => {
  const [activeTab, setActiveTab] = useState<string | null>('basic');
  
  const createMutation = useCreateCollege();
  const updateMutation = useUpdateCollege();
  
  const isEditing = !!college;
  const isLoading = createMutation.isPending || updateMutation.isPending;

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
        if (!value?.trim()) return null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return null;
      },
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  // Check completion status for each tab
  const getTabCompletion = () => {
    const values = form.values;
    const errors = form.errors;

    const basicRequired = ['name', 'description'];
    const contactRequired = ['email', 'phoneNumber', 'addressLine1', 'city', 'country', 'postalCode'];

    const basicComplete = basicRequired.every(field => 
      values[field as keyof typeof values] && 
      !errors[field]
    );

    const contactComplete = contactRequired.every(field => 
      values[field as keyof typeof values] && 
      !errors[field]
    );

    return {
      basic: basicComplete,
      contact: contactComplete,
      academic: true,
      social: true,
    };
  };

  const tabCompletion = getTabCompletion();

  // Auto-advance hook
  const {
    showAutoAdvanceNotification,
    autoAdvanceCountdown,
    handleUserInteraction,
    clearAutoAdvanceTimer,
    setupAutoAdvance,
  } = useAutoAdvance({ activeTab, tabCompletion });

  // Setup auto-advance when form values change
  useEffect(() => {
    setupAutoAdvance(setActiveTab);
  }, [form.values, activeTab, setupAutoAdvance]);

  // Reset form when college changes
  useEffect(() => {
    if (opened) {
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
          establishedYear: college.establishedYear || undefined,
          campusSize: college.campusSize || '',
          facilities: college.facilities || [],
          principalName: college.principalName || '',
          principalContact: college.principalContact || '',
          admissionContactEmail: college.admissionContactEmail || '',
          admissionContactPhone: college.admissionContactPhone || '',
          faxNumber: college.faxNumber || '',
          motto: college.motto || '',
        });
      } else {
        form.reset();
      }
      setActiveTab('basic');
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
    setActiveTab('basic');
    clearAutoAdvanceTimer();
    onClose();
  };

  const getTabErrors = (tabName: string) => {
    const errors = form.errors;
    switch (tabName) {
      case 'basic':
        return ['name', 'description'].some(field => errors[field]);
      case 'contact':
        return ['email', 'phoneNumber', 'addressLine1', 'city', 'country', 'postalCode'].some(field => errors[field]);
      default:
        return false;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={isEditing ? 'Edit College' : 'Add New College'}
      size="xl"
      centered
    >
      <LoadingOverlay visible={isLoading} />
      
      <Stack gap="md">
        <FormProgressHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCompletion={tabCompletion}
          showAutoAdvanceNotification={showAutoAdvanceNotification}
          autoAdvanceCountdown={autoAdvanceCountdown}
          onCancelAutoAdvance={clearAutoAdvanceTimer}
        />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.Panel value="basic">
              <BasicInfoTab form={form} onUserInteraction={handleUserInteraction} />
            </Tabs.Panel>

            <Tabs.Panel value="contact">
              <ContactInfoTab form={form} onUserInteraction={handleUserInteraction} />
            </Tabs.Panel>

            <Tabs.Panel value="academic">
              <AcademicInfoTab form={form} onUserInteraction={handleUserInteraction} />
            </Tabs.Panel>

            <Tabs.Panel value="social">
              <SocialInfoTab form={form} onUserInteraction={handleUserInteraction} />
            </Tabs.Panel>
          </Tabs>

          {(createMutation.error || updateMutation.error) && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" mt="md">
              {createMutation.error?.message || updateMutation.error?.message || 'An error occurred'}
            </Alert>
          )}

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              loading={isLoading}
                             color={getTabErrors(activeTab || 'basic') ? 'red' : 'blue'}
            >
              {isEditing ? 'Update College' : 'Create College'}
            </Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
};

export default CollegeForm; 