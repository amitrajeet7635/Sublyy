import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
    const context = useContext(AuthContext);
    const accessToken = context?.accessToken;

    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
