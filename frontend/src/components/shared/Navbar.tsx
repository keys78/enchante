import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { getTotals } from "../../reducers/cart/cartSlice";
import { RootState } from "../../network/store";
import { BaseballCap, Dress, List, MagnifyingGlass, Pants, ShoppingCartSimple, UserCircle, X } from "@phosphor-icons/react";
import FilterSearch from "../UI/FilterSearch";
import useWindowSize from "../hooks/useWindowSize";
import Sidebar from "../sidebar/Sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { modalVariantsShort, searchBarVariants } from "../../utils/animations";
import LogoMain from "../../assets/svg/LogoMain";
import UserActionsPanel from "../UI/UserActionsPanel";
import { getUser } from "../../reducers/private/user/userSlice";


const NavBar = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const [showUserCTA, setShowUserCTA] = useState<boolean>(false)
  const [isSideBar, setIsSideBar] = useState<boolean>(false)
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  const cart = useAppSelector((state: RootState) => state.cart);
  const storedToken = localStorage.getItem('ent-token');
  const { user } = useAppSelector(state => state.user)

  const options = [
    { label: 'Men', value: 'men', icon: <BaseballCap /> },
    { label: 'Women', value: 'women', icon: <Dress /> },
    { label: 'Pants', value: 'pants', icon: <Pants /> },
  ];

  useEffect(() => {
    dispatch(getTotals());
    if (storedToken) {
      dispatch(getUser())
    }
  }, [dispatch, cart, storedToken]);

  useEffect(() => {
    const isSticky = () => {
      const header = document.querySelector('.header-section');
      const scrollTop = window.scrollY;
      scrollTop >= 50 ? header?.classList.add('is-sticky') : header?.classList.remove('is-sticky');
    };

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);



  return (
    <>
      <header className="header-section flex items-center justify-between text-black relative border-b border-gray-200 pt-[30px] pb-[24px] app-container s-767:px-[40px] px-[16px]">
        <Link to="/">
          <div className="logo-main bg-black text-white py-[30px] px-[20px] absolute top-0 left-0">
            <LogoMain logo_width="s-480:w-[140px] w-[90px]" />
          </div>
        </Link>

        {width > 1024 && <ul className="flex space-x-20 uppercase -mr-[200px]">
          <li>
            <a
              href="/#currated"
              className="hover-underline-animation font-bold"
            >
              New Collections
            </a>
          </li>
          <li>
            <a
              href="/#featured"
              className="hover-underline-animation font-bold"
            >
              Popular
            </a>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "border-b-2 border-orangeSkin" : "hover-underline-animation font-bold")}
            >
              Shop Now
            </NavLink>
          </li>
        </ul>}

        <div className="flex items-center justify-end space-x-8 w-[300px]">
          {width > 767 && <FilterSearch options={options} />}

          <AnimatePresence>
            {
              width < 767 && showSearchBar &&
              <motion.div
                variants={searchBarVariants}
                initial="initial"
                animate="final"
                exit="exit"
                className="w-full bg-black fixed top-0 left-0 z-50 flex items-center justify-center py-[27px]">
                <X size={22} onClick={() => setShowSearchBar(false)} className="absolute top-2 right-2" color="#f1f1f1" />
                {<FilterSearch options={options} />}
              </motion.div>
            }
          </AnimatePresence>

          {width < 767 && <MagnifyingGlass onClick={() => setShowSearchBar(!showSearchBar)} size={22} color="#070707" weight="regular" />}

          <Link to="/cart">
            <div className="relative">
              <ShoppingCartSimple size={26} color="#070707" weight="regular" />
              <span className="h-[20px] w-[20px] text-white bg-orangeSkin
              flex items-center justify-center text-center rounded-full font-semibold
              absolute -top-2 -right-2 text-[12px]">{cartTotalQuantity}</span>
            </div>
          </Link>

          {
            width > 767 &&
            <div className="w-[26px] relative">
              {user?.username ?
                <span className="text-black" >{user?.username}</span>
                :
                <UserCircle onClick={() => setShowUserCTA(!showUserCTA)} size={26} className="cursor-pointer" color="#070707" weight="regular" />

              }
              <AnimatePresence>
                {showUserCTA &&
                  <motion.div
                    variants={modalVariantsShort}
                    initial="initial"
                    animate="final"
                    exit="exit"
                    className="border-2-border-black absolute mt-[20px] -left-[220px]">
                    <UserActionsPanel />
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          }

          <div className="w-[26px]">
            {width < 787 &&
              <>
                {
                  !isSideBar ?
                    <List size={26} onClick={() => setIsSideBar(!isSideBar)} color="#070707" weight="regular" />
                    :
                    <X size={26} onClick={() => setIsSideBar(!isSideBar)} className={`${isSideBar && 'update-closing'}`} color="#070707" weight="regular" />
                }
              </>
            }
          </div>
        </div>

        {width < 1024 &&
          <Sidebar isSideBar={isSideBar} setIsSideBar={setIsSideBar} />
        }
      </header>

    </>
  );
};

export default NavBar;
