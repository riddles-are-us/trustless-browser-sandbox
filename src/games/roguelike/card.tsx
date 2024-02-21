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
    <ul>
      {move.obj.Myself &&
      <>
          <li>increase hp: {move.obj.Myself.hp}</li>
          <li>increase block: {move.obj.Myself.block}</li>
      </>
      }
      {move.obj.Opposite &&
      <>
        <li>enemy hp {move.obj.Opposite.hp}</li>
        <li>enemy block {move.obj.Opposite.block}</li>
      </>
      }

    </ul>
  )
}
