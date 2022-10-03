import { UserContext } from "../context/user"
import { API } from '../config/api'

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from 'react-query'

const modal = {
    hidden: { y: "-100vw", opacity: 0 },
    visible: { y: "0vw", opacity: 1,
        transition: { duration: 0.1, type: "spring", damping: 50, stiffness: 500 }
    },
    exit: { y: "100vw", opacity: 0 }
}

const styles = {
    inputAuth: 'bg-[#d7ceca] border-2 border-[#613d2b] rounded-md py-1.5 px-2 mb-4'
}

export function Register({modalRegister, setModalRegister, switchModal}) {
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {'Content-type': 'application/json'}
            }

            const body = JSON.stringify(form);

            await API.post('/register', body, config);

            switchModal()
        } catch (error) {
            console.log(error)
            setMessage(
                <p>{error}</p>
            )
        }
    })
    return (
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
            { modalRegister &&
            <motion.section className='fixed z-50 top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-90 cursor-pointer'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={ () => setModalRegister(false) }>
                <motion.form className='w-1/4 py-8 px-6 flex flex-col bg-white rounded-md cursor-default'
                initial="hidden" animate="visible" exit="exit"
                variants={ modal }
                onClick={ (e) => e.stopPropagation() }
                onSubmit={ (e) => handleSubmit.mutate(e) }>
                    <h2 className='mb-7 font-bold text-[#613d2b] text-3xl'>Register</h2>
                    {message}
                    <input className={styles.inputAuth}
                    type="email"
                    id="email" name="email"
                    placeholder="Email"
                    value={email}
                    onChange={ handleChange }
                    />
                    <input className={styles.inputAuth}
                    type="password"
                    id="password" name="password"
                    placeholder="Password"
                    value={password}
                    onChange={ handleChange }
                    />
                    <input className={styles.inputAuth}
                    type="text"
                    id="name" name="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={ handleChange }
                    />
                    <button className='w-100 py-2 mt-3 mb-4 bg-[#613d2b] rounded-md font-semibold text-white text-sm'
                    type="submit">
                        Register
                    </button>
                    <p className='text-sm text-center tracking-wide'>Already have an account ? Click
                        <strong className='cursor-pointer' onClick={ switchModal }> Here</strong>
                    </p>
                </motion.form>
            </motion.section>
            }
        </AnimatePresence>
    )
}

export function Login({modalLogin, setModalLogin, switchModal}) {
    const navigate = useNavigate()
    const [_, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const { email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            
            const config = {
                headers: {'Content-type': 'application/json'}
            }

            const body = JSON.stringify(form)

            const response = await API.post('/login', body, config)

            if (response?.status === 200) {
                dispatch({
                    type: 'LOGIN',
                    payload: response.data.data
                })

                if (response.data.data.status === "admin") {
                    navigate('/income')
                } else {
                    navigate('/')
                }
            }

        } catch (error) {
            console.log(error)
            setMessage(
                <p>{error}</p>
            )
        }
    })
    return (
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
            { modalLogin &&
            <motion.section className='fixed z-50 top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-90 cursor-pointer'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={ () => setModalLogin(false) }>
                <motion.form className='w-96 py-8 px-6 flex flex-col bg-white rounded-md cursor-default'
                initial="hidden" animate="visible" exit="exit"
                variants={ modal }
                onClick={ (e) => e.stopPropagation() }
                onSubmit={ (e) => handleSubmit.mutate(e) }>
                    <h2 className='mb-7 font-bold text-[#613d2b] text-3xl'>Login</h2>
                    {message}
                    <input className={styles.inputAuth}
                    type="email"
                    id="email" name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                    />
                    <input className={styles.inputAuth}
                    type="password"
                    id="password" name="password"
                    placeholder="Password"
                    value={password}
                    onChange={ handleChange }
                    required
                    />
                    <button className='w-100 py-2 mt-3 mb-4 bg-[#613d2b] rounded-md font-semibold text-white text-sm'
                    type="submit">
                        Login
                    </button>
                    <p className='text-sm text-center tracking-wide'>Don't have an account ? Click
                        <strong className='cursor-pointer' onClick={ switchModal }> Here</strong>
                    </p>
                </motion.form>
            </motion.section>
            }
        </AnimatePresence>
    )
}
