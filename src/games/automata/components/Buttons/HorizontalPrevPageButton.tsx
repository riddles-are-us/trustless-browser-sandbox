import React from "react";
import ImageButton from "./ImageButton";
import backButtonImage from "../../images/Buttons/HorizontalPrevPage/back.png";
import backButtonHoverImage from "../../images/Buttons/HorizontalPrevPage/back_hover.png";
import backButtonClickImage from "../../images/Buttons/HorizontalPrevPage/back_click.png";
import disabledButtonClickImage from "../../images/Buttons/HorizontalPrevPage/back_idle.png";
import "./HorizontalPrevPageButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const HorizontalPrevPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="horizontal-prev-page-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={backButtonImage}
        hoverImagePath={backButtonHoverImage}
        clickedImagePath={backButtonClickImage}
        disabledImagePath={disabledButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default HorizontalPrevPageButton;
