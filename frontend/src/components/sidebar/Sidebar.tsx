import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariant, modalVariants } from '../../utils/animations';

interface Props {
  isSideBar: boolean,
  setIsSideBar: (arg0: boolean) => void
}

const Sidebar = ({ isSideBar, setIsSideBar }: Props) => {

  return (
    <AnimatePresence>
      {isSideBar && (
        <motion.section
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className='sidebar-wrapper w-full h-[100vh] fixed top-0 left-0  '
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="final"
            exit="exit"
            className='w-[300px] bg-white text-textGray h-[100vh] p-[20px]'>
            <div className='mt-[120px]'>
              <ul className="uppercase flex flex-col space-y-7 ">
                <li> <NavLink to={'/#currated'} onClick={() => setIsSideBar(!isSideBar)} className="hover-underline-animation font-bold" >New Collections</NavLink></li>
                <li> <NavLink to={'/#featured'} onClick={() => setIsSideBar(!isSideBar)} className="hover-underline-animation font-bold" >Popular</NavLink></li>
                <li>
                  <NavLink
                    to="/products"
                    onClick={() => setIsSideBar(!isSideBar)} className={({ isActive }) => (isActive ? "border-b-2 border-orangeSkin" : "hover-underline-animation font-bold")}
                  >
                    Shop Now
                  </NavLink>
                </li>
                <li>User</li>

              </ul>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Sidebar;