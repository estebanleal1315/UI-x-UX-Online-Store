import React, { useState } from "react";
import "../styles/RegisterPage.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "polite" });

  const loadAccounts = () => {
    const storedAccounts = localStorage.getItem('accounts');
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  };

  const handleRegister = () => {
    setFeedback({ message: "", type: "polite" }); // Clear previous messages

    if (password !== confirmPassword) {
      setFeedback({ message: "Passwords do not match!", type: "assertive" });
      return;
    }

    let accounts = loadAccounts();
    const accountExists = accounts.some(account => account.email === email);
    if (accountExists) {
      setFeedback({ message: "Account with this email already exists!", type: "assertive" });
      return;
    }

    // Register the new account
    accounts.push({ email, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    setFeedback({ message: "Registration successful!", type: "polite" });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-label="Confirm Password"
        />
        <div className="message" aria-live={feedback.type}>{feedback.message}</div>
        <button onClick={handleRegister} role="button">Register</button>
        <span>Already have an account? </span>
        <Link to="/login" role="link">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
