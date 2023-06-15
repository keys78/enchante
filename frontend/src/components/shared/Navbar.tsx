import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { getTotals } from "../../reducers/cart/cartSlice";
import { RootState } from "../../network/store";
import { ShoppingCartSimple, UserCircle } from "@phosphor-icons/react";
import FilterSearch from "../UI/FilterSearch";

const NavBar = () => {
  const dispatch = useAppDispatch();
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
    <header className="header-section flex items-center justify-between text-black relative border-b border-gray-200 pt-[30px] pb-[24px] app-container px-[40px]">
      <Link to="/">
        <div className="bg-black text-white py-[30px] px-[20px] fixed top-0 s-1920:left-[320px] left-0">
          <h1 className="text-[30px]">enchanté</h1>
        </div>
      </Link>

      <ul className="flex space-x-20 uppercase -mr-[200px]">
        <li>
          <a
            href="/#currated"
            // className={({ isActive }) => (isActive ? "border-b-2 border-orangeSkin" : "")}
            className="hover-underline-animation font-bold"
          >
            New Collections
          </a>
        </li>
        <li>
          <a
            href="/#featured"
            // className={({ isActive }) => (isActive ? "border-b-2 border-orangeSkin" : "")}
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
      </ul>

      <div className="flex items-center justify-end space-x-8 w-[300px]">
        <FilterSearch options={options} />
        <Link to="/cart">
          <div className="relative">
            <ShoppingCartSimple size={26} color="#070707" weight="regular" />
            <span className="h-[20px] w-[20px] text-white bg-orangeSkin
              flex items-center justify-center text-center rounded-full font-semibold
              absolute -top-2 -right-2 text-[12px]">{cartTotalQuantity}</span>
          </div>
        </Link>
        <div className="w-[26px]">
          <UserCircle size={26} color="#070707" weight="regular" />
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
    </header>
  );
};

export default NavBar;
