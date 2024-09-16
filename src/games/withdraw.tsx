import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface WithdrawComponentProps {
  isWDModalVisible: boolean;
  setIsWDModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isWDResModalVisible: boolean;
  setIsWDResModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  lastTxResult: number | string;
  withdrawRes: string;
  setWithdrawRes: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  balance: number;
  handleConfirmWithdraw: () => void;
  handleWithdrawClick: () => void;
}

export function WithdrawComponent({
    isWDModalVisible,
    setIsWDModalVisible,
    isWDResModalVisible,
    setIsWDResModalVisible,
    lastTxResult,
    withdrawRes,
    setWithdrawRes,
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
    useEffect(() => {
      if (typeof lastTxResult === "number") {
        setWithdrawRes("Withdraw transaction handled, please check explorer.zkwasmhub.com for more information");
      } else {
        setWithdrawRes(lastTxResult);
      }
    }, [lastTxResult]);

    return (
      <div>
        <div className="withdraw" onClick={handleWithdrawClick}>
          Withdraw
        </div>
        <Modal show={isWDModalVisible} onHide={() => setIsWDModalVisible(false)}>
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
            <Button variant="secondary" onClick={() => setIsWDModalVisible(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmWithdraw}>
              Confirm Withdraw
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={isWDResModalVisible} onHide={() => setIsWDResModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Withdraw Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{withdrawRes}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsWDResModalVisible(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}