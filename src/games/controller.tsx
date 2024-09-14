import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Container, Row } from "react-bootstrap";
import { ClipRect, Clip, getBeat} from "./draw";
import { loadAudio2, loadAudio, AnalyserInfo, audioSystem} from "./audio";
import { scenario } from "./scenario";
import { getConfig, sendTransaction, queryState } from "./request";
import { UIState, selectUIState, setUIState, selectNonce, selectProgress, selectLastActionTimestamp, selectGlobalTimer, selectPlayerList, selectLastLotteryTimestamp, selectBalance } from "../data/puppy_party/properties";
import { getTransactionCommandArray } from "./rpc";
import { selectL2Account, selectL1Account, loginL2AccountAsync, loginL1AccountAsync } from "../data/accountSlice";
import "./style.scss";
import BN from "bn.js"
import { WithdrawComponent } from "./withdraw";

//import cover from "./images/towerdefence.jpg";

function bytesToHex(bytes: Array<number>): string  {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

const CREATE_PLAYER = 1n;
const SHAKE_FEET = 2n;
const JUMP = 3n;
const SHAKE_HEADS = 4n;
const POST_COMMENTS = 5n;
const LOTTERY = 6n;
const CANCELL_LOTTERY = 7n;
const WITHDRAW = 8n;

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
  const balance = useAppSelector(selectBalance);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [redeemCounting, setRedeemCounting] = useState(0);
  const [alreadyDraw, setAlreadyDraw] = useState(false);

  console.log("lastActionTimestamp", lastActionTimestamp, "globalTimer", globalTimer);

  // Update the ref value whenever `progress` changes
  useEffect(() => {
    progressRef.current = progress;

    // Reset to false
    if(progress == 1000) {
      setAlreadyDraw(false);
    }
  }, [progress]);

  useEffect(() => {
    const delta = globalTimer - lastActionTimestamp;
    if (delta > 2) {
       setCooldown(false);
    } else {
       setCooldown(true);
    }
    let rc = 0;
    if (lastLotteryTimestamp != 0) {
      rc = 10 - (globalTimer - lastLotteryTimestamp);

      if(rc < 0) {
        handleCancelRewards();
      }
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
          cmd: getTransactionCommandArray(CREATE_PLAYER, nonce, [0n, 0n, 0n]),
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
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(SHAKE_FEET, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(()=>{scenario.restoreActor()}, 5000);
    }
  }

  function handleDiscoJump() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(JUMP, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(()=>{scenario.restoreActor()}, 5000);
    }
  }

  function handleDiscoShakeHeads() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(SHAKE_HEADS, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(()=>{scenario.restoreActor()}, 5000);
    }
  }

  function handleDiscoPostComments() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(POST_COMMENTS, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(()=>{scenario.restoreActor()}, 5000);
    }
  }

  function handleRedeemRewards() {
    // Set to true as long as the player click the lottery button
    setAlreadyDraw(true);

    dispatch(
      sendTransaction({
        cmd: getTransactionCommandArray(LOTTERY, nonce, [0n, 0n, 0n]),
        prikey: l2account!.address,
      })
    );
    dispatch(queryState({ cmd: [], prikey: l2account!.address }));
  }

  function handleCancelRewards() {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(CANCELL_LOTTERY, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
  }

  // Function to handle the withdraw button click
  const handleWithdrawClick = () => {
    setIsModalVisible(true); // Show the modal
  };

  // Function to handle the confirmation of the withdraw
  const handleConfirmWithdraw = () => {
    console.log('Withdrawing amount:', amount);
    setIsModalVisible(false); // Hide the modal after withdrawal
    withdrawRewards(BigInt(amount), nonce);
    setAmount("0");
  };

  async function withdrawRewards(amount: bigint, nonce: bigint) {
    const address = account!.address.slice(2);
    const addressBN = new BN(address, 16);
    const addressBE = addressBN.toArray("be", 20); // 20 bytes = 160 bits and split into 4, 8, 8
    console.log("address is", address);
    console.log("address big endian is", addressBE);
    const firstLimb = BigInt('0x' + bytesToHex(addressBE.slice(0,4).reverse()));
    const sndLimb = BigInt('0x' + bytesToHex(addressBE.slice(4,12).reverse()));
    const thirdLimb = BigInt('0x' + bytesToHex(addressBE.slice(12, 20).reverse()));

    /*
    (32 bit amount | 32 bit highbit of address)
    (64 bit mid bit of address (be))
    (64 bit tail bit of address (be))
    */

    console.log("first is", firstLimb);
    console.log("snd is", sndLimb);
    console.log("third is", thirdLimb);

    dispatch(
      sendTransaction({
        cmd: getTransactionCommandArray(WITHDRAW, nonce, [(firstLimb << 32n) + amount, sndLimb, thirdLimb]),
        prikey: l2account!.address,
      })
    );
  }

  return (
    <>
      {!l2account && account &&
      <div className="loading" id="stage"
          onClick={() => {
              dispatch(loginL2AccountAsync(account!))
              loadAudio((ele) => {return ele;});
          }}>
      </div>
      }
      {l2account &&
        <div className="center" id="stage">
          <WithdrawComponent
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            amount={amount}
            setAmount={setAmount}
            balance={balance}
            handleWithdrawClick={handleWithdrawClick}
            handleConfirmWithdraw={handleConfirmWithdraw}
          />
          <div className="balance">balance: {balance}</div>
          <canvas id="canvas"></canvas>
          <div className="stage-buttons">
            <div className={`button1 cd-${cooldown}`} onClick={handleDiscoShakeFeet}></div>
            <div className={`button2 cd-${cooldown}`} onClick={handleDiscoJump}></div>
            <div className={`button3 cd-${cooldown}`} onClick={handleDiscoShakeHeads}></div>
            <div className={`button4 cd-${cooldown}`} onClick={handleDiscoPostComments}></div>
          </div>
          <div className={progress >= 1000 && redeemCounting >= 0 && !alreadyDraw ? "giftbox-buttons" : "none"}>
                  <div className="button-yes" onClick={handleRedeemRewards}>Raffle if full, click to collect rewards: {redeemCounting} ticks left </div>
          </div>
        </div>
      }
    </>
  );
}
