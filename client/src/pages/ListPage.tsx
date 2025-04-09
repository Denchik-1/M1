import React, { useEffect, useMemo, useState } from 'react'

import { ListItem } from '../components'

import useData from '../hooks/useData'
import useSort from '../hooks/useSort'

type SubTitleProps = {
  children: number | string
}
// строгая типизация
// activeItemId добавил тип number | null
// стиль написания camelCase
// Использую useData(), который возвращает { loading, items, fetchItems }
// добавил setInterval каждые 10 сек
// добавил фильтрацию через useMemo, что эффективнее
// filteredItems вычисляется через useMemo, что предотвращает лишние ререндеры
// activeItemText зависит от [activeItemId]
// настроил обработку ошибок
// использовал item.id вместо index, более надежный вариант

const SubTitle: React.FC<SubTitleProps> = ({ children }) => (
  <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
)

function ListPage() {
  const { loading, items, fetchItems } = useData()
  const [query, setQuery] = useState<string>('')
  const [sortedItems, sortBy, handleSortClick] = useSort(items)
  const [activeItemId, setActiveItemId] = useState<null | number>(null)

  const filteredItems = useMemo(() => {
    let result = [...sortedItems]

    if (query.trim()) {
      const escapedQuery = query
        .toLowerCase()
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      result = result.filter((item) => `${item.id}`.includes(escapedQuery))
    }

    return result
  }, [query, sortedItems])

  useEffect(() => {
    fetchItems()
    const interval = setInterval(() => {
      fetchItems()
    }, 10000)

    return () => clearInterval(interval)
  }, [fetchItems])

  const isLoading = loading && !items.length

  const activeItemText = useMemo(
    () => (activeItemId ? activeItemId : 'Empty'),
    [activeItemId],
  )

  const handleItemClick = (id: number) => {
    setActiveItemId(id)
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <div className={'list-wrapper'}>
      <div className='list-header'>
        <h1 className={'list-title'}>Список предметов</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <button onClick={handleSortClick}>
          Sort ({sortBy === 'ASC' ? 'ASC' : 'DESC'})
        </button>
        <input
          type='text'
          placeholder={'Filter by ID'}
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <div className='list-container'>
        <div className='list'>
          {isLoading && <span>Загрузка...</span>}
          {!isLoading && filteredItems.length === 0 && <span>Не найден</span>}
          {filteredItems.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              name={item.name}
              onClick={handleItemClick}
              description={item.description}
              isActive={activeItemId === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListPage
