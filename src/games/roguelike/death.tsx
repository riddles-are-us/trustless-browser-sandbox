interface IProps {
  obj: any;
}

export function Death(card: IProps) {
  return (
    <ul>
      <li>name: {card.obj.name}</li>
      <li>power cost: {card.obj.power}</li>
      {card.obj.Myself &&
      <>
        <li>increase hp: {card.obj.Myself.hp}</li>
        <li>increase block: {card.obj.Myself.block}</li>
      </>
      }
      {card.obj.Opposite &&
      <>
        <li>enemy hp {card.obj.Opposite.hp}</li>
        <li>enemy block {card.obj.Opposite.block}</li>
      </>
      }

    </ul>
  )
}
