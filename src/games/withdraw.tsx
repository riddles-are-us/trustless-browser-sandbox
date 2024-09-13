import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface WithdrawComponentProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  balance: number;
  handleConfirmWithdraw: () => void;
  handleWithdrawClick: () => void;
}

export function WithdrawComponent({
    isModalVisible,
    setIsModalVisible,
    amount,
    setAmount,
    balance,
    handleConfirmWithdraw,
    handleWithdrawClick
  }: WithdrawComponentProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const amount = e.target.value;
      if (/^\d*$/.test(amount) && Number(amount) >= 0 && Number(amount) <= balance) {
        setAmount(amount);
      } else {
        setAmount('');
      }
    };

    return (
      <div>
        <div className="withdraw" onClick={handleWithdrawClick}>
          Withdraw
        </div>
        <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Amount to Withdraw</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="test"
              value={amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
            />
            <div>Please enter a number between 0 and {balance}.</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmWithdraw}>
              Confirm Withdraw
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}