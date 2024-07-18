import { useState, useEffect, useRef, memo } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CreateObjectModal } from "./createObject";
import "./style.scss";
import "../style.scss";
import { useAppSelector } from "../../app/hooks";
import { selectExternal, selectLocalAttributes, selectModifier } from "./thunk";
import { CreatureModel } from "../../data/automata";
import { Creature } from "./creature";
import { ProgramInfo } from "./modifier";
import { CreateButton } from "./opbutton";
import { ErrorAlert } from "./error";
import { Explore } from "./explore";

interface Props {
  playerIds: string;
  address: string;
  localValues: number[];
  objects: Array<CreatureModel>;
}

const OldGameplay = ({ playerIds, address, localValues, objects }: Props) => {
  const external = useAppSelector(selectExternal);
  const modifiersInfo = useAppSelector(selectModifier);
  const localAttributes = useAppSelector(selectLocalAttributes);
  const [draggingModifierIndex, setDraggingModifierIndex] = useState<
    number | null
  >(null);

  // modified modifier array
  const [dropList, setDropList] = useState<Array<number | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [cacheDropList, setCacheObjDropList] = useState<Array<number | null>>(
    []
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cIndex = external.getSelectedIndex();
    if (cIndex) {
      if (external.userActivity == "creating") {
        setDropList([...cacheDropList]);
      } else {
        const currentObj = objects[cIndex];
        const arr: number[] = [];
        currentObj.modifiers.map((modifier) => {
          arr.push(modifier);
        });
        setDropList(arr);
      }
    }
  }, [external]);

  function Preview({ index }: { index: number | null }) {
    if (index != null && modifiersInfo && modifiersInfo[index]) {
      return (
        <div className="preview">
          <ProgramInfo
            name={modifiersInfo[index].name}
            entity={modifiersInfo[index].entity}
            local={modifiersInfo[index].local}
            delay={modifiersInfo[index].delay}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  const DragableModifier = memo(function DragableModifier(props: any) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: props.index,
      });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="programItem"
      >
        <ProgramInfo {...props}></ProgramInfo>
      </div>
    );
  });

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setDraggingModifierIndex(Number(active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const selected = event.active.id;
    if (
      event.over &&
      typeof event.over.id == "string" &&
      event.over.id.includes("droppable")
    ) {
      const index = Number(event.over.id.replace("droppable", ""));
      const arr = [...dropList];
      arr[index] = Number(selected);
      setDropList(arr);
      setCacheObjDropList(arr);
    }
    setDraggingModifierIndex(null);
  }

  function changeScrollRef() {
    // Scroll to bottom
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 1000);
  }

  useEffect(() => {
    if (external.userActivity === "creating") {
      changeScrollRef();
    }
  }, [external.userActivity]);

  return (
    <div className="controller">
      <CreateObjectModal />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="errorAlert">
          <ErrorAlert />
        </div>
        <Row className="player">
          <Col className="local">
            {localAttributes.map((item, index) => {
              return (
                <OverlayTrigger
                  key={index}
                  placement="bottom"
                  overlay={
                    <Tooltip id={`tooltip-${index}`}>
                      <strong>{item}</strong>
                    </Tooltip>
                  }
                >
                  <div className="localItem" key={index}>
                    {item}:
                    {localValues.length != 0 ? (
                      <span className="value">{localValues[index]}</span>
                    ) : (
                      <span className="value">0</span>
                    )}
                  </div>
                </OverlayTrigger>
              );
            })}
          </Col>
          <Col xs={3}>
            <OverlayTrigger
              key={address}
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${playerIds}`}>
                  <strong>{address}</strong>.
                </Tooltip>
              }
            >
              <div className="playerIds">playerIds: {address}</div>
            </OverlayTrigger>
          </Col>
        </Row>

        <div className="main">
          <div className="creatures">
            <div className="title">CREATURES</div>
            <div className="creatureBox" ref={scrollRef}>
              {objects.map((item, index) => (
                <Creature key={index} robot={item} index={index} />
              ))}
              <Creature
                key={objects.length}
                index={objects.length}
                robot={{
                  entity: [],
                  object_id: [],
                  modifiers: [],
                  modifier_info: "0",
                }}
              />
            </div>
            <div className="createObject">
              {<CreateButton objects={objects} />}
            </div>
          </div>
          <Explore objects={objects} modifiers={dropList} />
          <div className="program">
            <div className="title">PROGRAM</div>
            <div className="draggableBox">
              <SortableContext
                items={modifiersInfo.map((_, index) => index)}
                strategy={verticalListSortingStrategy}
              >
                {modifiersInfo.map((modifier, index) => (
                  <DragableModifier
                    key={index}
                    index={String(index)}
                    name={modifier.name}
                    entity={modifier.entity}
                    local={modifier.local}
                    delay={modifier.delay}
                  />
                ))}
              </SortableContext>
              <DragOverlay>
                <Preview index={draggingModifierIndex} />
              </DragOverlay>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default OldGameplay;
