import React from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import "./Communities.css";

const mockCommunities = [
  { id: 1, name: "React Developers", members: "125K", avatar: "https://i.pravatar.cc/150?img=10", description: "A community for React developers to share tips and tricks" },
  { id: 2, name: "Web3 & Crypto", members: "89K", avatar: "https://i.pravatar.cc/150?img=11", description: "Discussing the future of decentralized web" },
  { id: 3, name: "UI/UX Design", members: "200K", avatar: "https://i.pravatar.cc/150?img=12", description: "Design inspiration, feedback, and resources" },
  { id: 4, name: "Indie Hackers", members: "67K", avatar: "https://i.pravatar.cc/150?img=13", description: "Building products and sharing the journey" },
];

const Communities = ({ user }) => {
  return (
    <div className="home-container">
      <LeftColumn user={user} />
      <div className="center-column">
        <div className="center-header">
          <h2 className="page-title">Communities</h2>
          <div className="center-tabs">
            <button className="tab-btn tab-active">Discover</button>
            <button className="tab-btn">Your Communities</button>
          </div>
        </div>
        <div className="communities-list">
          {mockCommunities.map(comm => (
            <div key={comm.id} className="community-card">
              <img src={comm.avatar} alt="" className="community-avatar" />
              <div className="community-info">
                <h3 className="community-name">{comm.name}</h3>
                <span className="community-members">{comm.members} Members</span>
                <p className="community-desc">{comm.description}</p>
              </div>
              <button className="join-btn">Join</button>
            </div>
          ))}
        </div>
      </div>
      <RightColumn />
    </div>
  );
};

export default Communities;
