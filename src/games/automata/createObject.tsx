// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { Modal } from "react-bootstrap";
import { selectExternal } from "../../data/automata/properties";
import { useAppSelector } from "../../app/hooks";

export function CreateObjectModal() {
  const external = useAppSelector(selectExternal);
  const message = external.userActivity;
  const show = external.viewerActivity == "monitoringResult";
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Waiting for creation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
}
