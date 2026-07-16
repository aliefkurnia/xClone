import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@clerk/react";
import { api } from "../services/api";
import "./RightColumn.css";

const footerLinks = [
  "Terms of Service", "Privacy Policy", "Cookie Policy",
  "Accessibility", "Ads info", "More",
];

const RightColumn = () => {
  const { getToken } = useAuth();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [trending, setTrending] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const searchTimeout = useRef(null);

  useEffect(() => {
    loadTrending();
    loadSuggested();
  }, []);

  const loadTrending = async () => {
    try {
      const data = await api.getTrending();
      setTrending(data);
    } catch (err) {
      console.error("Failed to load trending:", err);
    }
  };

  const loadSuggested = async () => {
    try {
      const data = await api.getSuggestedUsers(getToken);
      setSuggestedUsers(data);
    } catch (err) {
      console.error("Failed to load suggested users:", err);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const results = await api.searchUsers(value, getToken);
        setSearchResults(results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setSearching(false);
      }
    }, 300);
  };

  const handleFollow = async (userId) => {
    try {
      await api.follow(userId, getToken);
      setSuggestedUsers((prev) => prev.filter((u) => u.user_id !== userId));
    } catch (err) {
      console.error("Follow failed:", err);
    }
  };

  const formatPostCount = (count) => {
    if (!count || count === 0) return "";
    if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K posts";
    return count + " posts";
  };

  return (
    <div className="right-column">
      <div className="search-wrapper">
        <div className={`search-box${searchFocused ? " focused" : ""}`}>
          <i className="fas fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => { setSearchQuery(""); setSearchResults([]); }}>
              <i className="fas fa-xmark"></i>
            </button>
          )}
        </div>
        {searchFocused && searchQuery && (
          <div className="search-dropdown">
            {searching ? (
              <div className="search-loading">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div key={user.user_id} className="search-result-item">
                  <img
                    src={user.profile_picture || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                    alt=""
                    className="search-result-avatar"
                  />
                  <div className="search-result-info">
                    <span className="search-result-name">{user.name}</span>
                    <span className="search-result-username">@{user.username}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-no-results">No results for "{searchQuery}"</div>
            )}
          </div>
        )}
      </div>

      <div className="premium-box">
        <h3>Subscribe to Premium</h3>
        <p>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      <div className="trends-box">
        <h3>What's happening</h3>
        <ul>
          {trending.length > 0 ? (
            trending.map((item, i) => (
              <li key={i}>
                <div className="trend-meta">
                  <span className="trend-cat">{item.category}</span>
                  <button className="trend-more"><i className="fas fa-ellipsis"></i></button>
                </div>
                <div className="trend-name">{item.topic}</div>
                <div className="trend-count">{formatPostCount(item.posts)}</div>
              </li>
            ))
          ) : (
            <li className="trends-empty">No trends right now</li>
          )}
        </ul>
      </div>

      <div className="follow-box">
        <h3>Who to follow</h3>
        <ul>
          {suggestedUsers.length > 0 ? (
            suggestedUsers.map((user) => (
              <li key={user.user_id} className="follow-item">
                <img
                  src={user.profile_picture || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                  alt=""
                  className="follow-avatar"
                />
                <div className="follow-info">
                  <div className="follow-name-row">
                    <span className="follow-name">{user.name}</span>
                  </div>
                  <div className="follow-username">@{user.username}</div>
                </div>
                <button className="follow-btn" onClick={() => handleFollow(user.user_id)}>
                  Follow
                </button>
              </li>
            ))
          ) : (
            <li className="follow-empty">No suggestions right now</li>
          )}
        </ul>
      </div>

      <footer className="right-footer">
        <nav>
          {footerLinks.map((link, i) => (
            <a key={i} href="#" className="footer-link">{link}</a>
          ))}
        </nav>
        <span className="footer-copy">&copy; 2026 X Corp.</span>
      </footer>
    </div>
  );
};

export default RightColumn;
