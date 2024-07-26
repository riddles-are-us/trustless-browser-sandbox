import React from "react";
import EnercoreIcon from "../images/Icons/Enercore.png";
import NexiumIcon from "../images/Icons/Nexium.png";
import SwiftexIcon from "../images/Icons/Swiftex.png";
import CognisurgeIcon from "../images/Icons/Cognisurge.png";
import VitalshieldIcon from "../images/Icons/Vitalshield.png";
import FlexonixIcon from "../images/Icons/Flexonix.png";
import SmallResourceDisplay from "./SmallResourceDisplay";
import { useAppSelector } from "../../../app/hooks";

import { selectSelectedCreature } from "../../../data/automata/creatures";
import "./SmallResources.css";

const SmallResources = () => {
  const selectedCreature = useAppSelector(selectSelectedCreature);
  return (
    <div className="top-small-resources-container">
      <SmallResourceDisplay
        order={0}
        iconImagePath={EnercoreIcon}
        amount={selectedCreature.rareResources.enercoreAmount}
      />
      <SmallResourceDisplay
        order={1}
        iconImagePath={NexiumIcon}
        amount={selectedCreature.rareResources.nexiumAmount}
      />
      <SmallResourceDisplay
        order={2}
        iconImagePath={SwiftexIcon}
        amount={selectedCreature.rareResources.swiftexAmount}
      />
      <SmallResourceDisplay
        order={3}
        iconImagePath={CognisurgeIcon}
        amount={selectedCreature.rareResources.cognisurgeAmount}
      />
      <SmallResourceDisplay
        order={4}
        iconImagePath={VitalshieldIcon}
        amount={selectedCreature.rareResources.vitalshieldAmount}
      />
      <SmallResourceDisplay
        order={5}
        iconImagePath={FlexonixIcon}
        amount={selectedCreature.rareResources.flexonixAmount}
      />
    </div>
  );
};

export default SmallResources;
