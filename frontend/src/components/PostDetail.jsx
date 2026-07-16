import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { api } from "../services/api";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await api.getPost(postId, getToken);
      setPost(data);
      const cmts = await api.getComments(postId, getToken);
      setComments(cmts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      if (post.user_liked) {
        await api.removeLike(post.post_id, getToken);
      } else {
        await api.addLike(post.post_id, getToken);
      }
      loadPost();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await api.addComment({ post_id: postId, content: newComment }, getToken);
      setNewComment("");
      loadPost();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCount = (count) => {
    if (!count || count === 0) return "0";
    if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return count.toString();
  };

  if (loading) {
    return (
      <div className="home-container">
        <LeftColumn />
        <div className="center-column">
          <div className="center-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2>Post</h2>
          </div>
          <div className="feed-loading">
            <div className="skeleton-post">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-body">
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line medium"></div>
              </div>
            </div>
          </div>
        </div>
        <RightColumn />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="home-container">
        <LeftColumn />
        <div className="center-column">
          <div className="center-header">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2>Post</h2>
          </div>
          <div className="post-not-found">
            <h2>This post doesn't exist</h2>
            <p>Try searching for something else.</p>
          </div>
        </div>
        <RightColumn />
      </div>
    );
  }

  return (
    <div className="home-container">
      <LeftColumn />
      <div className="center-column">
        <div className="center-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2>Post</h2>
        </div>

        <div className="post-detail">
          <div className="post-detail-header">
            <img
              src={post.user?.profile_picture || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
              alt=""
              className="post-avatar"
              onClick={() => navigate(`/${post.user?.username}`)}
              style={{ cursor: "pointer" }}
            />
            <div className="post-detail-user" onClick={() => navigate(`/${post.user?.username}`)} style={{ cursor: "pointer" }}>
              <span className="post-name">{post.user?.name}</span>
              <span className="post-username">@{post.user?.username}</span>
            </div>
          </div>

          {post.content && <p className="post-detail-text">{post.content}</p>}
          {post.media_url && (
            <div className="post-media">
              <img src={post.media_url} alt="" />
            </div>
          )}

          <div className="post-detail-time">
            <span>{formatDate(post.created_at)}</span>
            {post.view_count > 0 && (
              <>
                <span className="post-dot">·</span>
                <span><strong>{formatCount(post.view_count)}</strong> Views</span>
              </>
            )}
          </div>

          <div className="post-detail-stats">
            <span><strong>{formatCount(post.retweets_count)}</strong> Reposts</span>
            <span><strong>{formatCount(post.likes_count)}</strong> Likes</span>
            <span><strong>{formatCount(post.comments_count)}</strong> Replies</span>
          </div>

          <div className="post-detail-actions">
            <button className="p-action action-reply">
              <i className="far fa-comment"></i>
            </button>
            <button className="p-action action-repost">
              <i className="fas fa-retweet"></i>
            </button>
            <button className={`p-action action-like${post.user_liked ? " active" : ""}`} onClick={handleLike}>
              <i className={post.user_liked ? "fas fa-heart" : "far fa-heart"}></i>
            </button>
            <button className="p-action action-bookmark">
              <i className="far fa-bookmark"></i>
            </button>
            <button className="p-action action-share">
              <i className="fas fa-arrow-up-from-bracket"></i>
            </button>
          </div>

          <form className="comment-form" onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Post your reply"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit" disabled={!newComment.trim()}>
              Reply
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.comment_id} className="comment-item">
                <img
                  src={comment.user?.profile_picture || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
                  alt=""
                  className="post-avatar"
                  onClick={() => navigate(`/${comment.user?.username}`)}
                  style={{ cursor: "pointer" }}
                />
                <div className="comment-body">
                  <div className="post-header">
                    <span className="post-name" onClick={() => navigate(`/${comment.user?.username}`)} style={{ cursor: "pointer" }}>
                      {comment.user?.name}
                    </span>
                    <span className="post-username">@{comment.user?.username}</span>
                  </div>
                  <p className="post-text">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RightColumn />
    </div>
  );
};

export default PostDetail;
