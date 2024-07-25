import "./Gameplay.css";

import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MainMenu from "./MainMenu";
import { useState, useEffect, useRef, memo } from "react";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import "../style.scss";
import "../../style.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectExternal } from "../../../data/automata/properties";
import { selectSelectedCreature } from "../../../data/automata/creatures";
import {
  setIndexes,
  updateIndex,
} from "../../../data/automata/creaturePrograms";

const Gameplay = () => {
  const dispatch = useAppDispatch();
  const external = useAppSelector(selectExternal);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const [draggingModifierIndex, setDraggingModifierIndex] = useState<
    number | null
  >(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCreature) {
      dispatch(
        setIndexes({
          Indexes: selectedCreature.modifiers,
        })
      );
    }
  }, [selectedCreature]);

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
      dispatch(updateIndex({ Index: index, Value: Number(selected) }));
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
    <>
      <TopMenu />
      <div className="middle-container">
        <LeftMenu />
        <MainMenu />
        <RightMenu />
      </div>
    </>
  );
};

export default Gameplay;
