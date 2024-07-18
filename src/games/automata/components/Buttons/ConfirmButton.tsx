import React from "react";
import ImageButton from "./ImageButton";
import confirmButtonImage from "../../images/Buttons/Confirm/confirm.png";
import confirmButtonHoverImage from "../../images/Buttons/Confirm/confirm_hv.png";
import "./ConfirmButton.css";

const ConfirmButton = () => {
  return (
    <ImageButton
      isDisabled={false}
      positionClass="confirm-button-position"
      scaleClass="confirm-button-scale"
      defaultImagePath={confirmButtonImage}
      hoverImagePath={confirmButtonHoverImage}
      clickedImagePath={confirmButtonHoverImage}
      disabledImagePath={confirmButtonImage}
    />
  );
};

export default ConfirmButton;
