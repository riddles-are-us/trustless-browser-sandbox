import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectEntityAttributes, selectLocalAttributes} from "./thunk";

export function ProgramInfo(
        {name, entity, local, delay}:
        {name: string, entity: Array<number>, local: Array<number>, delay: number}) {
  const attrArray: Array<{"attrName": string, "value": number}> = [];
  const entityAttributes = useAppSelector(selectEntityAttributes);
  const localAttributes = useAppSelector(selectLocalAttributes);

  if(entity) {
    entity.map((value: number, index: number) => {
      const obj = {"attrName": entityAttributes[index], "value": value};
      attrArray.push(obj);
    })
  }

  if(local) {
    local.map((value: number, index: number) => {
      const obj = {"attrName": localAttributes[index], "value": value};
      attrArray.push(obj);
    })
  }
  return (
    <div className="programInfo">
      <div>{name}({delay})</div>
      {
        Array.from({ length: 3 }).map((_, i) =>
          <div key={i}>
            {
              Array.from({ length: 3 }).map((_, j) => {
                if(attrArray[i * 3 + j] != undefined) {
                  const attr = attrArray[i * 3 + j];
                  return (
                    <div key={j}>[{attr.attrName}:{attr.value}]</div>
                  )
                }
              })
            }
          </div>
        )
      }
    </div>
  )
}