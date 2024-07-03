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
        <div className="left">
          <div className="left-top"></div>
          <div className="left-middle"></div>
          <div className="left-bottom"></div>
        </div>
        <div className="main">Main (centered)</div>
        <div className="right">
          <div className="right-top"></div>
          <div className="right-middle"></div>
          <div className="right-bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default Gameplay;
