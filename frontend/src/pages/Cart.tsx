import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart, getTotals, removeFromCart, } from "../reducers/cart/cartSlice"
import { Link } from "react-router-dom";
import CheckoutButton from "../components/UI/CheckoutButton";
import { RootState } from "../network/store";
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { CaretRight, Minus, Plus, TrashSimple } from "@phosphor-icons/react";
import QuantityControlsBtn from "../components/products/QuantityControlsBtn";
import { motion } from "framer-motion";
import { useAddQuantity, useDecreaseQuantity } from "../components/hooks/useCartControls";
import NewsLetter from "../components/home/NewsLetter";
import { CartItem } from "../types";


const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state: RootState) => state.cart)
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const addQuantity = useAddQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  //   const auth = useSelector((state) => state.auth);
  const auth = true



  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);




  return (
    <section className="app-container px-[120px]">
      <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
        <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span>
        <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/products'}>Products</Link> <CaretRight size={14} /> </span>
        <span className='font-bold'>Cart</span>
      </div>

      <div className="continue-shopping flex items-center space-x-3">
              <Link to="/">
                <svg
                  xmlns="http:www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>

      <div className="flex space-x-5 items-start">
        <div className="max-w-[70%] w-full">
          {cart.cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is currently empty</p>
              <div className="start-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="border border-gray-300 rounded-[5px]">
                <div className="border-b border-gray-300 py-4 px-[10px] flex items-center justify-between">
                  <h1>Cart ({cartTotalQuantity})</h1>
                  <button className="flex items-center" onClick={() => dispatch(clearCart())}>
                    Clear Cart &nbsp;&nbsp;<TrashSimple size={16} color="#141414" />
                  </button>
                </div>
                <div className="px-[10px]">
                  {cart.cartItems &&
                    cart.cartItems.map((cartItem: CartItem) => (
                      <div className="flex items-start justify-between rounded-[5px] mb-[12px] my-[20px]" key={cartItem.id}>
                        <div className="">
                          <div className="flex space-x-5">
                            <img className="max-w-[300px] w-full rounded-[5px]" src={cartItem.image} alt={cartItem.name} />
                            <div>
                              <h3 className="font-medium mb-[50px]">{cartItem.name}</h3>
                              <button className="underline text-orangeSkin" onClick={() => dispatch(removeFromCart(cartItem))}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className='flex flex-col justify-between items-end'>
                            <div className='flex items-start space-x-3 mb-[50px]'>
                              <span className="text-[24px] font-medium montserrat">${cartItem?.price}</span>
                              {cartItem?.discount && <span className='text-[14px] font-medium montserrat opacity-60 discount-strike'>${(cartItem?.price * 0.3) + cartItem?.price}</span>}
                            </div>
                            <div className="flex items-center space-x-5">
                              <QuantityControlsBtn
                                onClick={() => { decreaseQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                children={<Minus size={24} color="#f8f8f8" weight="bold" />}
                                disabled={cartItem.cartQuantity <= 1}
                                className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[6px] ${cartItem.cartQuantity <= 1 && 'opacity-60 cursor-not-allowed'}`}
                              />

                              <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{cartItem.cartQuantity}</motion.span>

                              <QuantityControlsBtn
                                onClick={() => { addQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                children={<Plus size={24} color="#f8f8f8" weight="bold" />}
                                className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[6px]`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          )}
        </div>
        <div className="border border-gray-300 rounded-[5px]">
          <div className="border-b border-gray-300 p-[10px]">
            Cart Summary
          </div>
          <div className="px-[10px] ">
            <div className="border-b border-gray-300">
              <div className="flex items-center justify-between py-2">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <div className="flex items-center justify-between ">
                <span>Discount</span>
                <span className="amount">${0}</span>
              </div>
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            {auth ? (
              <CheckoutButton cartItems={cart.cartItems} />
            ) : (
              <button
                className="cart-login"
                onClick={() => navigate("/login")}
              >
                Login to Check out
              </button>
            )}

          </div>
        </div>
      </div>
      <NewsLetter newsletter_extras={"pt-[144px]"} />
    </section>
  );
};

export default Cart;