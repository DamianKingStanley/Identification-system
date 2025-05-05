import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthForms.css";

const LoginForm: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    contactEmail: "",
    password: "",
    secretKey: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSecretKey, setShowSecretKey] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.contactEmail) {
      newErrors.contactEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(credentials.contactEmail)) {
      newErrors.contactEmail = "Email is invalid";
    }
    if (!credentials.password) {
      newErrors.password = "Password is required";
    }
    if (!credentials.secretKey) {
      newErrors.secretKey = "Secret key is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await login(credentials);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Organization Login</h2>
        <p className="subtitle">Access your organization account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email*</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={credentials.contactEmail}
              onChange={handleChange}
              className={errors.contactEmail ? "error" : ""}
            />
            {errors.contactEmail && (
              <span className="error-text">{errors.contactEmail}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="secretKey">Secret Key*</label>
            <div className="password-input">
              <input
                type={showSecretKey ? "text" : "password"}
                id="secretKey"
                name="secretKey"
                value={credentials.secretKey}
                onChange={handleChange}
                className={errors.secretKey ? "error" : ""}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowSecretKey(!showSecretKey)}
              >
                {showSecretKey ? "Hide" : "Show"}
              </button>
            </div>
            {errors.secretKey && (
              <span className="error-text">{errors.secretKey}</span>
            )}
            <p className="hint-text">
              This is the key you received during registration
            </p>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="link-button">
            Register here
          </button>
        </div>

        <div className="auth-footer">
          Forgot your secret key?{" "}
          <button className="link-button">Contact support</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
