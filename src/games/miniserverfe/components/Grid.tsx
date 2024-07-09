import React from "react";
import "./Grid.css";
import Creature from "./Creature";

interface Props {
  elementWidth: number;
  elementHeight: number;
  columnCount: number;
  rowCount: number;
}

const Grid = ({
  elementWidth,
  elementHeight,
  columnCount,
  rowCount,
}: Props) => {
  return (
    <div
      className="grid-contianer"
      style={{
        width: `${elementWidth * columnCount}px)`,
        height: `${elementHeight * rowCount}px)`,
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      }}
    >
      <Creature />
      <Creature />
      <Creature />
      <Creature />
      <Creature />
    </div>
  );
};

export default Grid;
