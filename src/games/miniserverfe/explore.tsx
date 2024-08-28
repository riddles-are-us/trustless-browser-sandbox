import React, { useState, useEffect, useRef, memo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ConfirmButton } from './opbutton';
import {useAppSelector} from '../../app/hooks';
import {selectExternal, selectGlobalTimer, selectModifier} from './thunk';
import {EntityAttributes} from './creature';
import {getCounter, getHaltBit, getModifierIndex} from './helper';
import {OverlayTrigger, ProgressBar, Tooltip} from 'react-bootstrap';
import {ProgramInfo} from './modifier';
import { ObjectProperty } from './types';

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
        {children.map((child: any, index: number) => {
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
  function CurrentModifierIndex({currentModifierIndex}: {currentModifierIndex: number}) {
    return (
      <OverlayTrigger placement="bottom"
        overlay={<Tooltip id={`tooltip-${currentModifierIndex}`}><strong>currentModifierIndex: {currentModifierIndex}</strong>.</Tooltip>}
      >
        <div className="currentModifierIndex">
          {currentModifierIndex}
        </div>
      </OverlayTrigger>
    )
  });


function Progress({objects, mIndex, haltBit, currentModifierIndex, index}: {objects: Array<ObjectProperty>, mIndex: number, haltBit: number, currentModifierIndex: number, index: number}) {
  let progress = 0;
  const external = useAppSelector(selectExternal);
  const selectedIndex = external.getSelectedIndex();
  const globalTime = useAppSelector(selectGlobalTimer);
  const modifiersInfo = useAppSelector(selectModifier);
  const delay = modifiersInfo[mIndex].delay;
  if(objects.length != 0
       && objects.length > selectedIndex!
       && haltBit != 1
       && currentModifierIndex == index) {
    const counter = getCounter(objects[selectedIndex!].modifier_info);
    progress = ((globalTime - counter) / delay) * 100;

    return <ProgressBar variant="info" now={progress} style={{marginTop:"10px"}} />;
  } else {
    return <></>
  }
}

export function Explore({objects, modifiers, nonce}: {objects: Array<ObjectProperty>, modifiers: Array<number | null>, nonce: bigint}) {
  const external = useAppSelector(selectExternal);
  const selectedIndex = external.getSelectedIndex();
  const modifiersInfo = useAppSelector(selectModifier);
  function ModifierTooltipInfo({mIndex}: {mIndex: number | null}) {
    if (mIndex != null) {
      return (<div className="programItem">
        <ProgramInfo
          name={modifiersInfo[mIndex].name}
          entity = {modifiersInfo[mIndex].entity}
          local = {modifiersInfo[mIndex].local}
          delay = {modifiersInfo[mIndex].delay}
        />
      </div>)
    } else {
      return(<>Not fullfilled</>)
    }
  }

  let displayModifiers = modifiers;

  if (selectedIndex != null) {
    let currentObj = objects[selectedIndex];
    let tips = "";
    if (external.userActivity == "creating") {
      currentObj = {entity:[], object_id:[], modifiers: [], modifier_info:"0"};
      tips = "Please drag modifiers to fill the 8 grids to create creature!";
    } else if (external.userActivity == "browsing") {
      displayModifiers = currentObj.modifiers;
    } // else is rebooting, empty clause


    const currentModifierIndex = getModifierIndex(currentObj.modifier_info);
    const haltBit = getHaltBit(currentObj.modifier_info);

    return (<div className="explore">
      <div className="tip">
        <div>{tips}</div>
      </div>
      {<EntityAttributes robot={currentObj} />}
      <CurrentModifierIndex currentModifierIndex={currentModifierIndex} />
      {
        <CircleLayout>
          {
            displayModifiers.map((mIndex, index) => {
              let color = "";
              if(mIndex!=null) {
                if(haltBit == 1 && currentModifierIndex == index) {
                  if (external.userActivity == "rebooting") {
                    color = "green";
                  } else {
                    color = "red";
                  }
                } else if(haltBit != 1 && currentModifierIndex == index) {
                  color = "green";
                } else {
                  color = "yellow";
                }
              }
              if (mIndex!=null && modifiersInfo && modifiersInfo[mIndex]) {
                return (
                  <div key={index}>
                    <OverlayTrigger placement="bottom" overlay= {
                      <Tooltip id={`tooltip-${index}`}>
                        <ModifierTooltipInfo mIndex = {mIndex}/>
                      </Tooltip>
                    }>
                      <div className="exploreItem" style={{backgroundColor: color}}>
                        {modifiersInfo[mIndex].name}
                      </div>
                    </OverlayTrigger>
                    {<Progress objects={objects} mIndex={mIndex} haltBit={haltBit} currentModifierIndex={currentModifierIndex} index={index} />}
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <OverlayTrigger placement="bottom" overlay= {
                      <Tooltip id={`tooltip-${index}`}>
                              Not Assigned
                      </Tooltip>
                    }>
                    <div className="exploreItem" style={{backgroundColor: color}}></div>
                    </OverlayTrigger>
                  </div>
                );
              }
            })
          }
        </CircleLayout>
      }
      {<ConfirmButton modifiers={modifiers} nonce={nonce}></ConfirmButton>}
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