import { useCallback } from "react";
import {
  Table,
  Group,
  Badge,
  ActionIcon,
  Text,
  Avatar,
  Skeleton,
  Tooltip,
} from "@mantine/core";
import {
  IconTrash,
  IconEdit,
  IconBrandInstagram,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { useDeleteCollege } from "../../../hooks/useCollege";
import type { College } from "../../../types/college";

interface CollegeTableProps {
  colleges: College[];
  isLoading: boolean;
  searchQuery: string;
  pageSize: number;
  onEdit: (college: College) => void;
}

export const CollegeTable = ({
  colleges,
  isLoading,
  searchQuery,
  pageSize,
  onEdit,
}: CollegeTableProps) => {
  const deleteMutation = useDeleteCollege();

  // Helper functions
  const getInitials = useCallback((name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const hasInstagramSetup = useCallback((college: College) => {
    return !!(college.instagramBusinessId && college.instagramAccessToken);
  }, []);

  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  }, []);

  // Event handlers
  const handleDeleteCollege = useCallback(
    async (id: string) => {
      if (
        window.confirm(
          "Are you sure you want to delete this college? This action cannot be undone."
        )
      ) {
        try {
          await deleteMutation.mutateAsync(id);
        } catch (error) {
          console.error("Error deleting college:", error);
        }
      }
    },
    [deleteMutation]
  );

  // Skeleton Component
  const TableSkeleton = () => (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>College</Table.Th>
          <Table.Th>Instagram Business ID</Table.Th>
          <Table.Th>Integration Status</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: pageSize }).map((_, index) => (
          <Table.Tr key={index}>
            <Table.Td>
              <Group gap="sm">
                <Skeleton height={40} width={40} circle />
                <Skeleton height={16} width={140} />
              </Group>
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={120} />
            </Table.Td>
            <Table.Td>
              <Skeleton height={20} width={80} radius="sm" />
            </Table.Td>
            <Table.Td>
              <Skeleton height={14} width={80} />
            </Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Skeleton height={28} width={28} circle />
                <Skeleton height={28} width={28} circle />
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  // Render loading skeleton
  if (isLoading) {
    return <TableSkeleton />;
  }

  // Filter colleges based on search
  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.instagramBusinessId
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Table rows
  const rows = filteredColleges.map((college) => (
    <Table.Tr key={college._id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar
            size={40}
            radius="xl"
            color="blue"
            src={college.logoUrl}
            variant="filled"
          >
            {getInitials(college.name)}
          </Avatar>
          <div>
            <Text fw={500}>{college.name}</Text>
            <Text size="xs" c="dimmed">
              @{college.username}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <Text size="sm" ff="monospace">
            {college.instagramBusinessId}
          </Text>
          <Tooltip label="Instagram Business ID">
            <IconBrandInstagram size={14} color="#E4405F" />
          </Tooltip>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          {hasInstagramSetup(college) ? (
            <Badge
              leftSection={<IconEye size={12} />}
              color="green"
              variant="light"
            >
              Configured
            </Badge>
          ) : (
            <Badge
              leftSection={<IconEyeOff size={12} />}
              color="red"
              variant="light"
            >
              Incomplete
            </Badge>
          )}
        </Group>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{formatDate(college.createdAt)}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <Tooltip label="Edit College">
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit(college)}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete College">
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => handleDeleteCollege(college._id!)}
              loading={deleteMutation.isPending}
              disabled={deleteMutation.isPending}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  // Empty state
  if (filteredColleges.length === 0) {
    return (
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>College</Table.Th>
            <Table.Th>Instagram Business ID</Table.Th>
            <Table.Th>Integration Status</Table.Th>
            <Table.Th>Created</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td colSpan={5}>
              <Text ta="center" py="xl" c="dimmed">
                {searchQuery
                  ? "No colleges found matching your search."
                  : "No colleges found. Create your first college to get started."}
              </Text>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    );
  }

  return (
    <Table verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>College</Table.Th>
          <Table.Th>Instagram Business ID</Table.Th>
          <Table.Th>Integration Status</Table.Th>
          <Table.Th>Created</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
