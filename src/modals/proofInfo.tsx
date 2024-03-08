// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Row, ListGroup } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import "./style.scss";
import { ModalCommon, ModalCommonProps, ModalStatus } from "./base";
import { Task } from "zkwasm-service-helper";
import { bytesToBN } from "../utils/proof";
import { contract_abi, parseArgs } from "../data/image";
import BN from "bn.js";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { selectL1Account } from "../data/accountSlice";
//import { selectConfig } from "../data/statusSlice";
import { zkwasmHelper } from "../data/endpoint";
import { hexAbbreviation } from "../utils/address";

export interface ProofInfoProps {
  task: Task;
}

export function ProofInfoModal(info: ProofInfoProps) {
  const account = useAppSelector(selectL1Account);
  const task = info.task;
  const aggregate_proof = bytesToBN(task.proof);
  const instances = bytesToBN(task.instances);
  const aux = bytesToBN(task.aux);
  //const appConfig = useAppSelector(selectConfig);
  async function testverify() {
    if (account) {
      const image = await zkwasmHelper.queryImage(info.task.md5);
      //await verify_task(task, appConfig, setMessageCallback);
      console.error("wallet not connected");
    }
  }
  const taskproof = (
    <>
      <Row className="proof-info">
        <div className="title">Instances:</div>
        <div className="items">
          { instances.map((x, i) => {
             return <div className="proof-badge blue" key = {i}>{`0x${x.toString("hex")}:i64`}</div>
             })
          }
        </div>

        <div className="title">Witness:</div>
        <div className="items">
          { task.private_inputs.map((x, i) => {
             return <div className="proof-badge blue" key={i}>{`${x.toString()}`}</div>
             })
          }
        </div>
        <div className="title">Proof:</div>
        <div className="items">
              {aggregate_proof.map((proof: BN) => {
                return <div className="proof-badge green" key={proof.toString("hex")}>{`0x${hexAbbreviation(proof.toString("hex"), 2)}`}</div>
              })}
        </div>
        <div className="title">Aux data:</div>
        <div className="items">
            {aux.map((proof: BN) => {
              return (
                <div className="proof-badge green" key={proof.toString("hex")}>
                  0x{hexAbbreviation(proof.toString("hex"), 2)}
                </div>
              );
            })}
        </div>
      </Row>
    </>
  );
  const props: ModalCommonProps = {
    btnLabel: <i className="bi bi-eye cursor-pointer"></i>,
    title: "Proof Information",
    childrenClass: "",
    handleConfirm: function (): void {
      testverify();
    },
    valid: true,
    status: ModalStatus.PreConfirm,
    children: taskproof,
    message: "",
    confirmLabel: "verify on chain",
  };
  return ModalCommon(props);
}
