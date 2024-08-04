import React from "react";
import "./Rocket.css";

const Rocket = () => {
  return (
    <div
      className="rocket-image"
      onClick={() => {
        console.log("click rocket");
      }}
    ></div>
  );
};

export default Rocket;
