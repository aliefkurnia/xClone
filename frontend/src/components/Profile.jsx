import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./Profile.css";

const Profile = () => {
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const load = async () => {
      try {
        const me = await api.syncUser({
          name: clerkUser?.fullName || clerkUser?.firstName || "User",
          username: clerkUser?.username || clerkUser?.id,
          email: clerkUser?.primaryEmailAddress?.emailAddress,
          profile_picture: clerkUser?.imageUrl,
        }, getToken);
        setDbUser(me);
        const all = await api.getPosts(getToken);
        setUserPosts(all.filter(p => p.user_id === me.user_id));
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const name = dbUser?.name || clerkUser?.fullName || "User";
  const username = dbUser?.username || clerkUser?.username || "user";
  const avatar = dbUser?.profile_picture || clerkUser?.imageUrl || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
  const bio = dbUser?.bio || "";
  const joinDate = dbUser?.created_at ? new Date(dbUser.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "July 2026";

  const formatDate = (date) => {
    const d = new Date(date);
    const diff = Date.now() - d;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return mins + "m";
    const h = Math.floor(mins / 60);
    if (h < 24) return h + "h";
    const days = Math.floor(h / 24);
    if (days < 7) return days + "d";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

  return (
    <div className="home-container">
      <LeftColumn user={dbUser} />
      <div className="center-column">
        <div className="center-header">
          <div className="profile-header-top">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div>
              <h2 className="profile-header-name">{name}</h2>
              <span className="profile-header-count">{userPosts.length} posts</span>
            </div>
          </div>
        </div>

        <div className="profile-banner"></div>

        <div className="profile-info-section">
          <div className="profile-avatar-row">
            <img src={avatar} alt="" className="profile-main-avatar" />
            <button className="edit-profile-btn">Edit profile</button>
          </div>
          <div className="profile-names">
            <h2 className="profile-display-name">{name}</h2>
            <span className="profile-handle">@{username}</span>
          </div>
          {bio && <p className="profile-bio">{bio}</p>}
          <div className="profile-meta">
            <span className="profile-meta-item">
              <i className="far fa-calendar"></i>
              Joined {joinDate}
            </span>
          </div>
          <div className="profile-follow-counts">
            <span className="follow-count"><strong>{dbUser?.following_count || 0}</strong> Following</span>
            <span className="follow-count"><strong>{dbUser?.followers_count || 0}</strong> Followers</span>
          </div>
        </div>

        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn${activeTab === tab.toLowerCase() ? " tab-active" : ""}`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="profile-posts">
          {userPosts.length === 0 ? (
            <div className="profile-no-posts">
              <h2>No posts yet</h2>
              <p>When {name} posts, they'll show up here.</p>
            </div>
          ) : (
            userPosts.map(post => (
              <article key={post.post_id} className="post-card">
                <div className="post-main">
                  <img src={avatar} alt="" className="post-avatar" />
                  <div className="post-body">
                    <div className="post-header">
                      <span className="post-name">{name}</span>
                      <span className="post-username">@{username}</span>
                      <span className="post-dot">·</span>
                      <span className="post-time">{formatDate(post.created_at)}</span>
                    </div>
                    <p className="post-text">{post.content}</p>
                    <div className="post-actions">
                      <button className="p-action action-reply">
                        <span className="action-icon"><i className="far fa-comment"></i></span>
                      </button>
                      <button className="p-action action-repost">
                        <span className="action-icon"><i className="fas fa-retweet"></i></span>
                      </button>
                      <button className="p-action action-like">
                        <span className="action-icon"><i className="far fa-heart"></i></span>
                      </button>
                      <button className="p-action action-views">
                        <span className="action-icon"><i className="far fa-chart-bar"></i></span>
                      </button>
                      <div className="post-actions-right">
                        <button className="p-action action-bookmark">
                          <span className="action-icon"><i className="far fa-bookmark"></i></span>
                        </button>
                        <button className="p-action action-share">
                          <span className="action-icon"><i className="fas fa-arrow-up-from-bracket"></i></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
      <RightColumn />
    </div>
  );
};

export default Profile;
