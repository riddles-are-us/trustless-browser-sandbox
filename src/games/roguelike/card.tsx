interface IProps {
  obj: any;
}

export function Card(card: IProps) {
  return (
    <>
    <h3 >{card.obj.name}</h3>
    <ul className="list-group">
      <li className="list-group-item">power cost: {card.obj.power}</li>
      {card.obj.skill.Myself &&
      <>
        <li className="list-group-item">increase hp: {card.obj.skill.Myself.hp}</li>
        <li className="list-group-item">increase block: {card.obj.skill.Myself.block}</li>
      </>
      }
      {card.obj.skill.Opposite &&
      <>
        <li className="list-group-item">enemy hp {card.obj.skill.Opposite.hp}</li>
        <li className="list-group-item">enemy block {card.obj.skill.Opposite.block}</li>
      </>
      }

    </ul>
    </>
  )
}

export function Move(move: IProps) {
  return (
    <div className="enemy-move">
      {move.obj.Myself &&
      <>
          <div>increase hp: {move.obj.Myself.hp}</div>
          <div>increase block: {move.obj.Myself.block}</div>
      </>
      }
      {move.obj.Opposite &&
      <>
        <div>enemy hp {move.obj.Opposite.hp}</div>
        <div>enemy block {move.obj.Opposite.block}</div>
      </>
      }

    </div>
  )
}
