import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { getTotals } from "../../reducers/cart/cartSlice";
import { RootState } from "../../network/store";
import { ShoppingCartSimple } from "@phosphor-icons/react";
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
    <nav className="flex items-center justify-between text-black py-2 px-3">
      <FilterSearch options={options} />

      <Link to="/">
        <h1 className="font-bold text-[30px]">Me-commerce</h1>
      </Link>

      <div className="flex space-x-5">
        <Link to="/cart">
          <div className="relative">
              <ShoppingCartSimple size={32} color="#fafafa" weight="duotone" />
              <span className="h-[20px] w-[20px] bg-white text-black
              flex items-center justify-center text-center rounded-full font-semibold
              absolute -top-2 -right-2">{cartTotalQuantity}</span>
          </div>
        </Link>
        {auth ? (
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
        )}
      </div>

    </nav>
  );
};

export default NavBar;


