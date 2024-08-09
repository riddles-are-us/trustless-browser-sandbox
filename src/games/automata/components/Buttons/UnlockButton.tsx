import React from "react";
import ImageButton from "./ImageButton";
import unlockButtonImage from "../../images/Buttons/Unlock/unlock.png";
import unlockButtonHoverImage from "../../images/Buttons/Unlock/unlock_hover.png";
import unlockButtonClickImage from "../../images/Buttons/Unlock/unlock_click.png";
import "./UnlockButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const UnlockButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="unlock-button">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={unlockButtonImage}
        hoverImagePath={unlockButtonHoverImage}
        clickedImagePath={unlockButtonClickImage}
        disabledImagePath={unlockButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UnlockButton;
