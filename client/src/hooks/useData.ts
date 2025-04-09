import { useCallback, useState } from 'react'
import { ItemType } from '../types/items'

type UseDateReturnType = {
  items: ItemType[]
  loading: boolean
  fetchItems: () => void
}

// использую явные типы, заменил any
// добавил loading для отслеживания состояния загрузки
// фильтрую данные и исключаю каждый третий (id % 3 === 0)
// использую useCallback для мемоизации функции fetchItems

function useData(): UseDateReturnType {
  const [items, setItems] = useState<ItemType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchItems = useCallback(() => {
    setLoading(true)
    fetch(`${process.env.API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter((el: ItemType) => el.id % 3 !== 0)
        setItems(filterData)
      })
      .catch((err) => {
        console.error('Failed to fetch items', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, items, fetchItems }
}

export default useData
