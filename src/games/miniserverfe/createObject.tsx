// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Modal } from 'react-bootstrap';
import {selectExternal} from "./thunk";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export function CreateObjectModal() {
  const dispatch = useAppDispatch();
  const external = useAppSelector(selectExternal);
  const message = external.userActivity;
  const show = external.viewerActivity == "monitoringResult"
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Waiting for creation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ message }</Modal.Body>
    </Modal>
  );
}
