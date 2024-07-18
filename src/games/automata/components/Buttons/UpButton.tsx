import React from "react";
import ImageButton from "./ImageButton";
import upButtonImage from "../../images/Buttons/Up/up.png";
import upButtonHoverImage from "../../images/Buttons/Up/up_hover.png";
import upButtonClickImage from "../../images/Buttons/Up/up_click.png";
import "./UpButton.css";

interface Props {
  positionClass: string;
}

const UpButton = ({ positionClass }: Props) => {
  return (
    <ImageButton
      isDisabled={false}
      positionClass={positionClass}
      scaleClass="up-button-scale"
      defaultImagePath={upButtonImage}
      hoverImagePath={upButtonHoverImage}
      clickedImagePath={upButtonClickImage}
      disabledImagePath={upButtonImage}
    />
  );
};

export default UpButton;
