import "./Gameplay.css";

import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MainMenu from "./MainMenu";
import { UIState, selectUIState } from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import GuidePopup from "./GuidePopup";
import ResourceAnimations from "./ResourceAnimations";

const Gameplay = () => {
  const uIState = useAppSelector(selectUIState);
  const showGuidePopup = uIState == UIState.Guide;

  return (
    <>
      <ResourceAnimations />
      <TopMenu />
      <div className="middle-container">
        <LeftMenu />
        <MainMenu />
        <RightMenu />
      </div>
      {showGuidePopup && <GuidePopup />}
    </>
  );
};

export default Gameplay;
