import Home from './pages/Home'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { UserContext } from './context/user'
import { API, setAuthToken } from './config/api'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  
  useEffect(() => {
    if (state.isLogin === false) {
      navigate('/')
    } else {
      if (state.user.status === "admin") {
        navigate('/income')
      } else {
        navigate('/')
      }
    }
  },[state])

  const checkUser = async () => {
    try {
      const res = await API.get('/check-auth')
      
      if (res.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = res.data.data
      payload.token = localStorage.token

      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkUser()
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<Detail />} />
      <Route path='/cart' element={<Cart/>} />
    </Routes>
  )
}
