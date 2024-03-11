interface IProps {
  obj: any;
}

export function Card(card: IProps) {
  return (
    <>
    <div className="pickable-card">{card.obj.name}</div>
    <div className="pickable-card">
      <div className="list-group-item">power cost: {card.obj.power}</div>
      {card.obj.skill.Myself &&
      <>
        <div>increase hp: {card.obj.skill.Myself.hp}</div>
        <div>increase block: {card.obj.skill.Myself.block}</div>
      </>
      }
      {card.obj.skill.Opposite &&
      <>
        <div>enemy hp {card.obj.skill.Opposite.hp}</div>
        <div>enemy block {card.obj.skill.Opposite.block}</div>
      </>
      }

    </div>
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
