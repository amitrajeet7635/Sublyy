import { createContext, useState, useEffect } from "react";
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
            localStorage.removeItem("user"); // Remove corrupted data
            return null;
        }
    });

    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem("accessToken") || "";
    });

    //  Fetch refreshed token on component mount
    useEffect(() => {
        const fetchRefreshToken = async () => {
            try {
                const { data } = await refreshToken();
                if (data && data.accessToken) {
                    setAccessToken(data.accessToken);
                    localStorage.setItem("accessToken", data.accessToken);
                } else {
                    console.error("No access token returned from refreshToken.");
                    handleLogout();
                }
            } catch (error) {
                console.error("Failed to refresh token:", error);
                handleLogout();
            }
        };

        if (!accessToken) {
            fetchRefreshToken();
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await fetchUser();
                setUser(data.user);
            } catch (error) {
                console.error("Not authenticated, redirecting to login.");
                navigate("/login");  
            }
        };

        checkAuth();
    }, []);

    //  Fetch Google OAuth user when component mounts
    useEffect(() => {
        const fetchGoogleUser = async () => {
            try {
                const { data } = await fetchUser(); // Fetch user from /api/auth/user
                if (data && data.user) {
                    // Set user and accessToken properly
                    handleLogin({ user: data.user, accessToken: data.accessToken || "" });
                }
            } catch (error) {
                console.error("Google OAuth login failed:", error);
            }
        };

        if (!user) {
            fetchGoogleUser(); // Fetch only if user is not already stored
        }
    }, []);

    //  Handle Login for both Email/Password & Google OAuth
    const handleLogin = async ({ user, accessToken }) => {
        setUser(user);
        setAccessToken(accessToken || ""); // Default to empty string if undefined
        localStorage.setItem("user", JSON.stringify(user));
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    };

    // Handle Logout (Clear Normal & Google Session)
    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = "http://localhost:3000/api/auth/logout"; // Redirect to backend logout
        } catch (error) {
            console.error("Logout error:", error);
        }
        setUser(null);
        setAccessToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
