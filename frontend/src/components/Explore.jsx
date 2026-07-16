import React, { useState } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./Explore.css";

const trendingCategories = [
  { category: "Technology · Trending", name: "#ReactJS", posts: "456K posts" },
  { category: "Sports · Trending", name: "Champions League", posts: "1.2M posts" },
  { category: "Entertainment · Trending", name: "#NewMusic", posts: "890K posts" },
  { category: "Technology · Trending", name: "OpenAI", posts: "345K posts" },
  { category: "Gaming · Trending", name: "#GTA6", posts: "2.1M posts" },
  { category: "Politics · Trending", name: "Election", posts: "567K posts" },
  { category: "Business · Trending", name: "#Crypto", posts: "789K posts" },
  { category: "Technology · Trending", name: "Claude AI", posts: "234K posts" },
  { category: "Science · Trending", name: "SpaceX", posts: "456K posts" },
  { category: "Entertainment · Trending", name: "#Netflix", posts: "123K posts" },
];

const Explore = ({ user }) => {
  const [activeTab, setActiveTab] = useState("trending");
  const [searchFocused, setSearchFocused] = useState(false);

  const tabs = [
    { id: "trending", label: "Trending" },
    { id: "news", label: "News" },
    { id: "sports", label: "Sports" },
    { id: "entertainment", label: "Entertainment" },
  ];

  return (
    <div className="home-container">
      <LeftColumn user={user} />
      <div className="center-column">
        <div className="explore-header">
          <div className={`explore-search${searchFocused ? " focused" : ""}`}>
            <i className="fas fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          <div className="explore-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn${activeTab === tab.id ? " tab-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="explore-trends">
          {trendingCategories.map((item, i) => (
            <div key={i} className="explore-trend-item">
              <div className="trend-meta">
                <span className="trend-cat">{item.category}</span>
                <button className="trend-more"><i className="fas fa-ellipsis"></i></button>
              </div>
              <div className="trend-name">{item.name}</div>
              <div className="trend-count">{item.posts}</div>
            </div>
          ))}
        </div>
      </div>
      <RightColumn />
    </div>
  );
};

export default Explore;
