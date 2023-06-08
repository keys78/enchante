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
    <nav className="flex items-center justify-between text-black">
      <Link to="/">
        <div className="bg-black text-white p-[20px]">
          <h1 className="text-[30px]">Emart</h1>
        </div>
      </Link>

      <div>
        <ul className="flex">
          <li>New Collections</li>
          <li>Popular</li>
          <li>Shop Now</li>
        </ul>
      </div>

      <div className="flex space-x-5">
      <MagnifyingGlass size={32} color="#070707" weight="duotone"/>


          <Link to="/cart">
            <div className="relative">
              <ShoppingCartSimple size={32} color="#070707" weight="duotone" />
              <span className="h-[20px] w-[20px] bg-black text-white
              flex items-center justify-center text-center rounded-full font-semibold
              absolute -top-2 -right-2">{cartTotalQuantity}</span>
            </div>
          </Link>
          <UserCircle size={32} color="#070707" weight="duotone" />



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


