import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faBell,
  faEnvelope,
  faBookmark,
  faBriefcase,
  faUsers,
  faStar,
  faUser,
  faEllipsisH,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import "./LeftColumn.css";

const LeftColumn = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(""); // Tambahkan state untuk username

  useEffect(() => {
    // Ambil username dari localStorage saat komponen dimount
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Menutup menu pop-up jika pengguna mengklik di luar menu
  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".logout-menu") &&
      !event.target.closest(".ellipsis-icon")
    ) {
      setIsMenuOpen(false);
    }
  };

  // Menambahkan event listener untuk menutup menu saat klik di luar
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="left-column">
      <section className="home-status">
        <ul className="status-links">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faHome} /> Home
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faCompass} /> Explore
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBell} /> Notifications
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} /> Messages
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBookmark} /> Bookmarks
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBriefcase} /> Jobs
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faUsers} /> Communities
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faStar} /> Premium
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faUser} /> Profile
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faEllipsisH} onClick={toggleMenu} /> More
            </a>
          </li>
        </ul>

        {/* Tombol Post */}
        <button className="post-button" onClick={toggleModal}>
          Post
        </button>

        {/* Modal untuk Update Status */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Update Status</h3>
              <textarea placeholder="What's on your mind?" rows="4"></textarea>
              <div className="modal-actions">
                <button onClick={toggleModal}>Close</button>
                <button>Post</button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Logout (Pop-up) */}
        {isMenuOpen && (
          <div className="logout-menu">
            <button>Add an existing account</button>
            {/* Tambahkan username dinamis ke dalam tombol Logout */}
            <button>Logout {user?.username}</button>
          </div>
        )}
      </section>

      {/* Profil Pengguna */}
      <section className="user-profile">
        <div className="profile-photo">
          <img src="{user?.profile_picture}" alt="User Avatar" />
        </div>
        <div className="profile-info">
          <p className="username">{user?.username}</p>
          <p className="user-handle">@{user?.email}</p>
        </div>
        <div>
          {/* Titik Tiga */}
          <FontAwesomeIcon
            icon={faEllipsisH}
            className="ellipsis-icon"
            onClick={toggleMenu}
          />
        </div>
      </section>
    </div>
  );
};

export default LeftColumn;
