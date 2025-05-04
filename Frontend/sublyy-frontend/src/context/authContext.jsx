import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, refreshToken, fetchUser } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Initialize auth state from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("accessToken");
        
        if (storedToken) {
            setAccessToken(storedToken);
            if (storedUser && storedUser !== "undefined") {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error("Failed to parse user from localStorage:", error);
                    localStorage.removeItem("user");
                }
            }
        }
        setLoading(false);
    }, []);

    // Token refresh mechanism
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
                // Don't call handleLogout here to prevent redirect loops
            } finally {
                setLoading(false);
            }
        };

        if (accessToken && !user) {
            // We have a token but no user, try to fetch user info
            fetchUser()
                .then(({ user: userData }) => {
                    if (userData) {
                        setUser(userData);
                        localStorage.setItem("user", JSON.stringify(userData));
                    } else {
                        fetchRefreshToken();
                    }
                })
                .catch(() => fetchRefreshToken())
                .finally(() => setLoading(false));
        } else if (!accessToken) {
            fetchRefreshToken();
        } else {
            setLoading(false);
        }
    }, [accessToken, user]);

    // Handle Login 
    const handleLogin = ({ user, accessToken }) => {
        setUser(user);
        setAccessToken(accessToken || "");
        localStorage.setItem("user", JSON.stringify(user));
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setAccessToken("");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-pulse text-indigo-600 text-xl">Loading...</div>
        </div>;
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            accessToken, 
            handleLogin, 
            handleLogout,
            isAuthenticated: !!user && !!accessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};
