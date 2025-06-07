import { useState, useEffect, useRef } from 'react';
import {
  Modal,
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
  Tabs,
  Text,
  Divider,
  Progress,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import { useCreateCollege, useUpdateCollege } from '../hooks/useCollege';
import type { College, CreateCollegeRequest, UpdateCollegeRequest } from '../types/college';

interface CollegeFormProps {
  opened: boolean;
  onClose: () => void;
  college?: College | null;
  onSuccess?: () => void;
}

const CollegeForm = ({ opened, onClose, college, onSuccess }: CollegeFormProps) => {
  const [activeTab, setActiveTab] = useState<string | null>('basic');
  const [showAutoAdvanceNotification, setShowAutoAdvanceNotification] = useState(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState(0);
  
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  
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
        // More robust email validation
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

  // Track user interaction
  const handleUserInteraction = () => {
    lastInteractionRef.current = Date.now();
    clearAutoAdvanceTimer();
  };

  // Clear auto-advance timers
  const clearAutoAdvanceTimer = () => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setShowAutoAdvanceNotification(false);
    setAutoAdvanceCountdown(0);
  };

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
      academic: true, // Optional fields, always considered complete
      social: true, // Optional fields, always considered complete
    };
  };

  const tabCompletion = getTabCompletion();
  const completedTabs = Object.values(tabCompletion).filter(Boolean).length;
  const progressPercentage = (completedTabs / 4) * 100;

  // Intelligent auto-advance with user control
  useEffect(() => {
    const completion = getTabCompletion();
    
    const startAutoAdvance = (nextTab: string) => {
      // Clear any existing timers
      clearAutoAdvanceTimer();
      
      // Wait for user to stop interacting (3 seconds of inactivity)
      autoAdvanceTimerRef.current = setTimeout(() => {
        const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
        
        // Only proceed if user hasn't interacted for at least 3 seconds
        if (timeSinceLastInteraction >= 3000) {
          setShowAutoAdvanceNotification(true);
          setAutoAdvanceCountdown(5);
          
          // Start countdown
          let countdown = 5;
          countdownTimerRef.current = setInterval(() => {
            countdown--;
            setAutoAdvanceCountdown(countdown);
            
            if (countdown <= 0) {
              clearAutoAdvanceTimer();
              setActiveTab(nextTab);
            }
          }, 1000);
        }
      }, 3000);
    };

    if (activeTab === 'basic' && completion.basic) {
      startAutoAdvance('contact');
    } else if (activeTab === 'contact' && completion.contact) {
      startAutoAdvance('academic');
    } else {
      clearAutoAdvanceTimer();
    }

    // Clean up on unmount or dependency change
    return () => clearAutoAdvanceTimer();
  }, [form.values, activeTab]);

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
      } else {
        form.reset();
      }
      setActiveTab('basic');
      clearAutoAdvanceTimer();
    }
  }, [college, opened]);

  const handleSubmit = async (values: CreateCollegeRequest | UpdateCollegeRequest) => {
    try {
      // Validate the entire form before submission
      const validation = form.validate();
      if (validation.hasErrors) {
        // Find first tab with errors and switch to it
        const basicErrors = ['name', 'description'].some(field => validation.errors[field]);
        const contactErrors = ['email', 'phoneNumber', 'addressLine1', 'city', 'country', 'postalCode'].some(field => validation.errors[field]);
        
        if (basicErrors) {
          setActiveTab('basic');
        } else if (contactErrors) {
          setActiveTab('contact');
        }
        return;
      }

      if (isEditing && college?._id) {
        await updateMutation.mutateAsync({ 
          id: college._id, 
          data: values as UpdateCollegeRequest 
        });
      } else {
        await createMutation.mutateAsync(values as CreateCollegeRequest);
      }
      
      handleClose();
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    form.reset();
    setActiveTab('basic');
    clearAutoAdvanceTimer();
    onClose();
  };

  const error = createMutation.error || updateMutation.error;

  // Check if current tab has errors
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
      title={
        <Stack gap="xs">
          <Text size="lg" fw={600}>
            {isEditing ? 'Edit College' : 'Add New College'}
          </Text>
          <Progress 
            value={progressPercentage} 
            size="sm" 
            color={progressPercentage === 100 ? 'green' : 'blue'}
          />
        </Stack>
      }
      size="xl"
      overlayProps={{ blur: 3 }}
    >
      <LoadingOverlay visible={isLoading} />
      
      {/* Auto-advance notification */}
      {showAutoAdvanceNotification && (
        <Alert 
          color="blue" 
          mb="md"
          withCloseButton
          onClose={clearAutoAdvanceTimer}
          closeButtonLabel="Cancel auto-advance"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">
              Moving to next section in {autoAdvanceCountdown} seconds...
            </Text>
            <Button 
              size="xs" 
              variant="outline" 
              onClick={clearAutoAdvanceTimer}
              leftSection={<IconX size={12} />}
            >
              Stay here
            </Button>
          </Group>
        </Alert>
      )}
      
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
          {error.message || 'An error occurred while saving the college'}
        </Alert>
      )}

      <form 
        onSubmit={form.onSubmit(handleSubmit)}
        onFocus={handleUserInteraction}
        onChange={handleUserInteraction}
        onKeyDown={handleUserInteraction}
        noValidate
      >
        <Tabs value={activeTab} onChange={(value) => {
          setActiveTab(value);
          clearAutoAdvanceTimer();
          handleUserInteraction();
        }}>
          <Tabs.List>
            <Tabs.Tab 
              value="basic"
              color={tabCompletion.basic ? 'green' : getTabErrors('basic') ? 'red' : 'blue'}
              rightSection={tabCompletion.basic ? <IconCheck size={14} /> : null}
            >
              Basic Info
            </Tabs.Tab>
            <Tabs.Tab 
              value="contact"
              color={tabCompletion.contact ? 'green' : getTabErrors('contact') ? 'red' : 'blue'}
              rightSection={tabCompletion.contact ? <IconCheck size={14} /> : null}
            >
              Contact Details
            </Tabs.Tab>
            <Tabs.Tab 
              value="academic"
              color={tabCompletion.academic ? 'green' : 'blue'}
              rightSection={tabCompletion.academic ? <IconCheck size={14} /> : null}
            >
              Academic Info
            </Tabs.Tab>
            <Tabs.Tab 
              value="social"
              color={tabCompletion.social ? 'green' : 'blue'}
              rightSection={tabCompletion.social ? <IconCheck size={14} /> : null}
            >
              Social & Integration
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basic" pt="md">
            <Stack gap="md">
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
                    minRows={3}
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
              
              {tabCompletion.basic && !showAutoAdvanceNotification && (
                <Alert color="green" icon={<IconCheck size={16} />}>
                  Basic information completed! Continue filling optional fields or move to the next section.
                </Alert>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="contact" pt="md">
            <Stack gap="md">
              <Text size="sm" fw={500} c="dimmed">Contact Information</Text>
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

              <Divider label="Address" labelPosition="left" />
              
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

              <Divider label="Administrative Contacts" labelPosition="left" />
              
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

              {tabCompletion.contact && !showAutoAdvanceNotification && (
                <Alert color="green" icon={<IconCheck size={16} />}>
                  Contact information completed! Continue filling optional fields or move to the next section.
                </Alert>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="academic" pt="md">
            <Stack gap="md">
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
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="social" pt="md">
            <Stack gap="md">
              <Text size="sm" fw={500} c="dimmed">Social Media & Integration</Text>
              
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
                    minRows={3}
                    name="instagramAccessToken"
                    {...form.getInputProps('instagramAccessToken')}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        <Group justify="space-between" mt="xl">
          <Group>
            <Button 
              variant="outline" 
              onClick={() => {
                const tabs = ['basic', 'contact', 'academic', 'social'];
                const currentIndex = tabs.indexOf(activeTab || 'basic');
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1]);
                  clearAutoAdvanceTimer();
                }
              }}
              disabled={activeTab === 'basic'}
            >
              Previous
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => {
                const tabs = ['basic', 'contact', 'academic', 'social'];
                const currentIndex = tabs.indexOf(activeTab || 'basic');
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1]);
                  clearAutoAdvanceTimer();
                }
              }}
              disabled={activeTab === 'social'}
            >
              Next
            </Button>
          </Group>

          <Group>
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              {isEditing ? 'Update College' : 'Create College'}
            </Button>
          </Group>
        </Group>
      </form>
    </Modal>
  );
};

export default CollegeForm; 