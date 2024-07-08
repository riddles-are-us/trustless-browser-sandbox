import React from "react";
import ImageButton from "./ImageButton";
import newButtonImage from "../../images/Buttons/New/new.png";
import newButtonHoverImage from "../../images/Buttons/New/new_hover.png";
import newButtonClickImage from "../../images/Buttons/New/new_click.png";
import "./NewButton.css";

interface Props {
  positionClass: string;
}

const NewButton = ({ positionClass }: Props) => {
  return (
    <ImageButton
      isDisabled={false}
      positionClass={positionClass}
      scaleClass="new-button-scale"
      defaultImagePath={newButtonImage}
      hoverImagePath={newButtonHoverImage}
      clickedImagePath={newButtonClickImage}
      disabledImagePath={newButtonImage}
    />
  );
};

export default NewButton;
