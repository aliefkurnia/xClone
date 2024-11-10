import React from "react";
import "./RightColumn.css"; // File CSS untuk styling right-column

const RightColumn = () => {
  return (
    <div className="right-column">
      {/* Subscribe Section */}
      <div className="subscribe">
        <h3>Subscribe to Premium</h3>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
      </div>

      {/* What's Happening Section */}
      <div className="whats-happening">
        <h3>What’s happening</h3>
        <ul>
          <li>The Offseason</li>
          <li>LIVE</li>
          <li>#DijaminDapet</li>
          <li>Checkout sekarang bisa kaliii~</li>
          <li>Promoted by Tokopedia</li>
          <li>Trending in Indonesia</li>
          <li>RM AT JOGJA - 14.4K posts</li>
          <li>Trending in Indonesia - Roy Suryo</li>
          <li>Only on X · Trending</li>
          <li>HII READY BO</li>
        </ul>
        <button>Show more</button>
      </div>

      {/* Who to Follow Section */}
      <div className="who-to-follow">
        <h3>Who to follow</h3>
        <ul>
          <li>BerburuSale - Base Diskon Kukka (@berburusales) - Automated</li>
          <li>WORK (@worksfess) - Automated</li>
          <li>Never (@neVerAl0nely) - Automated</li>
        </ul>
        <button>Show more</button>
      </div>
    </div>
  );
};

export default RightColumn;
