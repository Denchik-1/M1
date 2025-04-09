import React from 'react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'
import { ItemType } from '../types/items'

type Props = ItemType & {
  onClick: (id: number) => void
  isActive: boolean
}

// строгая типизация
// четко определил все пропсы
// isactive исправил в camelCase
// структурировал путь Button из ./ui/Button
// ItemType из ../types/items
// list-item__description использовал БЭМ-нотацию
// код стал более читаемым и поддерживаемый

const ListItem: React.FC<Props> = ({
  id,
  name,
  description,
  onClick,
  isActive,
}) => {
  return (
    <li className={isActive ? 'list-item active' : 'list-item'}>
      <Link to={`/${id}`}>
        <div className={'list-item-actions'}>
          <div>
            ID: <b>{id}</b>
          </div>
          <Button onClick={onClick} id={id} disabled={isActive}>
            {isActive ? 'Active' : 'Set Active'}
          </Button>
        </div>
        <div>{name}</div>
        <div className={'list-item__description'}>{description}</div>
      </Link>
    </li>
  )
}

export default ListItem
