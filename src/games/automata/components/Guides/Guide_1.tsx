import React from "react";
import image from "../../images/Guides/image1.png";
import "./Guide_1.css";

const Guide_1 = () => {
  return (
    <div>
      <img src={image} className="guide-popup-1-image" />
      <p className="guide-popup-1-content-title">1. Develop Strategies</p>
      <p className="guide-popup-1-content-text">
        The Napoleonic Wars (1801–1815) were a series of conflicts fought
        between the First French Empire under Napoleon Bonaparte (1804–1815) and
        a fluctuating array of European coalitions. The wars originated in
        political forces arising from the French Revolution (1789–1799) and from
        the French Revolutionary Wars (1792–1802) and produced a period of
        French domination over Continental Europe.
      </p>
    </div>
  );
};

export default Guide_1;
