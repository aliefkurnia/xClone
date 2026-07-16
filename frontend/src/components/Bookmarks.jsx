import React from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./Bookmarks.css";

const Bookmarks = ({ user }) => {
  return (
    <div className="home-container">
      <LeftColumn user={user} />
      <div className="center-column">
        <div className="center-header">
          <div className="bookmarks-header">
            <h2>Bookmarks</h2>
            <span className="bookmarks-username">@{user?.username || "user"}</span>
          </div>
        </div>
        <div className="bookmarks-empty">
          <h2>Save posts for later</h2>
          <p>Bookmark posts to easily find them again in the future.</p>
        </div>
      </div>
      <RightColumn />
    </div>
  );
};

export default Bookmarks;
