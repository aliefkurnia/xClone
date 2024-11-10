import React, { useEffect, useState } from "react";
import LeftColumn from "./LeftColumn";
import CenterColumn from "./CenterColumn";
import RightColumn from "./RightColumn";
import Logo from "../assets/xicon.svg"; // Mengimpor logo
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      if (token && userId) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <img src={Logo} alt="Logo" /> {/* Replace text with logo image */}
        </div>
        <nav className="nav-links">
          <a href="#">For You</a>
          <a href="#">Following</a>
        </nav>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>
      </header>

      <main className="main-content">
        <LeftColumn user={user} /> {/* Pass user data to LeftColumn */}
        <CenterColumn />
        <RightColumn />
      </main>
    </div>
  );
};

export default Home;
