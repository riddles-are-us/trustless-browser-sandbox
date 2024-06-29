// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ModalCommon,
  ModalCommonProps,
  ModalStatus,
  WaitingForResponseBar,
} from "./base";
import Row from "react-bootstrap/Row";
import { addProvingTask, loadStatus } from "../data/statusSlice";
import { selectL1Account } from "../data/accountSlice";
import { withBrowserConnector} from "web3subscriber/src/client";
import { u64ToHex } from "../utils/proof";

import "./style.scss";

import {
  ProvingParams,
  ZkWasmUtil,
  WithSignature,
} from "zkwasm-service-helper";
import {DelphinusBrowserConnector} from "web3subscriber/src/provider";

import {
    selectCommands,
    selectMessageToSigned,
    selectMsgHash,
    selectGameLoaded,
    selectReadyToSubmit,
} from "../data/game";
import { SignatureWitness } from "../utils/proof";
import { PrivateKey } from "delphinus-curves/src/altjubjub";

import {
  selectL2Account,
} from "../data/accountSlice";



interface NewWASMImageProps {
  md5: string;
  OnTaskSubmitSuccess?: (receipt: any) => void;
  OnTaskSubmitFail?: (error: any) => void;
}

export async function signMessage(message: string) {
  const signature = await withBrowserConnector(async (provider: DelphinusBrowserConnector) => {
    if (!provider) {
      throw new Error("No provider found!");
    }
    /* FIXME: append account pubkey at the end of the message
    const accounts = await web3.web3Instance.eth.getAccounts();
    const account = accounts[0];
    const msg = web3.web3Instance.utils.utf8ToHex(message);
    const msgParams = [msg, account];
    //TODO: type this properly
    const sig = await (provider as any).request({
      method: "personal_sign",
      params: msgParams,
    });
    */
    const signature = provider.sign(message);
    return signature;
  });
  return signature;
}

export function NewProveTask(props: NewWASMImageProps) {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectL1Account);

  const [message, setMessage] = React.useState<string>("");
  const [status, setStatus] = React.useState<ModalStatus>(
    ModalStatus.PreConfirm
  );

  const l2account = useAppSelector(selectL2Account);
  const gameLoaded = useAppSelector(selectGameLoaded);
  const commands = useAppSelector(selectCommands);
  const readyToSubmit = useAppSelector(selectReadyToSubmit);

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([1n,1n,11111n,9n]);
  const [witness, setWitness] = useState<Array<string>>([]);
  const [sigWitness, setSigWitness] = useState<Array<string>>([]);
  const [instance, setInstance] = useState<Array<string>>([]);


  const msgToSign = useAppSelector(selectMessageToSigned);
  const msgHash = useAppSelector(selectMsgHash);

  useEffect(() => {
    if (l2account && gameLoaded) {
       const msg = msgToSign;
       console.log(l2account);
       const prikey = PrivateKey.fromString(l2account.address);
       const signingWitness = new SignatureWitness(prikey, msg);
       const sig_witness:Array<string> = signingWitness.sig.map((v) => "0x" + v+ ":bytes-packed");
       const pubkey_witness:Array<string> = signingWitness.pkey.map((v) => "0x" + v+ ":bytes-packed");
       const commands_info = [`${commands.length}:i64`].concat(commands.map((v) => `${v}:i64`));
       const witness = pubkey_witness;
       for (const s of sig_witness) {
           witness.push(s);
       }
       setSigWitness(witness);
       setWitness(commands_info.concat(witness));
       setInstance(
           ["0x" + msgHash + ":bytes-packed"]
               .concat(merklePreRoot.map((x)=>`${x}:i64`))
               .concat(merklePostRoot.map((x)=>`${x}:i64`))
       );

    }
  if (readyToSubmit == false) {
      setMessage("You do not have a game play to prove");
  }


  }, [l2account, gameLoaded, commands]);


  const prepareNewProveTask = async function () {
    const info: ProvingParams = {
      user_address: account!.address.toLowerCase(),
      md5: props.md5,
      public_inputs: instance,
      private_inputs: witness,
    };

    const msgString = ZkWasmUtil.createProvingSignMessage(info);

    let signature: string;

    try {
      setMessage("Waiting for signature...");
      signature = await signMessage(msgString);
      setMessage("Submitting new prove task...");
    } catch (e: unknown) {
      console.log("error signing message", e);
      setStatus(ModalStatus.PreConfirm);
      setMessage("Error occurred while signing message");
      throw Error("Unsigned Transaction");
    }


    const task: WithSignature<ProvingParams> = {
      ...info,
      signature: signature,
    };

    return task;
  };

  const addNewProveTask = async function () {
    try {
    const task = await prepareNewProveTask();

    dispatch(addProvingTask(task))
      .unwrap()
      .then((res) => {
        if (props.OnTaskSubmitSuccess) props.OnTaskSubmitSuccess(res);

        console.log(res);
        setStatus(ModalStatus.PostConfirm);
        setMessage(`Task submitted with id ${res.id}`)
      })
      .catch((err) => {
        if (props.OnTaskSubmitFail) props.OnTaskSubmitFail(err);
        console.log("new prove task error", err);
        setMessage("An error is occurred when creating new prove task.");
        setStatus(ModalStatus.PreConfirm);
      })
      .finally(() => {
        const query = {
          user_address: account!.address,
          md5: props.md5,
          id: "",
          tasktype: "Prove",
          taskstatus: "",
        };
        console.log("updating image query:", query);
        dispatch(loadStatus(query));
      });
    } catch (e) {
      console.log("prepare proving task error");
    }
  };

  const content = (
    <>
      <Row className="proof-info">
          <div className="title">Movements:</div>
          <div className="items">
          { commands.map((x) => {
             return <div className="proof-badge blue">{`${x}:i64`}</div>
             })
          }
          </div>
          <div className="key-line">
          <div className="cap">MerkleRoot</div>
              <div className="info">{`0x${u64ToHex(merklePreRoot)}`}
              </div>
          </div>

          <div className="key-line">
          <div className="cap">Msg</div><div className="info">{msgHash} </div>
          </div>
          <div className="key-line">
          <div className="cap">PublicKey-X</div><div className="info">{sigWitness[0]} </div>
          </div>
          <div className="key-line">
          <div className="cap">PublicKey-Y</div><div className="info">{sigWitness[1]} </div>
          </div>
          <div className="key-line">
          <div className="cap">Signature-X</div><div className="info">{sigWitness[2]} </div>
          </div>
          <div className="key-line">
          <div className="cap">Signature-X</div><div className="info">{sigWitness[3]} </div>
          </div>
          <div className="key-line">
          <div className="cap">Signature-S</div><div className="info">{sigWitness[4]} </div>
          </div>
      </Row>
    </>
  );


  const modalprops: ModalCommonProps = {
    btnLabel: "Game Proof",
    title: "Create Proof of Your Game Play",
    childrenClass: "",
    handleConfirm: function (): void {
      addNewProveTask();
    },
    handleClose: () => {
      setStatus(ModalStatus.PreConfirm);
    },
    children: content,
    valid: readyToSubmit,
    message: message,
    status: status,
    confirmLabel: "Create Proof",
  };
  return ModalCommon(modalprops);
}
