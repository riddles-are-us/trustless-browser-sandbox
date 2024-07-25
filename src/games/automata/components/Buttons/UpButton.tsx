import React from "react";
import ImageButton from "./ImageButton";
import upButtonImage from "../../images/Buttons/Up/up.png";
import upButtonHoverImage from "../../images/Buttons/Up/up_hover.png";
import upButtonClickImage from "../../images/Buttons/Up/up_click.png";
import "./UpButton.css";

interface Props {
  onClick: () => void;
}

const UpButton = ({ onClick }: Props) => {
  return (
    <div className="up-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={upButtonImage}
        hoverImagePath={upButtonHoverImage}
        clickedImagePath={upButtonClickImage}
        disabledImagePath={upButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default UpButton;
