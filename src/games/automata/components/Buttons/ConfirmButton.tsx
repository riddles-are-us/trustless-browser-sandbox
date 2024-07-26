import React from "react";
import ImageButton from "./ImageButton";
import confirmButtonImage from "../../images/Buttons/Confirm/confirm.png";
import confirmButtonHoverImage from "../../images/Buttons/Confirm/confirm_hv.png";
import "./ConfirmButton.css";

interface Props {
  onClick: () => void;
}

const ConfirmButton = ({ onClick }: Props) => {
  return (
    <div className="confirm-button">
      <ImageButton
        isDisabled={false}
        defaultImagePath={confirmButtonImage}
        hoverImagePath={confirmButtonHoverImage}
        clickedImagePath={confirmButtonHoverImage}
        disabledImagePath={confirmButtonImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ConfirmButton;
