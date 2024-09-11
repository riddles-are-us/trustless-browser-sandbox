import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Container, Row } from "react-bootstrap";
import { ClipRect, Clip, getBeat} from "./draw";
import { loadAudio2, loadAudio, AnalyserInfo, audioSystem} from "./audio";
import { scenario } from "./scenario";
import { getConfig, sendTransaction, queryState } from "./request";
import { UIState, selectUIState, setUIState, selectNonce, selectProgress, selectLastActionTimestamp, selectGlobalTimer, selectPlayerList, selectLastLotteryTimestamp } from "../data/puppy_party/properties";
import { getTransactionCommandArray } from "./rpc";
import { selectL2Account, selectL1Account, loginL2AccountAsync, loginL1AccountAsync } from "../data/accountSlice";
import "./style.scss";

//import cover from "./images/towerdefence.jpg";

const CREATE_PLAYER = 1n;
const SHAKE_FEET = 2n;
const JUMP = 3n;
const SHAKE_HEADS = 4n;
const POST_COMMENTS = 5n;
const LOTTERY = 6n;

export function GameController() {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const [inc, setInc] = useState(0);
  const nonce = useAppSelector(selectNonce);
  const progress = useAppSelector(selectProgress);
  const progressRef = useRef(progress);
  const lastActionTimestamp = useAppSelector(selectLastActionTimestamp);
  const lastLotteryTimestamp = useAppSelector(selectLastLotteryTimestamp);
  const globalTimer = useAppSelector(selectGlobalTimer);
  const playerList = useAppSelector(selectPlayerList);


  const [cooldown, setCooldown] = useState(false);
  const [redeemCounting, setRedeemCounting] = useState(0);


  console.log("lastActionTimestamp", lastActionTimestamp, "globalTimer", globalTimer);

   // Update the ref value whenever `progress` changes
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const delta = globalTimer - lastActionTimestamp;
    if (delta > 3) {
       setCooldown(true);
    } else {
       setCooldown(false);
    }
    let rc = 0;
    if (lastLotteryTimestamp != 0) {
      rc = 10 - (globalTimer - lastLotteryTimestamp);
    }
    setRedeemCounting(rc);

  }, [lastActionTimestamp, globalTimer]);


  useEffect(() => {
    const draw = (): void => {
      const analyserInfo = audioSystem.play();
      if (scenario.status === "play" && analyserInfo != null) {
        const ratioArray = getBeat(analyserInfo!);
        const progress = progressRef.current / 1000;
        scenario.draw(ratioArray, {
            progress,
            l2account,
            playerList,
        });
        scenario.step(ratioArray);
      }
    };

    // Set the interval
    const intervalId = setInterval(draw, 100); // 1000ms = 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function createPlayer() {
    try {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(CREATE_PLAYER, nonce),
          prikey: l2account!.address,
        })
      );
    } catch (e) {
      console.log("Error at create player " + e);
    }
  }

  function updateState() {
    if (uIState >= UIState.Idle) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
    setInc(inc + 1);
  }

  function loginProcess() {
    if (uIState == UIState.QueryConfig) {
      dispatch(getConfig());
    } else if (uIState == UIState.QueryState) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    } else if (uIState == UIState.CreatePlayer) {
      createPlayer();
    }
  }

  useEffect(() => {
    loginProcess();
  }, [uIState]);

  useEffect(() => {
    if (l2account) {
      scenario.status = "play";
      console.log(l2account);

      if (uIState == UIState.Init) {
        dispatch(setUIState({ uIState: UIState.QueryConfig }));
      }
    }
  }, [l2account]);

  useEffect(() => {
     dispatch(loginL1AccountAsync());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  const account = useAppSelector(selectL1Account);
  console.log("l1 account:", account);

  function handleDiscoShakeFeet() {
    if (cooldown == false) {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(SHAKE_FEET, nonce),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
  }

  function handleDiscoJump() {
    if (cooldown == false) {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(JUMP, nonce),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
  }

  function handleDiscoShakeHeads() {
    if (cooldown == false) {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(SHAKE_HEADS, nonce),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
  }

  function handleDiscoPostComments() {
    if (cooldown == false) {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(POST_COMMENTS, nonce),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
  }

  function handleRedeemRewards() {
    if (cooldown == false) {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(POST_COMMENTS, nonce),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
  }

  return (
    <>
      {!l2account && account &&
      <div className="center" id="stage">
        <Container className="mt-5">
            <button className="btn btn-confirm mb-5"
              onClick={() => {
                dispatch(loginL2AccountAsync(account!))
                loadAudio((ele) => {return ele;});
              }}
            > Connect and R.O.C.K</button>
        </Container>
      </div>
      }
      {l2account &&
        <div className="center" id="stage">
          <canvas id="canvas"></canvas>
          <div className="stage-buttons">
            <div className={`button1 cd-${cooldown}`} onClick={handleDiscoShakeFeet}></div>
            <div className={`button2 cd-${cooldown}`} onClick={handleDiscoJump}></div>
            <div className={`button3 cd-${cooldown}`} onClick={handleDiscoShakeHeads}></div>
            <div className={`button4 cd-${cooldown}`} onClick={handleDiscoPostComments}></div>
          </div>
          <div className={progress>=1000 ? "giftbox-buttons" : "none"}>
            <div className="button-yes" onClick={handleRedeemRewards}>Click to redeem rewards {redeemCounting} ticks left </div>
          </div>

        </div>
      }
    </>
  );
}
