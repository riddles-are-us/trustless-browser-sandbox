/* eslint-disable */
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.scss";
import { MainNavBar } from "../components/Nav";
import Landing from "./Landing";

//import { GameController } from "../games/streetpets/controller";
//import { ImageMD5 } from "../games/streetpets/js/config";

// import { GameController as TemplateController } from "../games/sumgame/controller";
import { GameController as RogueLikeController } from "../games/roguelike/controller";
import { GameController as TowerDefenceController } from "../games/towerdefence/controller";
import { GameController as DemoGameController } from "../games/demogame/controller";

import logo from "../images/logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export function Main() {
  return (
    <>
      <MainNavBar currency={0} handleRestart={()=>{}}></MainNavBar>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing/>}/>
            <Route path="roguelike" element={<RogueLikeController/>}/>
          </Route>
          {/* <Route path="/">
            <Route index element={<Landing/>}/>
            <Route path="template" element={<TemplateController/>}/>
          </Route> */}
          {/* <Route path="/">
            <Route index element={<Landing/>}/>
            <Route path="towerdefence" element={<TowerDefenceController/>}/>
          </Route> */}
          <Route path="/">
            <Route index element={<Landing/>}/>
            <Route path="demogame" element={<DemoGameController/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <img className="wasm-logo" src={logo}></img>
    </>
  );
}
