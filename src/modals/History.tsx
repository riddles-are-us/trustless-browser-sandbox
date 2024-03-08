import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Card, Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { loadStatus, selectTasks} from "../data/statusSlice";
import { ProofInfoModal } from "../modals/proofInfo";
import { ModalCommon, ModalCommonProps, ModalStatus } from "./base";
import "./style.scss";

import {
  selectL1Account,
} from "../data/accountSlice";

export interface UserHistoryProps {
  md5: string;
}

export default function ImageDetail(props: UserHistoryProps) {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectL1Account);
  const query = {
    md5: props.md5,
    user_address: account? account!.address:"",
    id: "",
    tasktype: "Prove",
    taskstatus: "",
  };

  // UI Loading states
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    if (account) {
      dispatch(loadStatus(query));
    }
  }, [account]);

  const taskhistory = (
      <Container>
            <table className="history-table">
              <thead>
                <tr>
                   <th><div>Proof Task ID</div></th>
                   <th><div>Total Movements</div></th>
                   <th><div>Post Merkle Root</div></th>
                   <th><div>Status</div></th>
                   <th><div>Proof Details</div></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((d) => {
                  return (
                      <tr key={d._id["$oid"]}>
                        <td>
                          <div>{d._id["$oid"]}</div>
                        </td>
                        <td>
                          <div>{d.private_inputs[0]}</div>
                        </td>
                        <td>
                          <div>
                           {d.public_inputs[1]}
                           {d.public_inputs[2]}
                           {d.public_inputs[3]}
                           {d.public_inputs[4]}
                          </div>
                        </td>
                        <td>
                          <div className={d.status}>
                            {d.status}
                          </div>
                        </td>
                        <td>
                          <ProofInfoModal task={d}></ProofInfoModal>
                        </td>
                      </tr>
                  );
                })}
              </tbody>
            </table>
      </Container>
  );
  const modalProps: ModalCommonProps = {
    btnLabel: "History",
    title: "Game History",
    childrenClass: "",
    valid: true,
    status: ModalStatus.PreConfirm,
    children: taskhistory,
    message: "",
    confirmLabel: "verify on chain",
  };
  return ModalCommon(modalProps);

}
