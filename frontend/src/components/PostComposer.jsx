import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { api } from "../services/api";
import "./PostComposer.css";

const MAX_CHARS = 280;

const PostComposer = ({ onPostCreated }) => {
  const { getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [postContent, setPostContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const charCount = postContent.length;
  const charPercent = Math.min((charCount / MAX_CHARS) * 100, 100);
  const isOverLimit = charCount > MAX_CHARS;
  const remaining = MAX_CHARS - charCount;

  const handlePost = async () => {
    if (!postContent.trim() || isOverLimit) return;
    try {
      setPosting(true);
      await api.createPost({ content: postContent }, getToken);
      setPostContent("");
      setIsFocused(false);
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handlePost();
    }
  };

  return (
    <div className="post-composer">
      <img
        src={clerkUser?.imageUrl || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"}
        alt=""
        className="composer-avatar"
      />
      <div className="composer-content">
        <div className="composer-input-wrapper">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="What is happening?!"
            rows={isFocused ? 3 : 1}
          />
        </div>
        {isFocused && (
          <div className="composer-audience">
            <i className="fas fa-globe"></i>
            <span>Everyone can reply</span>
          </div>
        )}
        <div className="composer-actions">
          <div className="composer-icons">
            <button className="c-icon-btn" title="Media"><i className="far fa-image"></i></button>
            <button className="c-icon-btn" title="GIF"><i className="fas fa-film"></i></button>
            <button className="c-icon-btn" title="Poll"><i className="fas fa-chart-bar"></i></button>
            <button className="c-icon-btn" title="Emoji"><i className="far fa-face-smile"></i></button>
            <button className="c-icon-btn" title="Schedule"><i className="far fa-calendar"></i></button>
            <button className="c-icon-btn" title="Location"><i className="fas fa-location-dot"></i></button>
          </div>
          <div className="composer-right">
            {postContent.length > 0 && (
              <div className="char-counter">
                <svg className="char-circle" viewBox="0 0 20 20">
                  <circle
                    className="char-circle-bg"
                    cx="10" cy="10" r="8"
                    fill="none"
                    strokeWidth="2.5"
                  />
                  <circle
                    className={`char-circle-fill${isOverLimit ? " over" : remaining <= 20 ? " warning" : ""}`}
                    cx="10" cy="10" r="8"
                    fill="none"
                    strokeWidth="2.5"
                    strokeDasharray={`${charPercent * 0.5027} 50.27`}
                    transform="rotate(-90 10 10)"
                  />
                </svg>
                {remaining <= 20 && (
                  <span className={`char-remaining${isOverLimit ? " over" : ""}`}>
                    {remaining}
                  </span>
                )}
              </div>
            )}
            {postContent.length > 0 && <div className="composer-divider"></div>}
            <button
              className="c-post-btn"
              onClick={handlePost}
              disabled={!postContent.trim() || posting || isOverLimit}
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
