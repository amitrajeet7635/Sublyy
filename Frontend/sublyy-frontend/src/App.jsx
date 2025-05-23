import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/SignUpLogin";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddSubscription from "./pages/Dashboard/AddSubscription";
import ProtectedRoute from "./routes/ProtectedRoutes";
import LandingPage from "./pages/Landing/LandingPage";
import Layout from "./components/ui/Layout";
import Settings from "./pages/Settings/Settings";

// Placeholder pages for new routes
const Reports = () => <div>Reports Page</div>;
const Analytics = () => <div>Analytics Page</div>;

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add-subscription" element={<AddSubscription />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
