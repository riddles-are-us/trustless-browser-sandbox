import React from "react";
import ImageButton from "./ImageButton";
import endGuideButtonImage from "../../images/Buttons/EndGuide/play.png";
import endGuideButtonHoverImage from "../../images/Buttons/EndGuide/play_hover.png";
import endGuideButtonClickImage from "../../images/Buttons/EndGuide/play_click.png";
import "./EndGuideButton.css";

interface Props {
  onClick: () => void;
}

const EndGuideButton = ({ onClick }: Props) => {
  return (
    <div className="end-guide-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={endGuideButtonImage}
        hoverImagePath={endGuideButtonHoverImage}
        clickedImagePath={endGuideButtonClickImage}
        disabledImagePath={endGuideButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default EndGuideButton;
