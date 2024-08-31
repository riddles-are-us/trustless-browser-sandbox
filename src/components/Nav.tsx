import React, { createRef, useState, useEffect, useRef } from "react";
import "./style.scss";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { loginL1AccountAsync, selectL1Account, loginL2AccountAsync, selectL2Account } from "../data/accountSlice";
import { addressAbbreviation } from "../utils/address";
import {
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";

import { selectMD5, selectGameLoaded } from "../data/game";

interface IProps {
  currency: number;
  handleRestart: () => void;
}

export function MainNavBar(props: IProps) {
  const dispatch = useAppDispatch();

  const account = useAppSelector(selectL1Account);
  const l2account = useAppSelector(selectL2Account);
  const md5 = useAppSelector(selectMD5);
  const gameLoaded = useAppSelector(selectGameLoaded);

  useEffect(() => {
    dispatch(loginL1AccountAsync());
  }, []);

  return (
    <Navbar style={{ zIndex: "1000" }}>
      <Container className="justify-content-md-between">
        <Navbar.Brand>
          M4 SDK Playground
        </Navbar.Brand>
        <Nav.Item className="action-items d-flex">
        </Nav.Item>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {l2account && (
              <>
                <Navbar.Text>
                  <div>Processing Key</div>
                  <div>{l2account.address}</div>
                </Navbar.Text>
              </>
            )}

            {account && !l2account && (
              <>
                <Nav.Link
                  onClick={() => dispatch(loginL2AccountAsync(account!))}
                  className="px-2 my-2 py-0"
                >
                  Derive Processing Key
                </Nav.Link>
              </>
            )}

            {!account && (
              <>
                <Nav.Link
                  onClick={() => dispatch(loginL1AccountAsync())}
                  className="px-2 my-2 py-0"
                >
                  Connect Wallet
                </Nav.Link>
              </>
            )}


            {account && (
              <>
                <Navbar.Text>
                  <div>Account</div>
                  <div>{addressAbbreviation(account.address, 4)}</div>
                </Navbar.Text>
              </>
            )}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
