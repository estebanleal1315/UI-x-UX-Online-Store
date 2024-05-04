import React, { useState, useContext } from "react";
import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { CartContext } from "./CartContext";

const LoginPage = () => {
  const { setUser } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { logint } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Clear previous error messages
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Invalid Email");
      return;
    }

    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = storedAccounts.find(acc => acc.email === email && acc.password === password);

    if (account) {
      logint(); // Update the login state to logged in
      setUser(email); // Set the user in context
      navigate('/'); // Redirect to homepage or other page
      // No need to set success message here since we're redirecting
    } else {
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <label htmlFor="emailInput">Email</label>
        <input
          id="emailInput"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
        />
        <label htmlFor="passwordInput">Password</label>
        <input
          id="passwordInput"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <div className="error-message" style={{ color: "red" }} aria-live="assertive">{errorMessage}</div>
        <button onClick={handleLogin} role="button">Login</button>
        <div style={{ marginTop: 20 }}>
          <span>Don't have an account? </span>
          <Link to="/register" role="link">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
