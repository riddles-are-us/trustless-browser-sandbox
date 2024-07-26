import "./Gameplay.css";

import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MainMenu from "./MainMenu";
import "../style.scss";
import "../../style.scss";

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
