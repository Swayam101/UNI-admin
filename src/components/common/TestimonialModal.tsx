import { useState } from 'react';
import {
  Modal,
  Stack,
  Text,
  Textarea,
  Button,
  Group,
  Avatar,
  Paper,
  Alert,
} from '@mantine/core';
import { IconCheck, IconMessageDots, IconAlertTriangle } from '@tabler/icons-react';
import { useCreateTestimonial } from '../../hooks/useTestimonial';
import type { User } from '../../types/user';
import type { ApiError } from '../../types/auth';

interface TestimonialModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
}

const TestimonialModal = ({ opened, onClose, user }: TestimonialModalProps) => {
  const [testimonialMessage, setTestimonialMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const createTestimonialMutation = useCreateTestimonial();

  const handleSubmit = async () => {
    if (!user || !testimonialMessage.trim()) return;

    try {
      await createTestimonialMutation.mutateAsync({
        user: user._id!,
        message: testimonialMessage.trim(),
      });
      
      setShowSuccess(true);
      setShowError(false);
      
      // Clear form
      setTestimonialMessage('');
      
      // Close modal after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error creating testimonial:', error);
      const apiError = error as ApiError;
      setShowError(true);
      setErrorMessage(apiError.message || 'Failed to create testimonial. Please try again.');
      setShowSuccess(false);
    }
  };

  const handleClose = () => {
    if (!createTestimonialMutation.isPending) {
      setTestimonialMessage('');
      setShowSuccess(false);
      setShowError(false);
      setErrorMessage('');
      onClose();
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Create Testimonial"
      size="md"
      centered
    >
      {user && (
        <Stack gap="lg">
          {showSuccess && (
            <Alert icon={<IconCheck size={16} />} color="green" title="Success!">
              Testimonial created successfully for {user.firstName} {user.lastName}
            </Alert>
          )}

          {showError && (
            <Alert icon={<IconAlertTriangle size={16} />} color="red" title="Error">
              {errorMessage}
            </Alert>
          )}

          {/* User Info Header */}
          <Paper p="md" bg="gray.0" radius="md">
            <Group>
              <Avatar size={50} radius="xl" src={user.profilePicture} color="blue">
                {!user.profilePicture && getInitials(user.firstName, user.lastName)}
              </Avatar>
              <div>
                <Text fw={600} size="lg">
                  {user.firstName} {user.lastName}
                </Text>
                <Text c="dimmed" size="sm">
                  {user.email}
                </Text>
                {user.studying && (
                  <Text c="dimmed" size="xs">
                    {user.studying} • {user.collegeGraduationYear || 'N/A'}
                  </Text>
                )}
              </div>
            </Group>
          </Paper>

          {/* Testimonial Message */}
          <div>
            <Text fw={500} mb="xs">
              Testimonial Message <Text span c="red">*</Text>
            </Text>
            <Textarea
              value={testimonialMessage}
              onChange={(event) => setTestimonialMessage(event.currentTarget.value)}
              placeholder="Write a testimonial about this user's profile, engagement, or overall contribution to the platform..."
              minRows={4}
              maxRows={8}
              disabled={createTestimonialMutation.isPending}
              style={{ fontSize: '14px' }}
            />
            <Text size="xs" c="dimmed" mt="xs">
              {testimonialMessage.length}/500 characters
            </Text>
          </div>

          {/* Action Buttons */}
          <Group justify="flex-end" gap="sm">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={createTestimonialMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              leftSection={<IconMessageDots size={16} />}
              onClick={handleSubmit}
              loading={createTestimonialMutation.isPending}
              disabled={!testimonialMessage.trim() || showSuccess}
            >
              Create Testimonial
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};

export default TestimonialModal; 