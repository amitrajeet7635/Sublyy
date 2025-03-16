import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
    const { accessToken } = useContext(AuthContext);

    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
