import React, { memo, useCallback } from 'react'
import { ItemType } from '../../types/items'

type Props = Pick<ItemType, 'id'> & {
  disabled: boolean
  onClick: (id: number) => void
  children: string
}

// придерживаюсь строгой типизации в коде вместо any
// использую e.preventDefault() для предотвращения стандартного поведения
// указал в массив зависимостей [onClick, id]
// явно типизирую children: string
// такой код более безопасен

const Button: React.FC<Props> = ({ onClick, id, disabled, children }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onClick(id)
    },
    [onClick, id],
  )

  return (
    <button onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default memo(Button)
