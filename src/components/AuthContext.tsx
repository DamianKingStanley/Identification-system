import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  organization: unknown;
  loading: boolean;
  error: string | null;
  register: (orgData: RegisterData) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  type: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface LoginCredentials {
  contactEmail: string;
  password: string;
  secretKey: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [organization, setOrganization] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/organization/check",
          {
            withCredentials: true,
          }
        );
        if (res.data.organization) {
          setIsAuthenticated(true);
          setOrganization(res.data.organization);
        }
      } catch {
        setIsAuthenticated(false);
        setOrganization(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (orgData: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...data } = orgData;
      const res = await axios.post(
        "http://localhost:5000/api/organization/register",
        data
      );

      // Show success message and redirect to login
      alert(
        `Registration successful! Your secret key is: ${res.data.secretKey}\nPlease save this key as it won't be shown again.`
      );
      navigate("/login");
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/organization/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      setIsAuthenticated(true);
      setOrganization(res.data.organization);
      navigate("/dashboard");
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/organization/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setOrganization(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        organization,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
