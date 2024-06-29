import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// ZKWASM RELATED STUFF
import { NewProveTask } from "../modals/NewProveTask";
import {
    selectCommands,
    selectMessageToSigned,
    selectMsgHash,
    selectGameLoaded,
} from "../data/game";
import { SignatureWitness } from "../utils/proof";
import { PrivateKey } from "delphinus-curves/src/altjubjub";

import {
  selectL2Account,
} from "../data/accountSlice";

interface IProp {
    md5: string;
}

export function Transaction(prop: IProp) {
  const l2account = useAppSelector(selectL2Account);
  const gameLoaded = useAppSelector(selectGameLoaded);
  const commands = useAppSelector(selectCommands);

  const [merklePostRoot, setPostMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
  const [merklePreRoot, setPreMerkleRoot] = useState<Array<bigint>>([0n,0n,0n,0n]);
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
  }, [l2account, gameLoaded, commands]);

  function updatePreMerkle(index: number, value: bigint) {
    const a = merklePreRoot;
    a[index] = value;
    setPreMerkleRoot(a);
  }

  function updatePostMerkle(index: number, value: bigint) {
    const a = merklePostRoot;
    a[index] = value;
    setPostMerkleRoot(a);
  }

  function loadGame(l2account: number) {
    return;
  }

  return (
    <>
      <Row>
          <h3>Create the proof of your game plays</h3>
          <p>MerkleRoot:</p>
             <div>
                <span className="badge text-bg-info">{`xxx`}</span>
                <span className="badge text-bg-info">{`xxx`}</span>
                <span className="badge text-bg-info">{`xxx`}</span>
                <span className="badge text-bg-info">{`xxx`}</span>
             </div>
          <p>Movements:</p>
          <div>
         { commands.map((x) => {
             return <span className="badge text-bg-info">{`${x}:i64`}</span>
             })
         }
          </div>

          <div>
          <span>HashedMessage:</span><span>{msgToSign} </span>
          </div>
          <div>
          <span>PublicKey-X:</span><span>{sigWitness[0]} </span>
          </div>
          <div>
          <span>PublicKey-Y:</span><span>{sigWitness[1]} </span>
          </div>
          <div>
          <span>Signature-X:</span><span>{sigWitness[2]} </span>
          </div>
          <div>
          <span>Signature-Y:</span><span>{sigWitness[3]} </span>
          </div>
          <div>
          <span>Signature-S:</span><span>{sigWitness[4]} </span>
          </div>
      </Row>
    </>);
}
