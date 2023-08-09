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
        <div>
          <p className="pb-4">Thank you for your order</p>
          <div>
            <Link to={'/products'}>
              <button className="p-2 bg-black text-white rounded-[5px] w-full">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutSuccess;
