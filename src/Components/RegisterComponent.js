import React, { useState } from "react";
import "../styles/RegisterPage.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Predetermined accounts
  const accounts = [
    { email: "user1@example.com", password: "password123" },
    { email: "user2@example.com", password: "password123" }
  ];

  const handleRegister = () => {
    console.log("Attempting to register", email, password);

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      alert("Passwords do not match!");
      return;
    }

    const accountExists = accounts.some(account => account.email === email);
    if (accountExists) {
      console.error("Account with this email already exists!");
      alert("Account with this email already exists!");
      return;
    }

    // Simulate adding the new account
    accounts.push({ email, password });
    console.log("Registered successfully", accounts);
    alert("Registration successful!");
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <div className="login-option">
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
