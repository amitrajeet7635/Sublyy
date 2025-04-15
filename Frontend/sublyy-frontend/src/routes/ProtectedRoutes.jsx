import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
    const { isAuthenticated, accessToken } = useContext(AuthContext);

    if (isAuthenticated || accessToken) {
        return <Outlet />;
    }
    
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
