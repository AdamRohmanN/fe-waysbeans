import logo from '../../assets/logo-navbar.svg'
import cartIcon from '../../assets/cart.svg'
import Dropdown from './dropdown'
import { Login, Register } from './modal'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { UserContext } from "../context/user"
import { API } from '../config/api'

export default function Header() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const [adminDropdown, setAdminDropdown] = useState(false)

  function switchModal() {
    if (modalLogin) {
      setModalLogin(false)
      setModalRegister(true)
    } else {
      setModalRegister(false)
      setModalLogin(true)
    }
  }

  function logOut() {
    setUserDropdown(false)
    setAdminDropdown(false)
    dispatch({ type: 'LOGOUT' })
  }

  const { data: cart } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts");
    return response.data.data;
  });

  useEffect(() => {
    if (state.isLogin === true) {
      setModalLogin(false)
      setModalRegister(false)
    }
  },[state])
  return (
    <header>
      <nav className='flex justify-between items-center bg-[#f5f5f5] shadow-2xl py-4 px-24'>
        <motion.img className='h-12 cursor-pointer' src={logo} alt="logo"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={ () => navigate("/") }
        />
        { state.isLogin ?
        <div className="flex items-center">
          { state.user.status === "customer" &&
          <div>
            <img src={cartIcon} alt="cart" onClick={()=>navigate("/cart")} />
            { cart?.length >= 1 &&
            <span>{cart?.length}</span>
            }
          </div>
          }
          <img src="https://picsum.photos/200/300" alt="user"
          onClick={() => (state.user.status === "admin") ? setAdminDropdown(!adminDropdown) : setUserDropdown(!userDropdown)}
          />
        </div>
        :
        <div className='grid grid-cols-2 gap-4'>
          <motion.button className='font-bold pt-0.5 pb-1 px-6 text-sm text-[#613d2b] rounded-md border-2 border-[#613d2b]'
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={ () => setModalLogin(true) }>
            Login
          </motion.button>
          <motion.button className='font-semibold pt-0.5 pb-1 px-6 text-sm bg-[#613d2b] text-white rounded-md'
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={ () => setModalRegister(true) }>
            Register
          </motion.button>
        </div>
        }
      </nav>

      <Login
      modalLogin={modalLogin}
      setModalLogin={setModalLogin}
      switchModal={switchModal}
      />

      <Register
      modalRegister={modalRegister}
      setModalRegister={setModalRegister}
      switchModal={switchModal}
      />

      <Dropdown
      adminDropdown={adminDropdown}
      userDropdown={userDropdown}
      logOut={logOut}
      />
    </header>
  )
}
