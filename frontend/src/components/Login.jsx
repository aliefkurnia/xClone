import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/xicon.svg"; // Mengimpor logo
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);

        navigate("/home"); // Redirect ke halaman Home setelah login berhasil
      } else {
        setError(data.message || "Login gagal, periksa email dan password!");
        localStorage.removeItem("token"); // Hapus token jika login gagal
        localStorage.removeItem("user_id");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login.");
      localStorage.removeItem("token"); // Hapus token jika ada kesalahan
      localStorage.removeItem("user_id");
    }
  };

  // Fungsi untuk membuka modal
  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const openCreateAccountModal = () => setIsCreateAccountModalOpen(true);
  const closeCreateAccountModal = () => setIsCreateAccountModalOpen(false);

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className="form-container">
        <h1>Happening Now</h1>
        <h2>Join today.</h2>

        {/* Tombol Sign in with Google dan Apple */}
        <div className="social-login">
          <button className="google-btn">
            <i className="fab fa-google icon"></i> Sign in with Google
          </button>
          <button className="apple-btn">
            <i className="fab fa-apple icon"></i> Sign in with Apple
          </button>
        </div>

        {/* Separator */}
        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        {/* Create Account link */}
        <div className="create-account">
          <button onClick={openCreateAccountModal}>Create Account</button>
          <p>
            By signing up, you agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>, including Cookie Use.
          </p>
        </div>

        {/* Already have an account? Sign in link */}
        <div className="existing-account">
          <p className="account-text">Already have an account? </p>
          <button onClick={openSignInModal} className="sign-in-button">
            Sign in
          </button>
        </div>
      </div>

      {/* Footer tetap berada di bawah */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Download the X app</a>
          <a href="#">Help Center</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          <a href="#">Ads info</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
          <a href="#">Brand Resources</a>
          <a href="#">Advertising</a>
          <a href="#">Marketing</a>
          <a href="#">X for Business</a>
          <a href="#">Developers</a>
          <a href="#">Directory</a>
          <a href="#">Settings</a>
          <a>&copy; 2024 X Corp.</a>
        </div>
      </footer>

      {/* Modal Sign in */}
      {isSignInModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email or Username:</label>
                <input
                  id="id"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Sedang memproses..." : "Login"}
              </button>
            </form>
            <button onClick={closeSignInModal}>Close</button>
          </div>
        </div>
      )}

      {/* Modal Create Account */}
      {isCreateAccountModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Account</h2>
            <button onClick={closeCreateAccountModal}>Close</button>
            {/* Isi form atau konten create account di sini */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
