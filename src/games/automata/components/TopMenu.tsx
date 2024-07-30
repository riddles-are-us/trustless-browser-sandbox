import React from "react";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import CommonResources from "./CommonResources";
import SmallResources from "./RareResources";

const TopMenu = () => {
  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <AccountInfo />
      <CommonResources />
      <SmallResources />
    </div>
  );
};

export default TopMenu;
