import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariant, modalVariants } from '../../utils/animations';
import * as Icon from "@phosphor-icons/react";
import NavLinks from './NavLinks';
import LogoMain from '../../assets/svg/LogoMain';

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
          className='sidebar-wrapper w-full h-[100vh] fixed top-0 left-0 '
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="final"
            exit="exit"
            className='w-[300px] bg-white text-textGray h-[100%] overflow-y-auto p-[20px] '>
            <div className='mt-[100px]'>
              <Link to="/">
                <div className="logo-main bg-black text-white py-[30px] px-[20px] absolute top-0 left-0">
                  <LogoMain logo_width="s-480:w-[140px] w-[90px]" />
                </div>
              </Link>

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
                <li>
                  <p className='font-bold text-black !normal-case text-[14px] flex items-center'>Account Section &nbsp;&nbsp; <Icon.CaretDown /></p>
                  <NavLinks
                    list_style={'py-2 flex flex-col'}
                    setIsSideBar={setIsSideBar}
                    isSideBar={isSideBar}
                    link_text_size={"text-[14px]"}
                    icon_size={16}
                  />
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