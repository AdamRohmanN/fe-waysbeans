import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import triangle from '../../assets/triangle-white.svg'
import profile from '../../assets/profile.svg'
import product from '../../assets/coffee.svg'
import out from '../../assets/logout.svg'

const dropdownList = {
    hidden: { y: "-1rem", opacity: 0 },
    visible: { y: "0rem", opacity: 1,
        transition: { delayChildren: 0.1, staggerChildren: 0.1 }
    },
    exit: { y: "-1rem", opacity: 0 }
}
const dropdownItem = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
}

export default function Dropdown({adminDropdown, userDropdown, logOut}) {
    const navigate = useNavigate()
    
    return (
        <>
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
            {adminDropdown &&
            <section>
                <motion.ul
                initial="hidden" animate="visible" exit="exit"
                variants={ dropdownList }>
                    <img src={triangle} alt="white-triangle" />
                    <motion.li
                    variants={ dropdownItem }
                    onClick={() => navigate('/add-product')}>
                        <img src={product} alt="icon" />
                        <p>Add Product</p>
                    </motion.li>
                    <motion.li
                    variants={ dropdownItem }
                    onClick={() => navigate('/products-list')}>
                        <img src={product} alt="icon" />
                        <p>List Product</p>
                    </motion.li>
                    <motion.li
                    variants={ dropdownItem }
                    onClick={ logOut }>
                        <img src={out} alt="icon" />
                        <p>Logout</p>
                    </motion.li>
                </motion.ul>
            </section>
            }
        </AnimatePresence>
        
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
            {userDropdown &&
            <section>
                <motion.ul
                initial="hidden" animate="visible" exit="exit"
                variants={ dropdownList }>
                    <img src={triangle} alt="white-triangle" />
                    <motion.li
                    variants={ dropdownItem }
                    onClick={() => navigate('/profile')}>
                    <img src={profile} alt="icon" />
                    <p>Profile</p>
                    </motion.li>
                    <motion.li
                    variants={ dropdownItem }
                    onClick={ logOut }>
                    <img src={out} alt="icon" />
                    <p>Logout</p>
                    </motion.li>
                </motion.ul>
            </section>
            }
        </AnimatePresence>
        </>
    )
}