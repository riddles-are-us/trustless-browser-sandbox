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
        amount={selectedCreature?.entity[0] ?? 0}
      />
      <SmallResourceDisplay
        order={1}
        iconImagePath={NexiumIcon}
        amount={selectedCreature?.entity[1] ?? 0}
      />
      <SmallResourceDisplay
        order={2}
        iconImagePath={SwiftexIcon}
        amount={selectedCreature?.entity[2] ?? 0}
      />
      <SmallResourceDisplay
        order={3}
        iconImagePath={CognisurgeIcon}
        amount={selectedCreature?.entity[3] ?? 0}
      />
      <SmallResourceDisplay
        order={4}
        iconImagePath={VitalshieldIcon}
        amount={selectedCreature?.entity[4] ?? 0}
      />
      <SmallResourceDisplay
        order={5}
        iconImagePath={FlexonixIcon}
        amount={selectedCreature?.entity[5] ?? 0}
      />
    </div>
  );
};

export default SmallResources;
