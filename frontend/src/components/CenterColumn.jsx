import React from "react";
import "./CenterColumn.css"; // File CSS untuk styling center-column

const CenterColumn = () => {
  return (
    <div className="center-column">
      <section className="status-feed">
        <h2>Status Feed</h2>
        <div className="status-item">
          <p>Status 1</p>
        </div>
        <div className="status-item">
          <p>Status 2</p>
        </div>
      </section>
    </div>
  );
};

export default CenterColumn;
