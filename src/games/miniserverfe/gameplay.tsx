import React from "react";
import "./gameplay.css";
import TopMenu from "./components/TopMenu";
import LeftMenu from "./components/LeftMenu";
import MainMenu from "./components/MainMenu";
import RightMenu from "./components/RightMenu";

const Gameplay = () => {
  return (
    <div className="container">
      <TopMenu />
      <div className="middle-container">
        <LeftMenu />
        <MainMenu />
        <RightMenu />
      </div>
    </div>
  );
};

export default Gameplay;
