# College Management API Integration

This document outlines the API integration structure for college management features in the INCOMING-CLASS admin dashboard.

## 📁 File Structure

```
src/
├── types/
│   └── college.ts                 # TypeScript interfaces for college data
├── services/
│   └── collegeService.ts         # API service functions
├── hooks/
│   └── useCollege.ts             # React Query hooks for college operations
├── components/
│   ├── CollegeForm.tsx           # Comprehensive college form component
│   └── SchoolManagement.tsx      # Updated college management page
└── docs/
    └── college-api-integration.md # This documentation
```

## 🔧 API Endpoints

Based on the provided Postman collection, the following endpoints are implemented:

### 1. Create College
- **Method:** `POST`
- **Endpoint:** `/colleges/createCollege`
- **Description:** Creates a new college with comprehensive details
- **Hook:** `useCreateCollege()`

### 2. Get All Colleges
- **Method:** `GET`
- **Endpoint:** `/colleges/getAllColleges`
- **Description:** Retrieves all colleges
- **Hook:** `useColleges()`

### 3. Get College by ID
- **Method:** `GET`
- **Endpoint:** `/colleges/getCollegeById/:id`
- **Description:** Retrieves specific college details
- **Hook:** `useCollege(id)`

### 4. Update College
- **Method:** `PUT`
- **Endpoint:** `/colleges/updateCollegeById/:id`
- **Description:** Updates college information
- **Hook:** `useUpdateCollege()`

### 5. Delete College
- **Method:** `DELETE`
- **Endpoint:** `/colleges/deleteCollegeById/:id`
- **Description:** Deletes a college
- **Hook:** `useDeleteCollege()`

## 📋 Data Schema

The college data includes the following fields:

### Basic Information
- `name` (required) - College name
- `description` (required) - College description
- `logoUrl` - Logo image URL
- `websiteUrl` - Official website
- `establishedYear` - Year founded
- `campusSize` - Campus size description
- `motto` - College motto

### Contact Information
- `email` (required) - Primary contact email
- `phoneNumber` (required) - Primary phone number
- `faxNumber` - Fax number
- `addressLine1` (required) - Street address
- `addressLine2` - Additional address info
- `city` (required) - City
- `state` - State/Province
- `country` (required) - Country
- `postalCode` (required) - Postal code

### Administrative Contacts
- `principalName` - Principal/President name
- `principalContact` - Principal contact number
- `admissionContactEmail` - Admissions email
- `admissionContactPhone` - Admissions phone

### Academic Information
- `coursesOffered` - Array of courses
- `accreditation` - Accrediting body
- `facilities` - Array of facilities

### Social Media Integration
- `socialLinks` - Array of social media URLs
- `instagramBusinessId` - Instagram Business Account ID
- `instagramAccessToken` - Instagram API access token

## 🎯 Usage Examples

### 1. Using the College Management Component

```tsx
import SchoolManagement from '../components/SchoolManagement';

// The component handles all CRUD operations internally
<SchoolManagement />
```

### 2. Using Hooks Directly

```tsx
import { useColleges, useCreateCollege, useUpdateCollege, useDeleteCollege } from '../hooks/useCollege';

function MyComponent() {
  // Get all colleges
  const { data: colleges, isLoading, error } = useColleges();
  
  // Create college mutation
  const createMutation = useCreateCollege();
  
  const handleCreate = async (collegeData) => {
    try {
      await createMutation.mutateAsync(collegeData);
      console.log('College created successfully!');
    } catch (error) {
      console.error('Error creating college:', error);
    }
  };
  
  // Update college mutation
  const updateMutation = useUpdateCollege();
  
  const handleUpdate = async (id, updates) => {
    try {
      await updateMutation.mutateAsync({ id, data: updates });
      console.log('College updated successfully!');
    } catch (error) {
      console.error('Error updating college:', error);
    }
  };
  
  // Delete college mutation
  const deleteMutation = useDeleteCollege();
  
  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      console.log('College deleted successfully!');
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };
  
  return (
    // Your component JSX
  );
}
```

### 3. Using the College Form Component

```tsx
import CollegeForm from '../components/CollegeForm';

function MyComponent() {
  const [formOpened, setFormOpened] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  
  const handleSuccess = () => {
    console.log('Form submitted successfully!');
    // Refresh data or show success message
  };
  
  return (
    <>
      <Button onClick={() => setFormOpened(true)}>
        Add College
      </Button>
      
      <CollegeForm
        opened={formOpened}
        onClose={() => setFormOpened(false)}
        college={selectedCollege} // null for create, college object for edit
        onSuccess={handleSuccess}
      />
    </>
  );
}
```

## 🔄 State Management

The implementation uses TanStack Query (React Query) for:

- **Automatic caching** - Reduces unnecessary API calls
- **Background refetching** - Keeps data fresh
- **Optimistic updates** - Immediate UI feedback
- **Error handling** - Built-in error states
- **Loading states** - Built-in loading indicators

### Query Keys Structure

```typescript
COLLEGE_QUERY_KEYS = {
  all: ['colleges'],
  lists: ['colleges', 'list'],
  list: (filters) => ['colleges', 'list', { filters }],
  details: ['colleges', 'detail'],
  detail: (id) => ['colleges', 'detail', id],
}
```

## 🛠️ Features

### 1. Comprehensive Form
- **Tabbed interface** for organized data entry
- **Validation** for required fields
- **Real-time form state** management
- **Error handling** with user feedback

### 2. Advanced Table
- **Search functionality** across multiple fields
- **Real-time data** from API
- **Loading states** with skeletons
- **Error handling** with retry options
- **Instagram integration status** display

### 3. API Integration
- **Type-safe** TypeScript interfaces
- **Modular service** functions
- **React Query** for state management
- **Error boundaries** and handling
- **Optimistic updates** for better UX

## 🎨 UI Features

### Loading States
- Skeleton loaders for tables and forms
- Loading overlays for forms
- Button loading states for actions

### Error Handling
- Alert components for API errors
- Retry functionality
- Form validation errors
- Network error recovery

### Search & Filter
- Real-time search across college name, city, and country
- Instant filtering without API calls
- Empty state messages

## 📝 Environment Setup

Ensure your environment variables are set:

```bash
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

The API client automatically handles:
- Authentication headers
- Request/response interceptors
- Token management
- Error transformation

## 🚀 Best Practices

1. **Always handle loading states** for better UX
2. **Use TypeScript interfaces** for type safety
3. **Implement proper error handling** with user feedback
4. **Leverage React Query caching** for performance
5. **Validate forms** before submission
6. **Use optimistic updates** where appropriate
7. **Implement search/filter** for large datasets

## 🔧 Customization

### Adding New Fields
1. Update the `College` interface in `types/college.ts`
2. Add fields to the form in `CollegeForm.tsx`
3. Update table columns in `SchoolManagement.tsx`

### Custom Validation
Add validation rules in the form component:

```typescript
validate: {
  email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  // Add more validation rules
}
```

### Custom Hooks
Create additional hooks for specific use cases:

```typescript
export const useCollegeStats = () => {
  return useQuery({
    queryKey: ['colleges', 'stats'],
    queryFn: () => collegeService.getStats(),
  });
};
```

This structure provides a robust, scalable foundation for college management with modern React patterns and best practices. 