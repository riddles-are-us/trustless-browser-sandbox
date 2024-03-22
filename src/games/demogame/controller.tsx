import init, * as gameplay from "./js";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button, ProgressBar, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style.scss";
import "./style.scss";

// Controller Related STUFF
// import { Card, Move } from "./card";
import startIMG1 from "./images/start1.png";


// images:
import backgnd from "./images/bg.png";

// export const LandingImage = cheems;


import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync
} from "../../data/accountSlice";

import {
  selectGameLoaded,
  setLoaded,
  appendCommand,
  setReadyToSubmit,
  setMD5,
} from "../../data/game";

import { ImageMD5 } from "./js/config";

// const bg = [d0,d1,d2,d3,d4];
const bg = [backgnd];

export function GameController() {
    // Game Loading Status
    /* Test merkle root
        6411109203874391172
        12156582326191033569
        18190570047656100927
        2451350522329201736
    */

    const dispatch = useAppDispatch();

    const l2account = useAppSelector(selectL2Account);
    const gameLoaded = useAppSelector(selectGameLoaded);
    const [state, setState] = useState<any>(null);


    function loadGame(l2account: number) {
        (init as any)().then(() => {
            /*
            */
        });
    }


    const seed_bigint = BigInt("1");
    
    /*
    function initGame(l2account: number) {
        (init as any)().then(() => {
        console.log("setting instance");
        console.log(gameplay);
        gameplay.init(seed_bigint);

        //   gameplay.challenge_next_floor();
        //   const stateStr = gameplay.state();
        //   const state = JSON.parse(stateStr);
        //         console.log(":state:", state);
        //   setState(state);
        //   dispatch(setMD5(ImageMD5));
        //   dispatch(setLoaded(true));
        //drawObjects(objects);

        });
    }
    */









    const account = useAppSelector(selectL1Account);

    useEffect(() => {
        if (l2account) {
            if (gameLoaded == false) {
                // initGame(Number(BigInt("0x" + l2account.address)));
            }
        }
    }, [l2account]);


    return (
        <Container className="mt-5">
        {!l2account &&
            <div className="load-game">
                <img src={startIMG1} width="100%"></img>
                <button className="btn btn-confirm"
                    onClick={() => dispatch(loginL2AccountAsync(account!))}
                > Start Play </button>
            </div>
        }




        </Container>
        );   


}