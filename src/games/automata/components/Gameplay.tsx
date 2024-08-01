import "./Gameplay.css";

import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MainMenu from "./MainMenu";
import CreatureUnlockPopup from "./CreatureUnlockPopup";
import { UIState, selectUIState } from "../../../data/automata/properties";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const Gameplay = () => {
  const uIState = useAppSelector(selectUIState);
  const showUnlockPopup = uIState == UIState.Unlock;

  return (
    <>
      <TopMenu />
      <div className="middle-container">
        <LeftMenu />
        <MainMenu />
        <RightMenu />
      </div>
      {showUnlockPopup && <CreatureUnlockPopup />}
    </>
  );
};

export default Gameplay;
