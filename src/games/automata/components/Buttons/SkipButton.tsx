import React from "react";
import ImageButton from "./ImageButton";
import playButtonImage from "../../images/Buttons/Play/play.png";
import playButtonHoverImage from "../../images/Buttons/Play/play_hover.png";
import playButtonClickImage from "../../images/Buttons/Play/play_click.png";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const SkipButton = ({ isDisabled, onClick }: Props) => {
  return (
    <ImageButton
      isDisabled={isDisabled}
      defaultImagePath={playButtonImage}
      hoverImagePath={playButtonHoverImage}
      clickedImagePath={playButtonClickImage}
      disabledImagePath={playButtonImage}
      onClick={onClick}
    />
  );
};

export default SkipButton;
