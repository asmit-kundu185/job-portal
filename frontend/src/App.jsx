import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterJobs from "./pages/RecruiterJobs";
import CompanyForm from "./pages/CompanyForm";
import JobForm from "./pages/JobForm";
import Applicants from "./pages/Applicants";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={
            <ProtectedRoute roles={["student"]}><Profile /></ProtectedRoute>
          } />

          <Route path="/applications" element={
            <ProtectedRoute roles={["student"]}><Applications /></ProtectedRoute>
          } />

          <Route path="/recruiter" element={
            <ProtectedRoute roles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>
          } />

          <Route path="/recruiter/jobs" element={
            <ProtectedRoute roles={["recruiter"]}><RecruiterJobs /></ProtectedRoute>
          } />

          <Route path="/recruiter/jobs/new" element={
            <ProtectedRoute roles={["recruiter"]}><JobForm /></ProtectedRoute>
          } />

          <Route path="/recruiter/company" element={
            <ProtectedRoute roles={["recruiter"]}><CompanyForm /></ProtectedRoute>
          } />

          <Route path="/recruiter/applicants/:jobId" element={
            <ProtectedRoute roles={["recruiter"]}><Applicants /></ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}
