import React from "react";
import { useNavigate } from "react-router-dom";


export default function AccountPage() {
  const navigate = useNavigate();

  return (
    <section className="account-page">
      <header className="account-header">
        <div className="qr-icon"></div> {/* Replace with actual QR icon */}
        <div className="profile-icon"></div> {/* Replace with profile image */}
      </header>

      <div className="account-content">
        <h2>Unlock Delicious Possibilities!</h2>
        <p>
          Connect with your plant-based community! <br />
          Invite friends, follow inspiring voices, and share the journey together. 🌱
        </p>

        <button
          className="btn create-account-btn"
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </button>
        <button
          className="btn login-btn"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>
    </section>
  );
}
