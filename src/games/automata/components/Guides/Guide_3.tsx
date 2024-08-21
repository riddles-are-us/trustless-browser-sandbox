import React from "react";
import image from "../../images/Guides/image3.png";
import "./Guide_3.css";

const Guide_3 = () => {
  return (
    <div>
      <img src={image} className="guide-popup-3-image" />
      <p className="guide-popup-3-content-title">3. Develop Strategies</p>
      <p className="guide-popup-3-content-text">
        The Napoleonic Wars (1803–1815) were a series of conflicts fought
        between the First French Empire under Napoleon Bonaparte (1804–1815) and
        a fluctuating array of European coalitions. The wars originated in
        political forces arising from the French Revolution (1789–1799) and from
        the French Revolutionary Wars (1792–1802) and produced a period of
        French domination over Continental Europe.
      </p>
    </div>
  );
};

export default Guide_3;
