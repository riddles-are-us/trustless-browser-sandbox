import React from "react";
import ImageButton from "./ImageButton";
import rebootButtonImage from "../../images/Buttons/Reboot/reboot.png";
import rebootButtonHoverImage from "../../images/Buttons/Reboot/reboot_hover.png";
import "./RebootButton.css";

const RebootButton = () => {
  return (
    <div className="reboot-button">
      <ImageButton
        isDisabled={false}
        defaultImagePath={rebootButtonImage}
        hoverImagePath={rebootButtonHoverImage}
        clickedImagePath={rebootButtonHoverImage}
        disabledImagePath={rebootButtonImage}
        onClick={() => {
          /**/
        }}
      />
    </div>
  );
};

export default RebootButton;
