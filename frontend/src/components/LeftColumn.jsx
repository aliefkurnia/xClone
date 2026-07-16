import React, { useState, useRef, useEffect } from "react";
import { useClerk, useUser } from "@clerk/react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LeftColumn.css";

const LeftColumn = ({ user }) => {
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef(null);
  const logoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setIsMoreMenuOpen(false);
      }
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setIsLogoutMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const displayName = user?.name || clerkUser?.fullName || "User";
  const displayUsername = user?.username || clerkUser?.username || "user";
  const profilePic = user?.profile_picture || clerkUser?.imageUrl || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

  const navItems = [
    { icon: "fas fa-house", label: "Home", path: "/home" },
    { icon: "fas fa-magnifying-glass", label: "Explore", path: "/explore" },
    { icon: "fas fa-bell", label: "Notifications", path: "/notifications" },
    { icon: "fas fa-envelope", label: "Messages", path: "/messages" },
    { icon: "fas fa-slash", iconCustom: true, label: "Grok", path: "/grok" },
    { icon: "fas fa-users", label: "Communities", path: "/communities" },
    { icon: "fas fa-star", label: "Premium", path: "/premium" },
    { icon: "fas fa-user", label: "Profile", path: "/profile" },
  ];

  const moreMenuItems = [
    { icon: "fas fa-bookmark", label: "Bookmarks", path: "/bookmarks" },
    { icon: "fas fa-list-ul", label: "Lists", path: "#" },
    { icon: "fas fa-microphone", label: "Spaces", path: "#" },
    { icon: "fas fa-money-bill-wave", label: "Monetization", path: "#" },
    { icon: "fas fa-gear", label: "Settings and Support", path: "#" },
  ];

  return (
    <div className="left-column">
      <div className="left-sticky">
        <button onClick={() => navigate("/home")} className="x-logo-link">
          <svg viewBox="0 0 24 24" className="x-logo-icon" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        <nav className="nav-menu">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={"nav-link" + (location.pathname === item.path ? " active" : "")}
              onClick={() => item.path !== "#" && navigate(item.path)}
            >
              {item.iconCustom ? (
                <svg viewBox="0 0 24 24" className="nav-icon-svg" fill="currentColor">
                  <path d="M2.205 7.423L11.745 21.073C11.885 21.273 12.115 21.273 12.255 21.073L21.795 7.423C22.025 7.093 21.785 6.633 21.375 6.633H18.495L12.255 15.573C12.115 15.773 11.885 15.773 11.745 15.573L5.505 6.633H2.625C2.215 6.633 1.975 7.093 2.205 7.423Z"/>
                </svg>
              ) : (
                <i className={item.icon}></i>
              )}
              <span className="nav-label">{item.label}</span>
            </button>
          ))}

          <div className="more-menu-wrapper" ref={moreMenuRef}>
            <button
              className="nav-link"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            >
              <i className="fas fa-ellipsis"></i>
              <span className="nav-label">More</span>
            </button>

            {isMoreMenuOpen && (
              <div className="more-menu">
                {moreMenuItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="more-menu-item"
                    onClick={() => {
                      if (item.path !== "#") navigate(item.path);
                      setIsMoreMenuOpen(false);
                    }}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button className="post-button" onClick={() => navigate("/home")}>
          <span className="post-btn-text">Post</span>
          <svg viewBox="0 0 24 24" className="post-btn-icon" fill="currentColor">
            <path d="M23 3c-6.62-.1-10.38 2.421-13.424 6.054C7.593 11.737 6.251 14.963 5 18c2.928-4.048 5.547-5.993 8-7.833V14c4.286-5.476 8-9.5 10-11z"/>
          </svg>
        </button>

        <div className="user-profile-card" ref={logoutRef} onClick={() => setIsLogoutMenuOpen(!isLogoutMenuOpen)}>
          <img src={profilePic} alt="" className="profile-pic" />
          <div className="user-info">
            <span className="display-name">{displayName}</span>
            <span className="username">@{displayUsername}</span>
          </div>
          <i className="fas fa-ellipsis"></i>

          {isLogoutMenuOpen && (
            <div className="logout-menu">
              <button onClick={handleLogout}>Log out @{displayUsername}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftColumn;
