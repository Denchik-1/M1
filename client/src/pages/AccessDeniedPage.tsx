import { Link } from 'react-router-dom'

function AccessDeniedPage() {

  return (
    <div className='detail'>
      <h2>Ошибка 403: У вас недостаточно прав</h2>
      <Link to={'/'}>На главную</Link>
    </div>
  )
}

export default AccessDeniedPage
