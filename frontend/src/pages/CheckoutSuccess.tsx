import { useEffect } from "react";
import { clearCart } from "../reducers/cart/cartSlice";
import { useAppDispatch } from "../network/hooks";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  const dispatch = useAppDispatch();
  const storedCartItems = localStorage.getItem("enchante-cart");

  useEffect(() => {
    const parsedCartItems = JSON.parse(storedCartItems || "[]");

    if (parsedCartItems.length > 0) {
      dispatch(clearCart());
    }
  }, [dispatch, storedCartItems]);

  return (
    <section className="app-container px-[120px]">
      <div className='pt-[30px] pb-[18px] flex items-center justify-center space-x-2 w-full s-480:h-[500px] h-[200px]'>
        <div className="text-center">
          <p className="pb-4">Thank you for your patronage</p>
          <p className="pb-4">A copy of your order has been sent to your email</p>
          <div>
            <Link to={'/user/orders'}>
              <button className="p-2 bg-black text-white rounded-[5px] w-[200px]">Continue To Orders</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutSuccess;
