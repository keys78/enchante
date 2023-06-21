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


const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state: RootState) => state.cart)
  const { cartTotalQuantity } = useAppSelector((state) => state.cart);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const addQuantity = useAddQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  //   const auth = useSelector((state) => state.auth);
  const auth = false
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
    <section className="app-container px-[120px]">
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
        <div className="w-full pb-[200px]">
          <div className="continue-shopping flex items-center space-x-3">
          </div>
          <div className="flex space-x-5 items-start">
            <div className="max-w-[70%] w-full">
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
                                <span className="text-[20px] font-medium montserrat">${cartItem?.price}</span>
                                {cartItem?.discount && <span className='text-[12px] font-medium montserrat opacity-60 discount-strike'>${(cartItem?.price * 0.3) + cartItem?.price}</span>}
                              </div>
                              <div className="flex items-center space-x-5">
                                <QuantityControlsBtn
                                  onClick={() => { decreaseQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                  children={<Minus size={20} color="#f8f8f8" weight="bold" />}
                                  disabled={cartItem.cartQuantity <= 1}
                                  className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[3px] ${cartItem.cartQuantity <= 1 && 'opacity-60 cursor-not-allowed'}`}

                                />

                                <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{cartItem.cartQuantity}</motion.span>

                                <QuantityControlsBtn
                                  onClick={() => { addQuantity(cartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                  children={<Plus size={20} color="#f8f8f8" weight="bold" />}
                                  className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[3px]`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

            </div>
            <div className="border border-gray-300 rounded-[5px] w-[300px]">
              <div className="border-b border-gray-300 p-[10px]">
                Cart Summary
              </div>
              <div className="p-[10px] ">
                <div className="flex items-center justify-between">
                  <span className="font-medium opacity-60">Subtotal</span>
                  <motion.span className="montserrat font-medium text-[18px]">{rounded}</motion.span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-300 mb-[10px]">
                  <span className="font-medium opacity-60">Discount</span>
                  <span className="montserrat font-medium text-[18px]">${0}</span>
                </div>
                {auth ? (
                  <CheckoutButton cartItems={cart.cartItems} />
                ) : (
                  <button
                    className="p-2 bg-black text-white rounded-[5px] w-full"
                    onClick={() => navigate("/login")}
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