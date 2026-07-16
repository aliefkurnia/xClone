import React, { useState, useRef, useCallback } from "react";
import { useClerk, useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import "./Login.css";

const X_PATH = "M285.38 207.711L462.954 1.5H420.874L266.687 180.55L143.538 1.5H1.50003L187.726 272.256L1.50003 488.5H43.5818L206.408 299.417L336.462 488.5H478.5L285.37 207.711H285.38ZM227.743 274.641L208.875 247.68L58.7444 33.147H123.379L244.536 206.282L263.405 233.243L420.894 458.292H356.259L227.743 274.652V274.641Z";

const footerItems = [
  { label: "Tentang", href: "https://about.x.com" },
  { label: "Dapatkan Aplikasi", href: "https://help.x.com/using-x/download-the-x-app" },
  { label: "Grok", href: "https://grok.com/" },
  { label: "Bantuan", href: "https://help.x.com" },
  { label: "Persyaratan", href: "https://x.com/tos" },
  { label: "Privasi", href: "https://x.com/privacy" },
  { label: "Kuki", href: "https://support.x.com/articles/20170514" },
  { label: "Karier", href: "https://careers.x.com" },
  { label: "Iklan dan Bisnis", href: "https://business.x.com/advertising" },
  { label: "Pengembang", href: "https://developer.x.com" },
  { label: "Berita", href: "https://x.com/i/jf/stories/home" },
  { label: "Aksesibilitas", href: "https://help.x.com/resources/accessibility" },
];

const Login = () => {
  const clerk = useClerk();
  const { isSignedIn, isLoaded } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 195, y: 387 });
  const logoRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleMouseMove = useCallback((e) => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 480,
        y: ((e.clientY - rect.top) / rect.height) * 490,
      });
    }
  }, []);

  if (!isLoaded) return <div className="login-outer" />;
  if (isSignedIn) return <Navigate to="/home" replace />;

  const clerkSignIn = async (strategy) => {
    setLoading(true);
    try {
      await clerk.redirectToSignIn(strategy ? { strategy, redirectUrl: "/home" } : { redirectUrl: "/home" });
    } catch (err) {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) clerkSignIn();
  };

  return (
    <div className="login-outer">
      <div className="login-main">
        <div className="login-left">
          <div className="login-left-inner">
            <h1 className="login-heading">Sedang tren saat ini.</h1>

            <div className="login-form-container">
              <div className="login-form">
                <button className="social-btn" onClick={() => clerkSignIn("oauth_google")} disabled={loading}>
                  <svg viewBox="0 0 24 24" className="social-icon" fill="none">
                    <g transform="translate(2 2)">
                      <path fill="#25D366" d="M10 0C4.47722 0 0 4.47722 0 10C0 11.8169 0.484722 13.5208 1.33167 14.9892L0 20L5.195 18.7719C6.62111 19.5547 8.25833 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47722 15.5228 0 10 0Z"/>
                      <path fill="#25D366" d="M12.3428 11.3184L14.7623 12.459C14.8734 12.5112 14.9445 12.624 14.9345 12.7462C14.9084 13.0645 14.7806 13.7026 14.2087 14.2745C12.5942 15.889 9.69506 14.0623 9.57701 13.9918C8.86395 13.6087 8.18645 13.0962 7.54395 12.454C6.90173 11.8118 6.38895 11.134 6.0059 10.4209C5.93506 10.3032 4.1084 7.40399 5.72312 5.78927C6.29506 5.21732 6.93312 5.08955 7.25145 5.06343C7.37395 5.05343 7.48645 5.12455 7.53867 5.23566L8.67951 7.6551C8.7334 7.76955 8.70978 7.90566 8.62034 7.9951L7.77006 8.84538C7.58617 9.02927 7.53229 9.31566 7.65895 9.54288C7.96923 10.0993 8.38645 10.6351 8.86979 11.1282C9.36284 11.6115 9.89867 12.029 10.4551 12.339C10.6823 12.4657 10.9684 12.4118 11.1526 12.2279L12.0028 11.3776C12.0923 11.2882 12.2284 11.2643 12.3428 11.3184Z"/>
                    </g>
                  </svg>
                  Continue with WhatsApp
                </button>

                <button className="social-btn" onClick={() => clerkSignIn("oauth_google")} disabled={loading}>
                  <svg viewBox="0 0 24 24" className="social-icon">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="social-btn" onClick={() => clerkSignIn("oauth_apple")} disabled={loading}>
                  <svg viewBox="0 0 24 24" className="social-icon apple-icon">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.71-4.1 3.75-4.25.29 2.58-2.34 4.5-3.75 4.25z"/>
                  </svg>
                  Lanjutkan dengan Apple
                </button>

                <div className="divider"><span>atau</span></div>

                <form className="email-form" onSubmit={handleEmailSubmit}>
                  <div className="input-float-wrap">
                    <input
                      type="text"
                      className="input-float"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="username"
                      id="email-input"
                    />
                    <label htmlFor="email-input" className={"input-label" + (email ? " input-label-up" : "")}>
                      Email atau nama pengguna
                    </label>
                  </div>
                  <button type="submit" className="continue-btn" disabled={loading || !email.trim()}>
                    {loading ? "Tunggu..." : "Lanjutkan"}
                  </button>
                </form>

                <div className="terms-text">
                  Dengan melanjutkan, Anda menyetujui <a href="#">Syarat Layanan</a>, <a href="#">Kebijakan Privasi</a> dan <a href="#">Penggunaan Cookie</a> kami.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right" ref={logoRef} onMouseMove={handleMouseMove}>
          <svg aria-label="X" viewBox="0 0 480 490" className="x-logo-big">
            <defs>
              <radialGradient id="shine" cx={mousePos.x} cy={mousePos.y} r="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e8e8e8" />
                <stop offset="30%" stopColor="#666666" />
                <stop offset="100%" stopColor="#333639" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d={X_PATH} fill="#222222" />
            <path d={X_PATH} stroke="#222222" strokeWidth="3" strokeLinejoin="round" />
            <path d={X_PATH} stroke="url(#shine)" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <footer className="login-footer">
        <nav aria-label="Catatan kaki" role="navigation" className="footer-nav">
          {footerItems.map((item, i) => (
            <span key={i} className="footer-item">
              <a href={item.href} target="_blank" rel="noopener noreferrer nofollow" className="footer-link">{item.label}</a>
              <span className="footer-sep"> - </span>
            </span>
          ))}
          <span className="footer-copyright">(c) 2026 X Corp.</span>
        </nav>
      </footer>
    </div>
  );
};

export default Login;
