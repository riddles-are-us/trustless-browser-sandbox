import {useAppSelector} from "../../app/hooks";
import {selectEntityAttributes, selectLocalAttributes} from "./thunk";

export interface Modifier {
   delay: number,
   entity: Array<number>,
   local: Array<number>,
   name: string,
}

export function ProgramInfo(
        {name, entity, local, delay}:
        {name: string, entity: Array<number>, local: Array<number>, delay: number}) {
  const attrArray: any[] = [];
  const entityAttributes = useAppSelector(selectEntityAttributes);
  const localAttributes = useAppSelector(selectLocalAttributes);
  {entity.map((item: any, index: number) => {
    if (item != 0) {
      const obj = {"entity": entityAttributes[index], "item": item};
      attrArray.push(obj);
    }
  })}
  {local.map((item: any, index: number) => {
    if (item != 0) {
      const obj = {"local": localAttributes[index], "item": item};
      attrArray.push(obj);
    }
  })}
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
                  if(attr.entity) {
                    return (
                      <div key={j}>[{attr.entity}:{attr.item}]</div>
                    )
                  } else if(attr.local) {
                    return (
                      <div key={j}>[{attr.local}:{attr.item}]</div>
                    )
                  }
                }
              })
            }
          </div>
        )
      }
    </div>
  )
}

