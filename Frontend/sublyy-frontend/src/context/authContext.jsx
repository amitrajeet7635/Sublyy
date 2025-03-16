import { createContext, useState, useEffect } from "react";
import { login, logout, refreshToken } from "../services/api";

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

    useEffect(() => {
        const fetchRefreshToken = async () => {
            try {
                const { data } = await refreshToken();
                setAccessToken(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
            } catch (error) {
                console.error("Failed to refresh token:", error);
                handleLogout();
            }
        };

        if (accessToken) {
            fetchRefreshToken();
        }
    }, []);

    const handleLogin = async ({ user, accessToken }) => {
        setUser(user);
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user)); // Ensure valid JSON
    };

    const handleLogout = async () => {
        try {
            await logout();
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
