/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HistoryTasks from "../components/History";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.scss";
import "bootswatch/dist/slate/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { MainNavBar } from "../components/Nav";
import { ModalOptions } from "../types/layout";
import { GameController } from "../games/roguelike/controller";
import { ImageMD5 } from "../games/roguelike/js/config";

//import { GameController } from "../games/towerdefence/controller";
//import { ImageMD5 } from "../games/towerdefence/js/config";

import {
  selectL2Account,
} from "../data/accountSlice";


export function Main() {
  const dispatch = useAppDispatch();
  const [currentModal, setCurrentModal] = useState<ModalOptions | null>(null);
  let l2account = useAppSelector(selectL2Account);


  // Start or stop scrolling the background when the 'scroll' state changes

  return (
    <>
      <MainNavBar currency={0} handleRestart={()=>{}}></MainNavBar>
      <Container className="d-flex justify-content-center"></Container>
      <Container className="justify-content-center">
        <Row className="mt-3">
          <Col>
          </Col>
        </Row>
      </Container>

      <Container>
      <GameController/>
      </Container>

      { 1 && (
        <>
          <Container style={{ position: "relative", top: "10px", paddingBottom:"100px"}}>
          </Container>
          <Container>
            <HistoryTasks md5={ImageMD5}></HistoryTasks>
          </Container>
        </>
      )}
    </>
  );
}
