import React, { useState, useContext } from "react";
import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { CartContext } from "./CartContext";

const LoginPage = () => {
  const { setUser } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logint } = useAuth();
  const [showError, setShowError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      alert("Invalid Email");
      return;
    }

    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = storedAccounts.find(acc => acc.email === email && acc.password === password);

    if (account) {
      logint(); // Update the login state to logged in
      setUser(email); // Set the user in context
      navigate('/'); // Redirect to homepage or other page
      alert("Login successful!");
    } else {
      setShowError(true);
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showError && (
          <div style={{ color: "red" }}>Incorrect username or password</div>
        )}
        <button onClick={handleLogin}>Login</button>
        <div style={{ marginTop: 20 }}>
          <span>Don't have an account? </span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
