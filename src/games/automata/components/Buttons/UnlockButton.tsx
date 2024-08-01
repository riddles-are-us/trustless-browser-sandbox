import React from "react";
import ImageButton from "./ImageButton";
import unlockButtonImage from "../../images/Buttons/Unlock/unlock.png";
import unlockButtonHoverImage from "../../images/Buttons/Unlock/unlock_hover.png";
import unlockButtonClickImage from "../../images/Buttons/Unlock/unlock_click.png";
import "./UnlockButton.css";

interface Props {
  onClick: () => void;
}

const UnlockButton = ({ onClick }: Props) => {
  return (
    <div className="unlock-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={unlockButtonImage}
        hoverImagePath={unlockButtonHoverImage}
        clickedImagePath={unlockButtonClickImage}
        disabledImagePath={unlockButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UnlockButton;
