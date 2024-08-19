/* eslint-disable */
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.scss";
import { GameController } from "../games/towerdefence/controller";


export function Main() {
  return (
      <GameController/>
  );
}
