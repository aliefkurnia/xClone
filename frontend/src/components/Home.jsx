import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/react";
import { api } from "../services/api";
import LeftColumn from "./LeftColumn";
import CenterColumn from "./CenterColumn";
import RightColumn from "./RightColumn";
import "./Home.css";

const Home = () => {
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!clerkUser) return;
      try {
        const user = await api.syncUser(
          {
            name: clerkUser.fullName || clerkUser.firstName || "User",
            username: clerkUser.username || clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            profile_picture: clerkUser.imageUrl,
          },
          getToken
        );
        setDbUser(user);
      } catch (err) {
        console.error("Failed to sync user:", err);
      }
    };
    syncUser();
  }, [clerkUser, getToken]);

  return (
    <div className="home-container">
      <LeftColumn user={dbUser} />
      <CenterColumn />
      <RightColumn />
    </div>
  );
};

export default Home;
