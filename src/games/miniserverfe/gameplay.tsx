import React from "react";
import "./Gameplay.css";
import TopMenu from "./components/TopMenu";
import LeftMenu from "./components/LeftMenu";
import MainMenu from "./components/MainMenu";
import RightMenu from "./components/RightMenu";

const Gameplay = () => {
  return (
    <>
      <TopMenu />
      <div className="middle-container">
        <LeftMenu />
        <MainMenu />
        <RightMenu />
      </div>
    </>
  );
};

export default Gameplay;
