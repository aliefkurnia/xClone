import React, { useState } from "react";
import LeftColumn from "./LeftColumn";
import "./Messages.css";

const mockConversations = [
  { id: 1, name: "Sarah Chen", username: "sarahchen", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hey! How's the project going?", time: "2h", unread: true },
  { id: 2, name: "John Dev", username: "johndev", avatar: "https://i.pravatar.cc/150?img=2", lastMessage: "I just pushed the fix", time: "5h", unread: false },
  { id: 3, name: "Tech News", username: "technews", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "Check out our latest article", time: "1d", unread: false },
  { id: 4, name: "Alex Designer", username: "alexdesign", avatar: "https://i.pravatar.cc/150?img=4", lastMessage: "Love the new UI!", time: "2d", unread: false },
];

const Messages = ({ user }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="home-container">
      <LeftColumn user={user} />
      <div className="messages-container">
        <div className="messages-sidebar">
          <div className="messages-header">
            <h2>Messages</h2>
            <div className="messages-header-actions">
              <button className="msg-icon-btn"><i className="fas fa-gear"></i></button>
              <button className="msg-icon-btn"><i className="fas fa-envelope"></i></button>
            </div>
          </div>
          <div className={`messages-search${searchFocused ? " focused" : ""}`}>
            <i className="fas fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search Direct Messages"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          <div className="conversations-list">
            {mockConversations.map(conv => (
              <div
                key={conv.id}
                className={`conversation-item${selectedChat === conv.id ? " active" : ""}`}
                onClick={() => setSelectedChat(conv.id)}
              >
                <img src={conv.avatar} alt="" className="conv-avatar" />
                <div className="conv-info">
                  <div className="conv-header">
                    <span className="conv-name">{conv.name}</span>
                    <span className="conv-username">@{conv.username}</span>
                    <span className="conv-time">· {conv.time}</span>
                  </div>
                  <p className="conv-last-msg">{conv.lastMessage}</p>
                </div>
                {conv.unread && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="messages-main">
          {selectedChat ? (
            <div className="chat-area">
              <div className="chat-header">
                <h3>{mockConversations.find(c => c.id === selectedChat)?.name}</h3>
              </div>
              <div className="chat-messages">
                <div className="chat-empty">
                  <p>Messages will appear here</p>
                </div>
              </div>
              <div className="chat-input-area">
                <button className="chat-icon-btn"><i className="far fa-image"></i></button>
                <button className="chat-icon-btn"><i className="fas fa-film"></i></button>
                <input type="text" placeholder="Start a new message" className="chat-input" />
                <button className="chat-icon-btn"><i className="far fa-face-smile"></i></button>
                <button className="chat-send-btn"><i className="fas fa-paper-plane"></i></button>
              </div>
            </div>
          ) : (
            <div className="messages-empty">
              <h2>Select a message</h2>
              <p>Choose from your existing conversations, start a new one, or just keep swimming.</p>
              <button className="new-message-btn">New message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
