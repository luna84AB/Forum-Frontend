import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {
    navigate("/reset-sent");
  };

  const isEmailValid = email.trim() !== ""; // Check if email is not empty or only spaces

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>
        Fill in your e-mail address below and we will send you an email with
        further instructions.
      </p>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          onClick={handleResetPassword}
          className="reset-button"
          disabled={!isEmailValid} // Disable the button when email is invalid
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;