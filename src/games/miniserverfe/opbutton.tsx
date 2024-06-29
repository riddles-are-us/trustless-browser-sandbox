import { encode_modifier, createCommand } from "./helper";
import { send_transaction } from "./rpc";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectL2Account } from "../../data/accountSlice";
import {selectExternal, setErrorMessage, setSelectedCreatureIndex, setUserActivity, setViewerActivity} from "./thunk";
import React from "react";

const CMD_INSTALL_PLAYER = 1n;
const CMD_INSTALL_OBJECT = 2n;
const CMD_RESTART_OBJECT = 3n;

function modifiersAreFullfilled(modifier: Array<number|null>) {
  for (let i=0; i<8; i++) {
    if (modifier[i] == null) {
      return false;
    }
  }
  return true;
}

async function confirmActivity(modifiers: Array<number>) {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(selectL2Account);
  const mslice = modifiers.slice();
  const external = useAppSelector(selectExternal);
  const selectedId = external.selectedCreatureIndex;
  const activity = external.userActivity;
  try {
    //setExternalState("monitoringResult");
    const index = mslice.reverse().map((id) => {
      return BigInt(id);
    });
    const modifiers: bigint = encode_modifier(index);

    if(activity == "creating") {
      const objIndex = BigInt(selectedId!);
      const insObjectCmd = createCommand(CMD_INSTALL_OBJECT, objIndex);
      await send_transaction([insObjectCmd, modifiers, 0n, 0n], l2account!.address);
      //await queryStateWithRetry(3, "creating");
    } else if(activity == "rebooting") {
      const objIndex = BigInt(selectedId!);
      const restartObjectCmd = createCommand(CMD_RESTART_OBJECT, BigInt(objIndex));
      await send_transaction([restartObjectCmd, modifiers, 0n, 0n], l2account!.address);
      //await queryStateWithRetry(3, "rebooting");
    }
    dispatch(setViewerActivity("monitoringResult"));
  } catch(e) {
    dispatch(setErrorMessage(`confirm ${activity} error`));
  }
}


export function ConfirmButton({modifiers}: {modifiers: Array<number|null>}) {
  const external = useAppSelector(selectExternal);
  const dispatch = useAppDispatch();
  if (external.userActivity == "browsing") {
    if(external.getSelectedIndex()){
      return <button className="reboot" onClick={() => {
          dispatch(setUserActivity("rebooting"))
      }}>Reboot</button>;
    } else {
      return <></>
    }
  } else {
    if (modifiersAreFullfilled(modifiers)) {
        return <button className="confirm" onClick={() => {
                confirmActivity(modifiers.map((x)=>x!));
        }}>Confirm</button>;
    } else {
        return <span>Not all modifiers fullfilled</span>;
    }
  }
}


export function CreateButton({objects}: {objects: Array<any>}) {
  const dispatch = useAppDispatch();
  function handleCreateObject(len: number) {
    dispatch(setSelectedCreatureIndex(len));
    dispatch(setUserActivity("creating"));
  }

  const external = useAppSelector(selectExternal);
  if (external.viewerActivity == "monitoringResult") {
    return <></>;
  } else if (external.userActivity == "browsing") {
    return <button className="createButton" onClick={() => { handleCreateObject(objects.length); }}>NEW +</button>;
  } else {
    return <div></div>;
  }
}