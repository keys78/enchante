import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariant, modalVariants } from '../../utils/animations';

interface Props {
  isSideBar: boolean,
  setIsSideBar: (arg0: boolean) => void
}

const Sidebar = ({ isSideBar, setIsSideBar }: Props) => {
  const auth = false

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
                <li><p className='font-bold'>User</p>
                  <ul>
                    <li className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer text-[14px]">My Account</li>
                    <li className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer text-[14px]">My Orders</li>
                    <li className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer text-[14px]">Saved Items</li>
                    <br />
                    {auth ? (
                      <li className="pt-[8px] mt-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                      </li>
                    ) : (
                      <Link to="/auth/login"><li className="pb-[8px] mb-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG IN</button>
                      </li>
                      </Link>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Sidebar;