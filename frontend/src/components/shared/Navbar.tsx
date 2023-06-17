import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { getTotals } from "../../reducers/cart/cartSlice";
import { RootState } from "../../network/store";
import { List, MagnifyingGlass, ShoppingCartSimple, UserCircle } from "@phosphor-icons/react";
import FilterSearch from "../UI/FilterSearch";
import useWindowSize from "../hooks/useWindowSize";
import Sidebar from "../sidebar/Sidebar";
import { AnimatePresence } from "framer-motion";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const [isSideBar, setIsSideBar] = useState<boolean>(false)
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  const cart = useAppSelector((state: RootState) => state.cart);
  const auth = true;
  const options = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Pants', value: 'pants' },
  ];

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  useEffect(() => {
    const isSticky = () => {
      const header: any = document.querySelector('.header-section');
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
            <h1 className="s-767:text-[30px] text-[18px]">enchanté</h1>
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
          {width < 767 && <MagnifyingGlass size={22} color="#070707" weight="regular" />}
          <Link to="/cart">
            <div className="relative">
              <ShoppingCartSimple size={26} color="#070707" weight="regular" />
              <span className="h-[20px] w-[20px] text-white bg-orangeSkin
              flex items-center justify-center text-center rounded-full font-semibold
              absolute -top-2 -right-2 text-[12px]">{cartTotalQuantity}</span>
            </div>
          </Link>
          {width > 767 && <div className="w-[26px]">
            <UserCircle size={26} color="#070707" weight="regular" />
          </div>}
          <div className="w-[26px]">
            <List onClick={() => setIsSideBar(!isSideBar)} size={26} color="#070707" weight="regular" />
          </div>
        </div>
        {/* {auth ? (
//             <button
//               onClick={() => {
//                 // dispatch(logoutUser(null));
//                 toast.warning("Logged out!", { position: "bottom-left" });
//               }}
//             >
//               Logout
//             </button>
//           ) : (
//             <div>
//               <Link to="/login">Login</Link>
//               <Link to="register">Register</Link>
//             </div>
//           )} */}
        {width < 1024 && isSideBar &&
            <Sidebar  isSideBar={isSideBar}/>

        }
      </header>

    </>
  );
};

export default NavBar;
