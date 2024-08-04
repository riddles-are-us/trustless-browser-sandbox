import React, { useState, useEffect, useRef } from "react";
import "./Rocket.css";

const getRandomStartPosition = (width: number, height: number) => {
  const x = Math.random() * 0.3;
  const y = Math.random();
  return { x: x * width, y: y * height };
};

const getRandomEndPosition = (width: number, height: number) => {
  const x = Math.random() * 0.3 + 0.7;
  const y = Math.random();
  return { x: x * width, y: y * height };
};

const Rocket = () => {
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const spaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rocketContainer = rocketRef.current;
    const spaceContainer = spaceRef.current;
    if (rocketContainer && spaceContainer) {
      const startPosition = getRandomStartPosition(
        spaceContainer.clientWidth,
        spaceContainer.clientHeight
      );
      const endPosition = getRandomEndPosition(
        spaceContainer.clientWidth,
        spaceContainer.clientHeight
      );
      const dx = endPosition.x - startPosition.x;
      const dy = endPosition.y - startPosition.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // Convert to degrees

      rocketContainer.style.transform = `translate(${startPosition.x}px, ${startPosition.y}px) rotate(${angle}deg)`;
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const keyframes = `
        @keyframes flyAcrossScreen {
          from { transform: translate(${startPosition.x}px, ${startPosition.y}px) rotate(${angle}deg); }
          to { transform: translate(${endPosition.x}px, ${endPosition.y}px) rotate(${angle}deg); }
        }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      rocketContainer.style.animation = `flyAcrossScreen 20s linear infinite`;
    }
  }, []);

  return (
    <>
      <div ref={spaceRef} className="space-container">
        <div ref={rocketRef} className="rocket-container">
          <div
            className="rocket-image"
            onClick={() => {
              console.log("click rocket");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Rocket;
