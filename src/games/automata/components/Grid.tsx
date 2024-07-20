import React from "react";
import "./Grid.css";

interface Props {
  elementWidth: number;
  elementHeight: number;
  columnCount: number;
  rowCount: number;
  elements: Array<JSX.Element>;
}

const Grid = ({
  elementWidth,
  elementHeight,
  columnCount,
  rowCount,
  elements,
}: Props) => {
  return (
    <div
      className="grid-contianer"
      style={{
        width: `${elementWidth * columnCount}px`,
        height: `${elementHeight * rowCount}px`,
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      }}
    >
      {elements.map((element) => element)}
    </div>
  );
};

export default Grid;
