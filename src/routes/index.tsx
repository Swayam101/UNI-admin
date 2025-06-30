import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/common';
import { LoginPage, DashboardPage, CollegeFormPage, NotFoundPage } from '../pages';
import { DashboardLayout } from '../layouts';
import { 
  SchoolManagement, 
  UserManagement, 
  PostManagement, 
  Analytics, 
  EmailCampaigns, 
  PaymentManagement, 
  TestimonialManagement,
  ContactManagement 
} from '../components/features';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route path="/*" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/schools" element={<SchoolManagement />} />
      <Route path="/schools/add" element={<CollegeFormPage />} />
      <Route path="/schools/edit/:id" element={<CollegeFormPage />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/posts" element={<PostManagement />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/emails" element={<EmailCampaigns />} />
      <Route path="/payments" element={<PaymentManagement />} />
      <Route path="/testimonials" element={<TestimonialManagement />} />
      <Route path="/contacts" element={<ContactManagement />} />
      {/* Catch-all 404 for dashboard routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}; 