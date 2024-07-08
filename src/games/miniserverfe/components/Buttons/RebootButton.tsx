import React from "react";
import ImageButton from "./ImageButton";
import rebootButtonImage from "../../images/Buttons/Reboot/reboot.png";
import rebootButtonHoverImage from "../../images/Buttons/Reboot/reboot_hover.png";
import "./RebootButton.css";

const RebootButton = () => {
  return (
    <ImageButton
      isDisabled={false}
      positionClass="reboot-button-position"
      scaleClass="reboot-button-scale"
      defaultImagePath={rebootButtonImage}
      hoverImagePath={rebootButtonHoverImage}
      clickedImagePath={rebootButtonHoverImage}
      disabledImagePath={rebootButtonImage}
    />
  );
};

export default RebootButton;
