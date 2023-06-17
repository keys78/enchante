import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  isSideBar: boolean
}

const Sidebar = ({ isSideBar }: Props) => {
  const menuVariations = {
    closed: {
      opacity: 0,
      x: -100,
      pointerEvents: 'none',
      transition: { duration: 0.2, delay: 0.2 }
    },
    open: {
      opacity: 1,
      x: 0,
      pointerEvents: 'auto',
      transition: { duration: 0.2 }
    },
  };

  return (
    <AnimatePresence >
      {isSideBar && (
        <motion.section
          variants={menuVariations as any}
          initial="closed"
          animate={isSideBar ? "open" : "closed"}
          exit="closed"
          className='sidebar-wrapper w-[300px] bg-white text-textGray h-[100vh] fixed top-0 left-0 p-[20px] '
        >
          <div className="bg-black text-white py-[30px] px-[20px] absolute top-0 left-0">
            <h1 className="s-767:text-[30px] text-[18px]">enchanté</h1>
          </div>

          <div className='mt-[120px]'>
            <ul className="uppercase flex flex-col space-y-7 ">
              <li> <NavLink to={'/#currated'} className="hover-underline-animation font-bold" >New Collections</NavLink></li>
              <li> <NavLink to={'/#featured'} className="hover-underline-animation font-bold" >Popular</NavLink></li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? "border-b-2 border-orangeSkin" : "hover-underline-animation font-bold")}
                >
                  Shop Now
                </NavLink>
              </li>
              <li>User</li>

            </ul>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Sidebar
