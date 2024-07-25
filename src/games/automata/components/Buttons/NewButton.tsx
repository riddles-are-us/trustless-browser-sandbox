import React from "react";
import ImageButton from "./ImageButton";
import newButtonImage from "../../images/Buttons/New/new.png";
import newButtonHoverImage from "../../images/Buttons/New/new_hover.png";
import newButtonClickImage from "../../images/Buttons/New/new_click.png";
import "./NewButton.css";

interface Props {
  onClick: () => void;
}

const NewButton = ({ onClick }: Props) => {
  return (
    <div className="new-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={newButtonImage}
        hoverImagePath={newButtonHoverImage}
        clickedImagePath={newButtonClickImage}
        disabledImagePath={newButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default NewButton;
