import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariant, modalVariants } from '../../utils/animations';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { resetUser } from '../../reducers/private/user/userSlice';
import { logout } from '../../reducers/auth/authSlice';
import * as Icon from "@phosphor-icons/react";
import { pagesList } from '../../utils/data';

interface Props {
  isSideBar: boolean,
  setIsSideBar: (arg0: boolean) => void
}

const Sidebar = ({ isSideBar, setIsSideBar }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.user)

  function logoutUser() {
    dispatch(logout())
    window.location.href = '/';
    setTimeout(() => { dispatch(resetUser()); }, 3000)
  }


  const filteredPagesList = user?.role === "admin"
    ? pagesList
    : pagesList.filter((val) => val.title !== 'Manage Products');


  return (
    <AnimatePresence>
      {isSideBar && (
        <motion.section
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className='sidebar-wrapper w-full h-[100vh] fixed top-0 left-0 '
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="final"
            exit="exit"
            className='w-[300px] bg-white text-textGray h-[100%] overflow-y-auto p-[20px] '>
            <div className='mt-[80px]'>

              <ul className="uppercase flex flex-col space-y-4 ">
                <li> <NavLink to={'/#currated'} onClick={() => setIsSideBar(!isSideBar)} className="!capitalize hover-underline-animation font-bold" >New Collections</NavLink></li>
                <li> <NavLink to={'/#featured'} onClick={() => setIsSideBar(!isSideBar)} className="!capitalize hover-underline-animation font-bold" >Popular</NavLink></li>
                <li>
                  <NavLink
                    to="/products"
                    onClick={() => setIsSideBar(!isSideBar)} className={({ isActive }) => (isActive ? "border-b-2 border-orangeSkin" : "!capitalize hover-underline-animation font-bold")}
                  >
                    Shop Now
                  </NavLink>
                </li>
                <li><p className='font-bold text-black !normal-case text-[14px] flex items-center'>Account Section &nbsp;&nbsp; <Icon.CaretDown /></p>
                  <ul className="py-2 flex flex-col">
                    <div>
                      {
                        filteredPagesList.map((val) => {
                          const IconComponent = Icon[val.icon]; // Access the icon dynamically
                          return (
                            <li
                              key={val.title}
                              onClick={() => { navigate(val.link); setIsSideBar(!isSideBar) }}
                              className={`py-3 px-4 hover:bg-frenchGray cursor-pointer mb-1 ${location.pathname === val.link ? 'bg-frenchGray text-orangeSkin' : ''
                                }`}
                            >
                              <span className="flex items-center text-[14px]">
                                <IconComponent size={16} color={location.pathname === val.color} /> &nbsp;&nbsp;&nbsp; {val.title}
                              </span>
                            </li>
                          );
                        })}
                    </div>

                    {user.username && (
                      <li onClick={() => logoutUser()} className="pt-[8px] border-t mt-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                      </li>
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