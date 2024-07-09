import React from "react";
import "./Grid.css";

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
      {}
      <div>1 of 2</div>
      <div>2 of 2</div>
      <div>1 of 3</div>
      <div>2 of 3</div>
      <div>3 of 3</div>
    </div>
  );
};

export default Grid;
