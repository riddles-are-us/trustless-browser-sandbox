import React from 'react';
import { ObjectProperty } from './types';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {useAppSelector} from '../../app/hooks';
import {selectEntityAttributes, selectExternal} from './thunk';

interface externalState {
  selectedCreatureIndex: number,
}

const CreatureTitleTooltip = ({name, objContent}: {name: string, objContent: string}) => {
  return (
    <Tooltip id={`tooltip-${name}`}>
      <strong>{objContent}</strong>
    </Tooltip>
  )
};

export function Creature({robot, index, isSelected, clickHandler}: {robot: ObjectProperty, index: number, isSelected: boolean, clickHandler: (index: number) => void}) {
  const external = useAppSelector(selectExternal);
  // Convert object_id to hex string
  const objId = robot.object_id.join("");
  const beenCreated = robot.object_id.length != 0;
  let objContent = "";
  if (beenCreated) {
    objContent = BigInt(objId).toString(16);
  } else {
    objContent = "Creating";
  }

  if ((external.userActivity != "creating" && beenCreated) || external.userActivity == "creating") {
    return (
      <OverlayTrigger key={index} placement="bottom"
        overlay={CreatureTitleTooltip({name: index.toString(), objContent: objContent})}
      >
        <div className="creature" key={index} id={String(index)}
                onClick={() => {clickHandler(index);}}
                style={{ backgroundColor: isSelected ? "yellow" : "transparent" }}>
          <img className="creatureImg" src={require("./images/robot.png")} />
          <div className="objId">{ objContent }</div>
        </div>
      </OverlayTrigger>
    )
  } else {
    return <></>
  }
}


export function EntityAttributes({robot}: {robot: ObjectProperty}) {
  const entitiesInfo = useAppSelector(selectEntityAttributes);
  return (
    <div className="entity">
      {
        robot.entity.map((item, index) => {
          return <span key={index}>{entitiesInfo[index]}: {item} </span>;
        })
      }
    </div>
  )
}
