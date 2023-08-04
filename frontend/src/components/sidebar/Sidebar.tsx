import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariant, modalVariants } from '../../utils/animations';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { resetUser } from '../../reducers/private/user/userSlice';
import { logout } from '../../reducers/auth/authSlice';
import AccountSidebar from './AccountSidebar';
import * as Icon from "@phosphor-icons/react";
import pagesList from '../../utils/data';
import React from 'react';

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

  //   const pagesList = [
  //     { title: 'Account', icon: <AppWindow size={22} color={` ${location.pathname === '/user/account' ? '#f75a2c' : '#141414'}`} />, link: '/user/account' },
  //     { title: 'Sell On enchanté', icon: <Money size={22} color={` ${location.pathname === '/user/seller' ? '#f75a2c' : '#141414'}`} />, link: '/user/seller' },
  //     { title: 'My Products', icon: <Stack size={22} color={` ${location.pathname === '/user/my-products' ? '#f75a2c' : '#141414'}`} />, link: '/user/my-products' },
  //     { title: 'Orders', icon: <Package size={22} color={` ${location.pathname === '/user/orders' ? '#f75a2c' : '#141414'}`} />, link: '/user/orders' },
  //     { title: 'Inbox', icon: <EnvelopeOpen size={22} color={` ${location.pathname === '/user/inbox' ? '#f75a2c' : '#141414'}`} />, link: '/user/inbox' },
  //     { title: 'Saved Items', icon: <ArchiveBox size={22} color={` ${location.pathname === '/user/saved-items' ? '#f75a2c' : '#141414'}`} />, link: '/user/saved-items' },
  // ]

  // if (user.role === 'admin') {
  //     pagesList.splice(1, 0, { title: 'Manage Products', icon: <Kanban size={22} color={` ${location.pathname === '/admin/manage-products' ? '#f75a2c' : '#141414'}`} />, link: '/admin/manage-products' });
  // }

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
            className='w-[300px] bg-white text-textGray h-[100%] p-[20px]'>
            <div className='mt-[120px]'>
              <AccountSidebar />

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
                <li><p className='font-bold'>My Account</p>
                  <ul className="py-2 flex flex-col">
                    <div>
                      {pagesList.map((val) => {
                        const IconComponent = Icon[val.icon]; // Access the icon dynamically
                        return (
                          <li
                            key={val.title}
                            onClick={() => { navigate(val.link); setIsSideBar(!isSideBar)} }
                            className={`py-3 px-4 hover:bg-frenchGray cursor-pointer mb-1 ${location.pathname === val.link ? 'bg-frenchGray text-orangeSkin' : ''
                              }`}
                          >
                            <span className="flex items-center">
                              <IconComponent size={22} color={val.color} /> &nbsp;&nbsp;&nbsp; {val.title}
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