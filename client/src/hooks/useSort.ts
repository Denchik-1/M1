import { useMemo, useState } from 'react'
import { ItemType } from '../types/items'

// явно типизирую с ItemType

function useSort(items: ItemType[]): [ItemType[], string, () => void] {
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC' | ''>('ASC')

// так как у нас массив данных большой, оптимизировал код по ключам(id)
// для быстрой загрузки данных

  const indexedItems = useMemo(() => {
    return items.reduce<Record<number, ItemType>>((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }, [items])

  // избегаю мутации Array.sort(), работаю с новыми массивами и объектами
  // добавил результат sortBy если он пуст,результат будет таким же как при 'ASC'
  // мой вариант написания более оптимален и надежен

  const sortedItems = useMemo(() => {
    const ids = Object.keys(indexedItems).map(Number)
    ids.sort((a, b) => (sortBy === 'DESC' ? a - b : b - a))
    return ids.map((id) => indexedItems[id])
  }, [indexedItems, sortBy])

  const handleSortClick = () => {
    if (sortBy === 'ASC') {
      setSortBy('DESC')
    } else if (sortBy === 'DESC') {
      setSortBy('ASC')
    } else {
      setSortBy('')
    }
  }

  return [sortedItems, sortBy, handleSortClick]
}

export default useSort
