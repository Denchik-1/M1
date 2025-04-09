import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ItemType } from '../types/items'

function SinglePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<ItemType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // обработал ошибки
  // добавлен контроль загрузки
  // проверка на ID
  // обработка статусов http
  // использую useNavigate при ошибке 403
  // импорт ItemType из отдельного файла
  // использую async/await
  // четкое разделение логики (загрузка, ошибки, данные)

  useEffect(() => {
    if (!id) {
      setError('ID элемента не указан')
      setIsLoading(false)
      return
    }

    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/items/${id}`)

        if (response.status === 403) {
          navigate('/access-denied', { replace: true })
          return
        }

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`)
        }

        const data: ItemType = await response.json()
        setItem(data)
        setError(null)
      } catch (err) {
        setError((err as Error).message || 'Неизвестная ошибка')
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [id, navigate])

  if (isLoading) {
    return (
      <div>
        <h2>Загрузка...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2>Произошла ошибка</h2>
        <p>{error}</p>
        <Link to='/'>На главную</Link>
      </div>
    )
  }

  if (!item) {
    return (
      <div>
        <h2>Элемент не найден</h2>
        <Link to='/'>На главную</Link>
      </div>
    )
  }

  return (
    <div className='detail'>
      <Link to='/'>← Назад</Link>
      <h2>Детали элемента</h2>
      <div>
        <p>ID: {item.id}</p>
        <p>Название: {item.name}</p>
        <p>Описание: {item.description}</p>
      </div>
    </div>
  )
}

export default SinglePage
