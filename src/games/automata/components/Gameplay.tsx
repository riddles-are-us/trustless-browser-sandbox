import "./Gameplay.css";

import TopMenu from "./TopMenu";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import MainMenu from "./MainMenu";
import { useState, useEffect, useRef, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "../style.scss";
import "../../style.scss";
import { useAppSelector } from "../../../app/hooks";
import { selectExternal } from "../../../data/automata/properties";
import { selectPrograms } from "../../../data/automata/programs";
import {
  selectSelectedCreature,
  CreatureModel,
} from "../../../data/automata/creatures";

interface Props {
  playerIds: string;
  address: string;
  objects: Array<CreatureModel>;
}

const Gameplay = ({ playerIds, address, objects }: Props) => {
  const external = useAppSelector(selectExternal);
  const selectedCreature = useAppSelector(selectSelectedCreature);
  const programs = useAppSelector(selectPrograms);
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
    if (selectedCreature) {
      if (external.userActivity == "creating") {
        setDropList([...cacheDropList]);
      } else {
        const arr: number[] = [];
        selectedCreature.modifiers.map((modifier) => {
          arr.push(modifier);
        });
        setDropList(arr);
      }
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
