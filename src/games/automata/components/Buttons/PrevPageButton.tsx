import React from "react";
import ImageButton from "./ImageButton";
import upButtonImage from "../../images/Buttons/Up/up.png";
import upButtonHoverImage from "../../images/Buttons/Up/up_hover.png";
import upButtonClickImage from "../../images/Buttons/Up/up_click.png";
import "./PrevPageButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const PrevPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="prev-page-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={upButtonImage}
        hoverImagePath={upButtonHoverImage}
        clickedImagePath={upButtonClickImage}
        disabledImagePath={upButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default PrevPageButton;
