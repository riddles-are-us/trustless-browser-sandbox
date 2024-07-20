import React from "react";
import "./AccountInfo.css";
import account_info from "../images/backgrounds/account_info.png";
import { useAppSelector } from "../../../app/hooks";
import { selectL1Account, selectL2Account } from "../../../data/accountSlice";
import { addressAbbreviation } from "../../../utils/address";

const AccountInfo = () => {
  const account = useAppSelector(selectL1Account);
  const l2account = useAppSelector(selectL2Account);

  return (
    <div className="account-info-container">
      <img src={account_info} className={"account-info-background"}></img>
      <p
        className={"account-info-account-text"}
      >{`Account  : ${addressAbbreviation(account?.address ?? "", 12)}`}</p>
      <p className={"account-info-key-text"}>{`Key      : ${addressAbbreviation(
        l2account?.address ?? "",
        12
      )}`}</p>
      <p className={"account-info-player-id-text"}>{`PlayerId : ID`}</p>
    </div>
  );
};

export default AccountInfo;
