import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart, getTotals, removeFromCart, } from "../reducers/cart/cartSlice"
import { Link } from "react-router-dom";
import CheckoutButton from "../components/UI/CheckoutButton";
import { RootState } from "../network/store";
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { CaretLeft, CaretRight, Minus, Plus, TrashSimple } from "@phosphor-icons/react";
import QuantityControlsBtn from "../components/products/QuantityControlsBtn";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useAddQuantity, useDecreaseQuantity } from "../components/hooks/useCartControls";
import NewsLetter from "../components/home/NewsLetter";
import { CartItem } from "../types";
import useWindowSize from "../components/hooks/useWindowSize";
import { characterLimit } from "../utils/general";


const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const cart = useAppSelector((state: RootState) => state.cart)
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const addQuantity = useAddQuantity();
  const { user } = useAppSelector(state => state.user)
  const decreaseQuantity = useDecreaseQuantity();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);


  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => {
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Math.round(latest));

    return formattedValue;
  });

  useEffect(() => {
    const controls = animate(count, cart.cartTotalAmount, { duration: 0.5 });

    return controls.stop;
  }, [cart.cartTotalAmount, count]);



  return (
    <section className="app-container s-1025:px-[80px] s-767:px-[40px] px-[16px]">
      <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
        <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span>
        <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/products'}>Products</Link> <CaretRight size={14} /> </span>
        <span className='font-bold'>Cart</span>
      </div>

      {cart.cartItems.length === 0 &&
        <div className="border border-gray-200 rounded-[5px] flex items-center justify-center h-[50vh]">
          <div>
            <p className="text-[18px] pb-[14px]">Your cart is currently empty</p>
            <div className="">
              <Link className="flex items-center justify-center bg-black text-white px-3 py-2 rounded-[5px]" to="/products">
                <CaretLeft weight="bold" />
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      }


      {cart.cartItems.length > 0 &&
        <div className="w-full">
          <div className="continue-shopping flex items-center space-x-3">
          </div>
          <div className="flex s-991:flex-row flex-col-reverse s-991:space-x-5 items-start">
            <div className="s-991:max-w-[70%] w-full">
              <div>
                <div className="border border-gray-300 rounded-[5px]">
                  <div className="border-b border-gray-300 py-4 px-[10px] flex items-center justify-between">
                    <h1>Cart ({cartTotalQuantity})</h1>
                    <button className="flex items-center" onClick={() => dispatch(clearCart())}>
                      <TrashSimple size={16} color="#141414" />&nbsp;&nbsp;Clear Cart
                    </button>
                  </div>
                  <div className="px-[10px]">
                    {cart.cartItems &&
                      cart.cartItems.map((cartItem: CartItem) => (
                        <div className="s-480:flex items-start justify-between rounded-[5px] mb-[12px] my-[20px]" key={cartItem._id}>
                          <div className="flex space-x-5">
                            <img className="s-700:max-w-[300px] max-w-[120px] w-full rounded-[5px] bg-red-500" src={cartItem.image} alt={cartItem.name} />
                            <div className="w-full">
                              <h3 className="font-medium s-480:mb-[50px] s-480:text-[16px] text-[13px]">{width > 767 ? characterLimit(cartItem?.name, 50) : characterLimit(cartItem?.name, 20)}</h3>
                              {width > 480 &&
                                <button className="underline text-orangeSkin s-480:text-[16px] text-[13px]" onClick={() => dispatch(removeFromCart(cartItem))}>
                                  Remove
                                </button>
                              }
                              {width < 480 &&
                                <div className='w-full'>
                                  <div className='flex items-start space-x-3'>
                                    <span className="s-480:text-[20px] text-[14px] font-medium montserrat s-480:pt-0 pt-[6px] s-480:pb-0 pb-[12px]">${cartItem?.price}</span>
                                    {cartItem?.discount && <span className='s-480:text-[12px] text-[10px] font-medium montserrat opacity-60 discount-strike'>${(cartItem?.price * 0.3) + cartItem?.price}</span>}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <button className="underline text-orangeSkin s-480:text-[16px] text-[13px]" onClick={() => dispatch(removeFromCart(cartItem))}>
                                      Remove
                                    </button>
                                    <div className="flex items-center s-480:space-x-5 space-x-2">
                                      <QuantityControlsBtn
                                        onClick={() => { decreaseQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                        children={<Minus size={width > 480 ? 20 : 10} color="#f8f8f8" weight="bold" />}
                                        disabled={cartItem.cartQuantity <= 1}
                                        className={`rounded-[2px] s-480:hover:opacity-70 bg-black text-white p-[3px] ${cartItem.cartQuantity <= 1 && 'opacity-60 cursor-not-allowed'}`}

                                      />

                                      <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold s-480:text-[16px] text-[13px]'>{cartItem.cartQuantity}</motion.span>

                                      <QuantityControlsBtn
                                        onClick={() => { addQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                        children={<Plus size={width > 480 ? 20 : 10} color="#f8f8f8" weight="bold" />}
                                        className={`rounded-[2px] s-480:hover:opacity-70 bg-black text-white p-[3px]`}
                                      />
                                    </div>
                                  </div>

                                </div>
                              }
                            </div>
                          </div>
                          {width > 480 &&
                            <div className='flex flex-col justify-between items-end'>
                              <div className='flex items-start space-x-3 mb-[50px]'>
                                <span className="s-480:text-[20px] text-[14px] font-medium montserrat">${cartItem?.price}</span>
                                {cartItem?.discount && <span className='s-480:text-[12px] text-[10px] font-medium montserrat opacity-60 discount-strike'>${(cartItem?.price * 0.3) + cartItem?.price}</span>}
                              </div>
                              <div className="flex items-center s-480:space-x-5 space-x-2">
                                <QuantityControlsBtn
                                  onClick={() => { decreaseQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                  children={<Minus size={width > 480 ? 20 : 10} color="#f8f8f8" weight="bold" />}
                                  disabled={cartItem.cartQuantity <= 1}
                                  className={`rounded-[5px] s-480:hover:opacity-70 bg-black text-white p-[3px] ${cartItem.cartQuantity <= 1 && 'opacity-60 cursor-not-allowed'}`}

                                />

                                <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold s-480:text-[16px] text-[13px]'>{cartItem.cartQuantity}</motion.span>

                                <QuantityControlsBtn
                                  onClick={() => { addQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                  children={<Plus size={width > 480 ? 20 : 10} color="#f8f8f8" weight="bold" />}
                                  className={`rounded-[5px] s-480:hover:opacity-70 bg-black text-white p-[3px]`}
                                />
                              </div>
                            </div>
                          }
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded-[5px] s-991:w-[26%] w-full s-991:mb-0 mb-[40px]">
              <div className="border-b border-gray-300 p-[10px]">
                Cart Summary
              </div>
              <div className="p-[10px] ">
                <div className="flex items-center justify-between">
                  <span className="font-medium opacity-60">Subtotal</span>
                  <motion.span className="montserrat font-medium s-480:text-[18px]">{rounded}</motion.span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-300 mb-[10px]">
                  <span className="font-medium opacity-60">Discount</span>
                  <span className="montserrat font-medium s-480:text-[18px]">${0}</span>
                </div>
                {user?.username ? (
                  <CheckoutButton cartItems={cart.cartItems} />
                ) : (
                  <button
                    className="p-2 bg-black text-white rounded-[5px] w-full"
                    onClick={() => navigate("/auth/login")}
                  >
                    LOGIN TO CHECKOUT
                  </button>
                )}

              </div>
            </div>
          </div>

        </div>
      }

      <NewsLetter newsletter_extras={'s-480:pb-20 pb-10 s-767:pt-[144px] pt-[50px]'} />
    </section>
  );
};

export default Cart;