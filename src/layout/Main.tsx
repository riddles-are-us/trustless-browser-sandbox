/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectReadyToSubmit } from "../data/game";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import "bootswatch/dist/slate/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.scss";
import { Container } from "react-bootstrap";
import { MainNavBar } from "../components/Nav";
import { ModalOptions } from "../types/layout";

//import { GameController } from "../games/streetpets/controller";
//import { ImageMD5 } from "../games/streetpets/js/config";

//import { GameController } from "../games/roguelike/controller";
//import { Transaction } from "../components/Transaction";

import { GameController } from "../games/planet/controller";
import logo from "../images/logo.png";
import {
  selectL2Account,
} from "../data/accountSlice";


export function Main() {
  const dispatch = useAppDispatch();
  const [currentModal, setCurrentModal] = useState<ModalOptions | null>(null);
  let readyToSubmit = useAppSelector(selectReadyToSubmit);
  let l2account = useAppSelector(selectL2Account);


  // Start or stop scrolling the background when the 'scroll' state changes

  return (
    <>
      <MainNavBar currency={0} handleRestart={()=>{}}></MainNavBar>
      <GameController/>

      { 1 && (
          <Container style={{ position: "relative", top: "10px", paddingBottom:"100px"}}>
          </Container>
      )}
      <img className="wasm-logo" src={logo}></img>
    </>
  );
}
