import React from "react";
import ImageButton from "./ImageButton";
import nextButtonImage from "../../images/Buttons/HorizontalNextPage/next.png";
import nextButtonHoverImage from "../../images/Buttons/HorizontalNextPage/next_hover.png";
import nextButtonClickImage from "../../images/Buttons/HorizontalNextPage/next_click.png";
import "./HorizontalNextPageButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const HorizontalNextPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="horizontal-next-page-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={nextButtonImage}
        hoverImagePath={nextButtonHoverImage}
        clickedImagePath={nextButtonClickImage}
        disabledImagePath={nextButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default HorizontalNextPageButton;
