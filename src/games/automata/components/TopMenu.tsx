import React from "react";
import "./TopMenu.css";
import AccountInfo from "./AccountInfo";
import MediumResources from "./MediumResources";
import SmallResources from "./SmallResources";

const TopMenu = () => {
  return (
    <div className="top">
      <div className="top-left"></div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <AccountInfo />
      <MediumResources />
      <SmallResources />
    </div>
  );
};

export default TopMenu;
