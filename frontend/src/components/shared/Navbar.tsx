import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { getTotals } from "../../reducers/cart/cartSlice";
import { RootState } from "../../network/store";
import { MagnifyingGlass, ShoppingCartSimple, Stethoscope, User, UserCircle } from "@phosphor-icons/react";
import FilterSearch from "../FilterSearch";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  const cart = useAppSelector((state: RootState) => state.cart);
  const auth = true

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch, cart])

  return (
    <nav className="flex items-center justify-between text-black relative border-b border-textGray pt-[30px] pb-[24px] app-container px-[40px]">
      <Link to="/">
        <div className="bg-black text-white py-[30px] px-[20px] fixed top-0 s-1920:left-[320px] left-0">
          <h1 className="text-[30px]">Emart</h1>
        </div>
      </Link>

      <ul className="flex space-x-20 uppercase">
        <a href="#" className=""><li className="hover-underline-animation font-bold">New Collections</li></a>
        <a href="#" className=""><li className="hover-underline-animation font-bold">Popular</li></a>
        <a href="#" className=""><li className="hover-underline-animation font-bold">Shop Now</li></a>
      </ul>

      <div className="flex space-x-8">
        <MagnifyingGlass size={26} color="#070707" weight="thin" />
        <Link to="/cart">
          <div className="relative">
            <ShoppingCartSimple size={26} color="#070707" weight="thin" />
            <span className="h-[20px] w-[20px] bg-orangie text-white
              flex items-center justify-center text-center rounded-full font-semibold
              absolute -top-2 -right-2 text-[12px]">{cartTotalQuantity}</span>
          </div>
        </Link>
        <UserCircle size={26} color="#070707" weight="thin" />



        {/* {auth ? (
            <button
              onClick={() => {
                // dispatch(logoutUser(null));
                toast.warning("Logged out!", { position: "bottom-left" });
              }}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="register">Register</Link>
            </div>
          )} */}
      </div>

    </nav>
  );
};

export default NavBar;


