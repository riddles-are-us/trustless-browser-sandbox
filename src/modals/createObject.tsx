// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Modal } from 'react-bootstrap';

export const CreateObjectModal = (props: any) => {
  const message = props.message;
  return (
    <Modal show={props.showModal}>
      <Modal.Header>
        <Modal.Title>Waiting for creation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ message }</Modal.Body>
    </Modal>
  );
};