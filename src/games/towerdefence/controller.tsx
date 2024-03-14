import init, * as gameplay from "./js";
import { drawObjects, drawTiles } from "./tile";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ImageMD5 } from "./js/config";
import { Container} from "react-bootstrap";

import {DndContext, DragEndEvent} from '@dnd-kit/core';

// ZKWASM RELATED STUFF
import { selectCommands, selectMessageToSigned, selectMsgHash, setReadyToSubmit } from "../../data/game";

import {
  selectL2Account,
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  setMD5,
  appendCommand,
} from "../../data/game";

import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import "./style.scss";

// Within your component that receives `transform` from `useDraggable`:
//const style = {
//   transform: CSS.Translate.toString(transform),
//}
//

interface TileProp {
  index: number;
  children: React.ReactNode
}

function Droppable(props: TileProp) {
  const {isOver, setNodeRef} = useDroppable({
      id: props.index,
  });

  return (
    <div ref={setNodeRef} className="droppable-tile">
        {props.index} - {props.children}
    </div>
  );
}

interface TowerProp {
  id: string;
  children: React.ReactNode
}


function Draggable(props:TowerProp) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: props.id,
      data: {node: props.children}
  });
  const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
       {props.children}
    </button>
  );
}


export function GameController() {
  // Game Loading Status
  /* Test merkle root
     6411109203874391172
     12156582326191033569
     18190570047656100927
     2451350522329201736
  */

  const dispatch = useAppDispatch();

  const l2account = useAppSelector(selectL2Account);
  const gameLoaded = useAppSelector(selectGameLoaded);
  const [timer, setTimer] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [tiles, setTiles] = useState<Array<any>>([]);

  function initGame(l2account: number) {
    (init as any)().then(() => {
      console.log("setting instance");
      console.log(gameplay);
      gameplay.init(BigInt(l2account));
      const objs = gameplay.get_objects();
      console.log("objs", objs);

      const tilesStr = gameplay.get_tiles();
      const tilesData = JSON.parse(tilesStr);
      console.log("tiles", tilesData);
      for (let i=0;i<96;i++) {
          const feature = tilesData[i].feature;
          if (feature != null) {
              if (feature  == "Bottom") {
                  tiles[i] = <i className="bi bi-arrow-down-circle"></i>
              } else if (feature  == "Top") {
                  tiles[i] = <i className="bi bi-arrow-top-circle"></i>
              } else if (feature  == "Left") {
                  tiles[i] = <i className="bi bi-arrow-left-circle"></i>
              } else if (feature  == "Right") {
                  tiles[i] = <i className="bi bi-arrow-right-circle"></i>
              }
          }
      }
      setTiles(tiles);
      drawTiles(tilesData);

      const objects = JSON.parse(objs);
      drawObjects(objects);
      dispatch(setMD5(ImageMD5));
      dispatch(setLoaded(true));
    });
  }

  function stepMove() {
    (init as any)().then(() => {
      console.log("moving ");
      const command = (0n<<32n);
      dispatch(appendCommand(command));
      gameplay.step(command);
      const objs = gameplay.get_objects();
      console.log("objs", objs);
      const tilesStr = gameplay.get_tiles();
      const tilesData = JSON.parse(tilesStr);
      console.log("tiles", tilesData);
      drawTiles(tilesData);

      const objects = JSON.parse(objs);
      drawObjects(objects);
      dispatch(setReadyToSubmit(true));
    });

  }

   useEffect(() => {
     if (l2account) {
         if (gameLoaded == false) {
             initGame(Number(BigInt("0x" + l2account.address)));
         }
     }
   }, [l2account]);

   useEffect(() => {
     if (l2account && gameLoaded && play && timer < 200) {
             console.log("timer...");
             setTimeout(()=>{
                     stepMove();
                     setTimer(timer+1);
             }, 1000)
     }
   }, [timer, play]);


   function handle_drop(event:DragEndEvent) {
     console.log("event", event);
     console.log("tilesDrop", tiles);
     const t = tiles.slice(0);
     t[event.over!.id as number] = event.active.data.current!.node;
     setTiles(t);
     console.log("tilesDrop", t);
   }

   return (
   <>
     { !play &&
     <DndContext onDragEnd={handle_drop}>
        <Container>
          <Draggable id="tower-left" >
                <i className="bi bi-arrow-left-square"></i>
          </Draggable>
          <Draggable id="tower-right" >
                <i className="bi bi-arrow-right-square"></i>
          </Draggable>
          <Draggable id="tower-top" >
                <i className="bi bi-arrow-up-square"></i>
          </Draggable>
          <Draggable id="tower-bottom" >
                <i className="bi bi-arrow-down-square"></i>
          </Draggable>
        </Container>
        <Container>
          {Array.from({length:8}, (_, j) =>
             <Row className="justify-content-center">
               {Array.from({length: 12}, (_, i) =>
                 <Col key={i}><Droppable index={j*12+i}>{tiles[j*12+i]}</Droppable></Col>
               )
               }
             </Row>
          )}
        </Container>
     </DndContext>
     }
     <Container className="mt-5">
     <Row>
       <Col>
           <Button className="float-end" onClick={()=>setPlay(true)}>Play</Button>
           <Button className="float-end" onClick={()=>setPlay(false)}>Stop</Button>
           <Button className="float-end" onClick={()=>{return}}>PlaceTower</Button>
       </Col>
     </Row>
     </Container>
     <Row className="text-center">
         <Col>
     <canvas id="canvas" height="500" width="740"></canvas>
         </Col>
     </Row>
   </>
   );
}
