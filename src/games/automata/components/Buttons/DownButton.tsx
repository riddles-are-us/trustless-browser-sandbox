import React from "react";
import ImageButton from "./ImageButton";
import downButtonImage from "../../images/Buttons/Down/down.png";
import downButtonHoverImage from "../../images/Buttons/Down/down_hover.png";
import downButtonClickImage from "../../images/Buttons/Down/down_click.png";
import "./DownButton.css";

const DownButton = () => {
  return (
    <div className="down-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={downButtonImage}
        hoverImagePath={downButtonHoverImage}
        clickedImagePath={downButtonClickImage}
        disabledImagePath={downButtonImage}
        onClick={() => {
          /**/
        }}
      />
    </div>
  );
};

export default DownButton;
