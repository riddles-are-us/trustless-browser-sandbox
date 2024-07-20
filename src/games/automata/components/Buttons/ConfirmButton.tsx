import React from "react";
import ImageButton from "./ImageButton";
import confirmButtonImage from "../../images/Buttons/Confirm/confirm.png";
import confirmButtonHoverImage from "../../images/Buttons/Confirm/confirm_hv.png";
import "./ConfirmButton.css";

const ConfirmButton = () => {
  return (
    <div className="confirm-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={confirmButtonImage}
        hoverImagePath={confirmButtonHoverImage}
        clickedImagePath={confirmButtonHoverImage}
        disabledImagePath={confirmButtonImage}
      />
    </div>
  );
};

export default ConfirmButton;
