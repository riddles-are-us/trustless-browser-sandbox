import React from "react";
import "./gameplay.css";

const Gameplay = () => {
  return (
    <div className="container">
      <div className="top">Top (200px height)</div>
      <div className="middle-container">
        <div className="left">Left (200px width)</div>
        <div className="main">Main (centered)</div>
        <div className="right">Right (200px width)</div>
      </div>
    </div>
  );
};

export default Gameplay;
