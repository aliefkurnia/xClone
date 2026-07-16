import React, { useState } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./Notifications.css";

const mockNotifications = [
  { id: 1, type: "like", user: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=1", text: "liked your post", time: "2h", content: "Just shipped a new feature!" },
  { id: 2, type: "repost", user: "John Dev", avatar: "https://i.pravatar.cc/150?img=2", text: "reposted your post", time: "4h", content: "Working on something cool with React..." },
  { id: 3, type: "follow", user: "Tech News", avatar: "https://i.pravatar.cc/150?img=3", text: "followed you", time: "6h", content: null },
  { id: 4, type: "like", user: "Alex Designer", avatar: "https://i.pravatar.cc/150?img=4", text: "liked your post", time: "8h", content: "The new X design is clean" },
  { id: 5, type: "mention", user: "Maria Garcia", avatar: "https://i.pravatar.cc/150?img=5", text: "mentioned you", time: "12h", content: "@user Check this out!" },
];

const Notifications = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type) => {
    switch (type) {
      case "like": return { icon: "fas fa-heart", color: "#f91880" };
      case "repost": return { icon: "fas fa-retweet", color: "#00ba7c" };
      case "follow": return { icon: "fas fa-user", color: "#1d9bf0" };
      case "mention": return { icon: "fas fa-at", color: "#1d9bf0" };
      default: return { icon: "fas fa-bell", color: "#1d9bf0" };
    }
  };

  return (
    <div className="home-container">
      <LeftColumn user={user} />
      <div className="center-column">
        <div className="center-header">
          <h2 className="page-title">Notifications</h2>
          <div className="center-tabs">
            <button
              className={`tab-btn${activeTab === "all" ? " tab-active" : ""}`}
              onClick={() => setActiveTab("all")}
            >All</button>
            <button
              className={`tab-btn${activeTab === "verified" ? " tab-active" : ""}`}
              onClick={() => setActiveTab("verified")}
            >Verified</button>
            <button
              className={`tab-btn${activeTab === "mentions" ? " tab-active" : ""}`}
              onClick={() => setActiveTab("mentions")}
            >Mentions</button>
          </div>
        </div>
        <div className="notifications-list">
          {mockNotifications.map(notif => {
            const { icon, color } = getIcon(notif.type);
            return (
              <div key={notif.id} className="notification-item">
                <div className="notif-icon" style={{ color }}>
                  <i className={icon}></i>
                </div>
                <div className="notif-content">
                  <img src={notif.avatar} alt="" className="notif-avatar" />
                  <div className="notif-text">
                    <span className="notif-user">{notif.user}</span> {notif.text}
                  </div>
                  {notif.content && <p className="notif-post-text">{notif.content}</p>}
                  <span className="notif-time">{notif.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RightColumn />
    </div>
  );
};

export default Notifications;
