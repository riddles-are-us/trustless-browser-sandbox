import React from "react";
import "./gameplay.css";

const Gameplay = () => {
  return (
    <div className="container">
      <div className="top">
        <div className="top-left"></div>
        <div className="top-middle"></div>
        <div className="top-right"></div>
      </div>
      <div className="middle-container">
        <div className="left">Left (200px width)</div>
        <div className="main">Main (centered)</div>
        <div className="right">Right (200px width)</div>
      </div>
    </div>
  );
};

export default Gameplay;
