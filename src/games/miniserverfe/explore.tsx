import React, { useState, useEffect, useRef, memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ConfirmButton } from './opbutton';
import {useAppSelector} from '../../app/hooks';
import {selectEntityAttributes, selectExternal, selectGlobalTimer, selectLocalAttributes, selectModifier} from './thunk';
import {EntityAttributes} from './creature';
import {getCounter, getHaltBit, getModifierIndex} from './helper';
import {OverlayTrigger, ProgressBar, Tooltip} from 'react-bootstrap';
import {ProgramInfo} from './modifier';

export function CircleLayout(
        { children }: {children: any}) {
  const exploreBoxRef = useRef<HTMLDivElement>(null);
  const [parentW, setParentW] = useState(0);
  const [parentH, setParentH] = useState(0);

  function resizeChange() {
    if(exploreBoxRef.current) {
      setParentW(exploreBoxRef.current.offsetWidth);
      setParentH(exploreBoxRef.current.offsetHeight);
    }
  }

  useEffect(() => {
    if(exploreBoxRef.current) {
      setParentW(exploreBoxRef.current.offsetWidth);
      setParentH(exploreBoxRef.current.offsetHeight);
    }
    window.addEventListener("resize", resizeChange);
  }, []);

    const angleStep = 360 / 8;
    return (
      <div className="exploreBox" ref={exploreBoxRef}>
        {children.map((child: any, index: any) => {
          const angle = angleStep * (index - 2);
          const r=200;
          const radians = (angle * Math.PI) / 180;
          const x = parentW / 2 - 50 + Math.cos(radians) * r;
          const y = parentH / 2 - 50  + Math.sin(radians) * r;
          const { setNodeRef } = useDroppable({
            id: "droppable" + index
          });

          return (
            <div
              ref={setNodeRef}
              key={index}
              style={{
                position: 'absolute',
                top: `${y}px`,
                left: `${x}px`
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
}

const CurrentModifierIndex = memo(
  function CurrentModifierIndex(props: any) {
    const currentMI = props.currentModifierIndex;
    return (
      <OverlayTrigger key={currentMI} placement="bottom"
        overlay={<Tooltip id={`tooltip-${currentMI}`}><strong>currentModifierIndex: {props.currentModifierIndex}</strong>.</Tooltip>}
      >
        <div className="currentModifierIndex">
          {props.currentModifierIndex}
        </div>
      </OverlayTrigger>
    )
  });


function Progress({objects, delay}: {objects: Array<any>, delay: number}) {
  let progress = 0;
  const external = useAppSelector(selectExternal);
  const selectedIndex = external.getSelectedIndex();
  const globalTime = useAppSelector(selectGlobalTimer);
  const counter = getCounter(objects[selectedIndex!].modifier_info);
  progress = ((globalTime - counter) / delay) * 100;
  return <ProgressBar variant="info" now={progress} style={{marginTop:"10px"}} />;
}


export function Explore({objects, modifiers}: {objects: Array<any>, modifiers: Array<number>}) {
  const external = useAppSelector(selectExternal);
  const selectedIndex = external.getSelectedIndex();
  const modifiersInfo = useAppSelector(selectModifier);
  function ModifierTooltipInfo({mIndex}: {mIndex: number | null}) {
    if (mIndex) {
      return (<div className="programItem">
        <ProgramInfo
          name={modifiersInfo[mIndex][3]}
          entity = {modifiersInfo[mIndex][1]}
          local = {modifiersInfo[mIndex][2]}
          delay = {modifiersInfo[mIndex][0]}
        />
      </div>)
    } else {
      return(<>Not fullfilled</>)
    }
  }


  if (selectedIndex != null) {
    let currentObj = objects[selectedIndex];
    if (external.userActivity == "creating") {
        currentObj = {entity:[], object_id:[], modifiers: [], modifier_info:"0"}
    }

    const currentModifierIndex = getModifierIndex(currentObj.modifier_info);
    const haltBit = getHaltBit(currentObj.modifier_info);

    return (<div className="explore">
            <div className="tip">
               {<div>Please drag modifiers to fill the 8 grids!</div>}
            </div>
            {<EntityAttributes robot={objects[selectedIndex!]} />}

            <CurrentModifierIndex currentModifierIndex={currentModifierIndex} />
            {
              <CircleLayout>
                {
                  modifiers.map((item, index) => {
                    let color = "";
                    if(item) {
                      if(haltBit == 1 && currentModifierIndex == index) {
                        color = "red";
                      } else if((haltBit == 0 || haltBit == 2) && currentModifierIndex == index) {
                        color = "green";
                      } else {
                        color = "yellow";
                      }
                    }
                    const mIndex = item;
                    return (
                      <div key={index}>
                        <OverlayTrigger placement="bottom" overlay= {
                            <Tooltip id={`tooltip-${index}`}>
                                <ModifierTooltipInfo mIndex = {mIndex}/>
                            </Tooltip>
                        }>
                          <div className="exploreItem" style={{backgroundColor: color}}>
                            {modifiersInfo[mIndex][3]}
                          </div>
                        </OverlayTrigger>
                        { mIndex
                              && currentModifierIndex == index
                              && haltBit != 1
                              && <Progress objects={objects} delay={modifiersInfo[mIndex!][0]} />}
                      </div>
                    );
                  })
                }
              </CircleLayout>
            }
            {<ConfirmButton modifiers={modifiers}></ConfirmButton>}
          </div>
  );
  } else {
    return(
      <div className="explore">
        <div className="tip">
          <div>No Robot has been selected</div>
        </div>
      </div>
    );
  }
}

