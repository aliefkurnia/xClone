import React, { useState } from "react";
import PostComposer from "./PostComposer";
import Feed from "./Feed";
import "./CenterColumn.css";

const CenterColumn = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("for-you");

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="center-column">
      <div className="center-header">
        <div className="center-tabs">
          <button
            className={"tab-btn" + (activeTab === "for-you" ? " tab-active" : "")}
            onClick={() => setActiveTab("for-you")}
          >
            For you
          </button>
          <button
            className={"tab-btn" + (activeTab === "following" ? " tab-active" : "")}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>
      </div>
      <PostComposer onPostCreated={handlePostCreated} />
      <Feed key={refreshKey} />
    </div>
  );
};

export default CenterColumn;
