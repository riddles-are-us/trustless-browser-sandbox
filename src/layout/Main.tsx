/* eslint-disable */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.scss";
import { MainNavBar } from "../components/Nav";
import Landing from "./Landing";

//import { GameController } from "../games/streetpets/controller";
//import { ImageMD5 } from "../games/streetpets/js/config";

import { GameController as TemplateController } from "../games/signature/controller";
import { GameController as DemoGameController } from "../games/demogame/controller";
import { GameController as RogueLikeController } from "../games/roguelike/controller";
import { GameController as TowerDefenceController } from "../games/towerdefence/controller";
import { GameController as MiniServerFEController } from "../games/miniserverfe/controller";
import { GameController as AutomataController } from "../games/automata/controller";
import logo from "../images/logo.png";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const AUTOMATA_PATH = "automata";

function MainNavBarIsShow() {
  const location = useLocation();
  const showNavBar = location.pathname !== `/${AUTOMATA_PATH}/`;

  console.log("(t):", location.pathname);

  return showNavBar ? (
    <MainNavBar currency={0} handleRestart={() => {}} showNavBar={true} />
  ) : (
    <MainNavBar currency={0} handleRestart={() => {}} showNavBar={false} />
  );
}

function WasmLogoIsShow() {
  const location = useLocation();
  const showNavBar = location.pathname !== `/${AUTOMATA_PATH}`;

  return showNavBar ? <img className="wasm-logo" src={logo}></img> : null;
}

export function Main() {
  return (
    <>
      <BrowserRouter>
        <MainNavBarIsShow />
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="roguelike" element={<RogueLikeController />} />
          </Route>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="signature" element={<TemplateController />} />
          </Route>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="towerdefence" element={<TowerDefenceController />} />
          </Route>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="demogame" element={<DemoGameController />} />
          </Route>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="miniserverfe" element={<MiniServerFEController />} />
          </Route>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path={AUTOMATA_PATH} element={<AutomataController />} />
          </Route>
        </Routes>
        <WasmLogoIsShow />
      </BrowserRouter>
    </>
  );
}
