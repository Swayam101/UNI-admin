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
│   ├── CollegeForm.tsx           # Simplified college form component
│   └── SchoolManagement.tsx      # College management page
│   └── school-management/
│       └── CollegeTable.tsx      # College table component
└── docs/
    └── college-api-integration.md # This documentation
```

## 🔧 API Endpoints

Based on the provided Postman collection, the following endpoints are implemented:

### 1. Create College
- **Method:** `POST`
- **Endpoint:** `/colleges/createCollege`
- **Description:** Creates a new college with Instagram integration details
- **Hook:** `useCreateCollege()`

### 2. Get All Colleges
- **Method:** `GET`
- **Endpoint:** `/colleges/getAllColleges`
- **Description:** Retrieves all colleges with pagination support
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

The college data includes **only** the following 3 required fields:

### Required Fields
- `name` (string, required) - College name
- `instagramBusinessId` (string, required) - Instagram Business account ID
- `instagramAccessToken` (string, required) - Instagram API access token

### System Fields
- `_id` (string, optional) - Database identifier
- `createdAt` (string, optional) - Creation timestamp
- `updatedAt` (string, optional) - Last update timestamp

## 🎯 Simplified Structure

This college management system is specifically designed for Instagram integration and focuses on the essential fields needed for social media content management.

### TypeScript Interfaces

```typescript
export interface College {
  _id?: string;
  name: string;
  instagramBusinessId: string;
  instagramAccessToken: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCollegeRequest {
  name: string;
  instagramBusinessId: string;
  instagramAccessToken: string;
}

export interface UpdateCollegeRequest {
  name?: string;
  instagramBusinessId?: string;
  instagramAccessToken?: string;
}
```

## 🔐 Security Considerations

- Instagram access tokens are treated as sensitive data
- Tokens are masked in the UI (password field type)
- API responses should exclude sensitive token data where appropriate

## 📱 UI Components

### College Form
- Simple 3-field form
- Real-time validation
- Instagram branding and icons
- Password masking for access token

### College Table
- Displays college name and Instagram Business ID
- Shows integration status (Configured/Incomplete)
- Creation date tracking
- Edit and delete actions

## 🚀 Future Enhancements

- Token expiration handling
- Instagram API connectivity testing
- Bulk import/export functionality
- Token refresh automation

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
  
  const handleCreate = async (collegeData: CreateCollegeRequest) => {
    try {
      await createMutation.mutateAsync({
        name: 'Example College',
        instagramBusinessId: '123456789',
        instagramAccessToken: 'EAAG...'
      });
      console.log('College created successfully!');
    } catch (error) {
      console.error('Error creating college:', error);
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

## 🛠️ Features

### 1. Simplified Form
- **3-field form** for essential Instagram integration data
- **Real-time validation** for required fields
- **Password masking** for access tokens
- **Instagram branding** with icons

### 2. Streamlined Table
- **Search functionality** across name and Instagram Business ID
- **Integration status** indicators
- **Creation date** tracking
- **Edit and delete** actions with confirmations

### 3. API Integration
- **Type-safe** TypeScript interfaces
- **Modular service** functions
- **React Query** for state management
- **Error boundaries** and handling

## 🎨 UI Features

### Security
- Access tokens are masked in the UI
- Password field type for sensitive data
- Confirmation dialogs for destructive actions

### User Experience
- Loading states with skeletons
- Real-time form validation
- Instagram-themed icons and colors
- Responsive design for mobile and desktop
## 🔧 Development Notes

### Adding New Fields
If you need to add more fields in the future:
1. Update the `College` interface in `types/college.ts`
2. Add fields to the form in `CollegeForm.tsx`
3. Update table columns in `CollegeTable.tsx`
4. Update validation rules as needed

### Environment Variables
Ensure your API base URL is configured:

```bash
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

This simplified structure provides a focused, secure foundation for Instagram-integrated college management. 