import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, refreshToken, fetchUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser || storedUser === "undefined") {
            return null;
        }
        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            localStorage.removeItem("user");
            return null;
        }
    });

    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem("accessToken") || "";
    });
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = useCallback(({ user, accessToken }) => {
        setUser(user);
        setAccessToken(accessToken || "");
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setAccessToken("");
            setIsAuthenticated(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const checkAuthentication = async () => {
            // If we already have a token, consider the user authenticated
            if (accessToken) {
                setIsAuthenticated(true);
                return;
            }

            // Otherwise try to get a fresh token
            try {
                const { data } = await refreshToken();
                if (data && data.accessToken) {
                    setAccessToken(data.accessToken);
                    localStorage.setItem("accessToken", data.accessToken);
                    setIsAuthenticated(true);
                    
                    // Now fetch user data
                    try {
                        const userData = await fetchUser();
                        if (userData && userData.user) {
                            setUser(userData.user);
                            localStorage.setItem("user", JSON.stringify(userData.user));
                        }
                    } catch (userError) {
                        console.error("Failed to fetch user data:", userError);
                    }
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ 
            user, 
            accessToken, 
            isAuthenticated,
            handleLogin, 
            handleLogout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
