import React from "react";
import ImageButton from "./ImageButton";
import downButtonImage from "../../images/Buttons/Down/down.png";
import downButtonHoverImage from "../../images/Buttons/Down/down_hover.png";
import downButtonClickImage from "../../images/Buttons/Down/down_click.png";
import "./DownButton.css";

interface Props {
  positionClass: string;
}

const DownButton = ({ positionClass }: Props) => {
  return (
    <ImageButton
      isDisabled={false}
      positionClass={positionClass}
      scaleClass="down-button-scale"
      defaultImagePath={downButtonImage}
      hoverImagePath={downButtonHoverImage}
      clickedImagePath={downButtonClickImage}
      disabledImagePath={downButtonImage}
    />
  );
};

export default DownButton;
