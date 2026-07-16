import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import { api } from "../services/api";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./Profile.css";

const UserProfile = () => {
  const { username } = useParams();
  const { getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProfile = async () => {
    try {
      setLoading(true);
      const user = await api.getUserByUsername(username, getToken);
      setProfileUser(user);
      const posts = await api.getUserPosts(username, getToken);
      setUserPosts(posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.unfollow(profileUser.user_id, getToken);
        setIsFollowing(false);
      } else {
        await api.follow(profileUser.user_id, getToken);
        setIsFollowing(true);
      }
      loadProfile();
    } catch (err) {
      console.error(err);
    }
  };

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

  const formatCount = (count) => {
    if (!count || count === 0) return "";
    if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return count.toString();
  };

  const isOwnProfile = clerkUser && profileUser && (
    clerkUser.id === profileUser.user_id ||
    clerkUser.username === profileUser.username
  );

  const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

  if (loading) {
    return (
      <div className="home-container">
        <LeftColumn />
        <div className="center-column">
          <div className="center-header">
            <div className="profile-header-top">
              <button className="back-btn" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <div><h2 className="profile-header-name">Profile</h2></div>
            </div>
          </div>
          <div className="feed-loading">
            <div className="skeleton-post">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-body">
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
              </div>
            </div>
          </div>
        </div>
        <RightColumn />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="home-container">
        <LeftColumn />
        <div className="center-column">
          <div className="center-header">
            <div className="profile-header-top">
              <button className="back-btn" onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <div><h2 className="profile-header-name">Profile</h2></div>
            </div>
          </div>
          <div className="post-not-found">
            <h2>This account doesn't exist</h2>
            <p>Try searching for another.</p>
          </div>
        </div>
        <RightColumn />
      </div>
    );
  }

  const name = profileUser.name;
  const avatar = profileUser.profile_picture || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
  const bio = profileUser.bio || "";
  const joinDate = profileUser.created_at
    ? new Date(profileUser.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="home-container">
      <LeftColumn />
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
            {isOwnProfile ? (
              <button className="edit-profile-btn" onClick={() => navigate("/profile")}>Edit profile</button>
            ) : (
              <button className="edit-profile-btn" onClick={handleFollow}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="profile-names">
            <h2 className="profile-display-name">{name}</h2>
            <span className="profile-handle">@{profileUser.username}</span>
          </div>
          {bio && <p className="profile-bio">{bio}</p>}
          <div className="profile-meta">
            {joinDate && (
              <span className="profile-meta-item">
                <i className="far fa-calendar"></i>
                Joined {joinDate}
              </span>
            )}
          </div>
          <div className="profile-follow-counts">
            <span className="follow-count"><strong>{profileUser.following_count || 0}</strong> Following</span>
            <span className="follow-count"><strong>{profileUser.followers_count || 0}</strong> Followers</span>
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
              <article key={post.post_id} className="post-card" onClick={() => navigate(`/post/${post.post_id}`)} style={{ cursor: "pointer" }}>
                <div className="post-main">
                  <img src={avatar} alt="" className="post-avatar" />
                  <div className="post-body">
                    <div className="post-header">
                      <span className="post-name">{name}</span>
                      {profileUser.is_premium && (
                        <span className="post-verified">
                          <svg viewBox="0 0 22 22" className="verified-badge">
                            <path fill="#1d9bf0" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.272 1.893.143.636-.13 1.222-.434 1.69-.88.445-.47.749-1.055.88-1.69.13-.634.085-1.29-.138-1.893.585-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                          </svg>
                        </span>
                      )}
                      <span className="post-username">@{profileUser.username}</span>
                      <span className="post-dot">·</span>
                      <span className="post-time">{formatDate(post.created_at)}</span>
                    </div>
                    <p className="post-text">{post.content}</p>
                    {post.media_url && (
                      <div className="post-media"><img src={post.media_url} alt="" /></div>
                    )}
                    <div className="post-actions">
                      <button className="p-action action-reply" onClick={(e) => e.stopPropagation()}>
                        <span className="action-icon"><i className="far fa-comment"></i></span>
                        {post.comments_count > 0 && <span>{formatCount(post.comments_count)}</span>}
                      </button>
                      <button className="p-action action-repost" onClick={(e) => e.stopPropagation()}>
                        <span className="action-icon"><i className="fas fa-retweet"></i></span>
                        {post.retweets_count > 0 && <span>{formatCount(post.retweets_count)}</span>}
                      </button>
                      <button className="p-action action-like" onClick={(e) => e.stopPropagation()}>
                        <span className="action-icon"><i className="far fa-heart"></i></span>
                        {post.likes_count > 0 && <span>{formatCount(post.likes_count)}</span>}
                      </button>
                      <button className="p-action action-views" onClick={(e) => e.stopPropagation()}>
                        <span className="action-icon"><i className="far fa-chart-bar"></i></span>
                      </button>
                      <div className="post-actions-right">
                        <button className="p-action action-bookmark" onClick={(e) => e.stopPropagation()}>
                          <span className="action-icon"><i className="far fa-bookmark"></i></span>
                        </button>
                        <button className="p-action action-share" onClick={(e) => e.stopPropagation()}>
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

export default UserProfile;
