import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { getTotals, addToCart, decreaseCart } from "../../reducers/cart/cartSlice";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  // const auth = useAppSelector((state) => state.auth);
  const auth = true

  useEffect(() => {
    dispatch(getTotals())
  }, [dispatch, addToCart, decreaseCart])

  return (
    <nav className="flex items-center justify-between bg-black text-white py-2 px-3">
      <Link to="/">
        <h2>pickMe</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
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
    </nav>
  );
};

export default NavBar;


