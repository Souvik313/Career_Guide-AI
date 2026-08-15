import {createContext, useContext, useState, useEffect} from "react";
import authService from "../services/authService.js";
import {getUserProfile} from "../services/userService.js";

const AuthContext = createContext();
const TOKEN_KEY = "careercompass_access_token";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshUser = async () => {

    try {

        const currentUser = await getUserProfile();

        setUser(currentUser);
        setIsAuthenticated(true);
        setError(null);

    } catch (err) {
        console.error("Error fetching current user:", err);
        localStorage.removeItem(TOKEN_KEY);

        setUser(null);

        setIsAuthenticated(false);

    } finally {

        setLoading(false);

    }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    }

    useEffect(() => {

        const token =
            localStorage.getItem(TOKEN_KEY);

        if (token) {

            refreshUser();

        } else {

            setLoading(false);

        }

    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.login(credentials);

            localStorage.setItem(
            TOKEN_KEY,
            response.access_token
            );

            await refreshUser();

            return response;
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.register(userData);

            return response;
        } catch (err) {
            setError(
            err.response?.data?.detail || "Registration failed"
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();

        setUser(null);

        setIsAuthenticated(false);

        setError(null);
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            isAuthenticated,
            loading,
            error,
            login,
            register,
            logout,
            refreshUser,
            updateUser,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
};
