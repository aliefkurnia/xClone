import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { api } from "../services/api";
import "./Feed.css";

const Feed = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getPosts(getToken);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    try {
      const post = posts.find(p => p.post_id === postId);
      if (post.user_liked) {
        await api.removeLike(postId, getToken);
      } else {
        await api.addLike(postId, getToken);
      }
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRetweet = async (e, post) => {
    e.stopPropagation();
    try {
      await api.createPost({ retweet_of_post_id: post.post_id }, getToken);
      fetchPosts();
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

  if (loading) {
    return (
      <div className="feed-loading">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton-post">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-body">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line medium"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="feed">
      {posts.length === 0 ? (
        <div className="no-posts">
          <h2>Welcome to X!</h2>
          <p>This is the best place to see what's happening in your world. Start posting to see your timeline.</p>
        </div>
      ) : (
        posts.map(post => (
          <article key={post.post_id} className="post-card" onClick={() => navigate(`/post/${post.post_id}`)} style={{ cursor: "pointer" }}>
            {post.retweet_of_post_id && post.originalPost && (
              <div className="retweet-indicator">
                <i className="fas fa-retweet"></i>
                <span>You reposted</span>
              </div>
            )}
            <div className="post-main">
              <img
                src={post.user?.profile_picture || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                alt=""
                className="post-avatar"
                onClick={(e) => { e.stopPropagation(); navigate(`/${post.user?.username}`); }}
                style={{ cursor: "pointer" }}
              />
              <div className="post-body">
                <div className="post-header">
                  <span className="post-name" onClick={(e) => { e.stopPropagation(); navigate(`/${post.user?.username}`); }} style={{ cursor: "pointer" }}>{post.user?.name}</span>
                  {post.user?.is_premium && (
                    <span className="post-verified">
                      <svg viewBox="0 0 22 22" className="verified-badge">
                        <path fill="#1d9bf0" d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.143.271.586.702 1.084 1.24 1.438.54.354 1.167.551 1.813.568.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.225 1.261.272 1.893.143.636-.13 1.222-.434 1.69-.88.445-.47.749-1.055.88-1.69.13-.634.085-1.29-.138-1.893.585-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/>
                      </svg>
                    </span>
                  )}
                  <span className="post-username" onClick={(e) => { e.stopPropagation(); navigate(`/${post.user?.username}`); }} style={{ cursor: "pointer" }}>@{post.user?.username}</span>
                  <span className="post-dot">·</span>
                  <span className="post-time">{formatDate(post.created_at)}</span>
                  <button className="post-more-btn" onClick={(e) => e.stopPropagation()}>
                    <i className="fas fa-ellipsis"></i>
                  </button>
                </div>
                {post.content && <p className="post-text">{post.content}</p>}
                {post.media_url && (
                  <div className="post-media">
                    <img src={post.media_url} alt="" />
                  </div>
                )}
                {post.retweet_of_post_id && post.originalPost && (
                  <div className="quote-post">
                    <div className="quote-header">
                      <img src={post.originalPost.user?.profile_picture || ""} alt="" className="quote-avatar" />
                      <span className="quote-name">{post.originalPost.user?.name}</span>
                      <span className="post-username">@{post.originalPost.user?.username}</span>
                    </div>
                    <p className="quote-text">{post.originalPost.content}</p>
                  </div>
                )}
                <div className="post-actions">
                  <button className="p-action action-reply" onClick={(e) => e.stopPropagation()}>
                    <span className="action-icon"><i className="far fa-comment"></i></span>
                    {post.comments_count > 0 && <span>{formatCount(post.comments_count)}</span>}
                  </button>
                  <button className="p-action action-repost" onClick={(e) => handleRetweet(e, post)}>
                    <span className="action-icon"><i className="fas fa-retweet"></i></span>
                    {post.retweets_count > 0 && <span>{formatCount(post.retweets_count)}</span>}
                  </button>
                  <button className={`p-action action-like${post.user_liked ? " active" : ""}`} onClick={(e) => handleLike(e, post.post_id)}>
                    <span className="action-icon"><i className={post.user_liked ? "fas fa-heart" : "far fa-heart"}></i></span>
                    {post.likes_count > 0 && <span>{formatCount(post.likes_count)}</span>}
                  </button>
                  <button className="p-action action-views" onClick={(e) => e.stopPropagation()}>
                    <span className="action-icon"><i className="far fa-chart-bar"></i></span>
                    {post.view_count > 0 && <span>{formatCount(post.view_count)}</span>}
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
  );
};

export default Feed;
