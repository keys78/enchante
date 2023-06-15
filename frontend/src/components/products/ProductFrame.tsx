import { useAddQuantity, useAddToCart, useDecreaseQuantity } from '../hooks/useCartControls';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import 'swiper/css';
import 'swiper/css/navigation';
import { CartItem, Product } from '../../types';
import { Minus, Plus, ShoppingCartSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import QuantityControlsBtn from './QuantityControlsBtn';
import { motion } from 'framer-motion';
import { useState } from 'react';
import free_shipping from '../../assets/png/free_shipping.jpg'
import { addToRecentlyViewed } from '../../reducers/products/productsSlice';


interface Props {
    product: Product,
    isFlexDisplay?: boolean
    price_font_size: string,
    discount_font_size?: string,
    shop_button?: string,
    icon_size: number
}

const ProductFrame = ({ product, isFlexDisplay, price_font_size, discount_font_size, shop_button, icon_size }: Props) => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const addToCart = useAddToCart();
    const addQuantity = useAddQuantity();
    const decreaseQuantity = useDecreaseQuantity();
    const [animationKey, setAnimationKey] = useState<number>(0);
    const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === product.id);
    const dispatch = useAppDispatch();
    const { recentlyViewed } = useAppSelector(state => state.products)


    const addToRecentlyViewedAction = (product: Product) => {
        const existingRecentlyViewedItem = recentlyViewed.find((item) => item.id === product.id);
        
        if (!existingRecentlyViewedItem) {
          const recentlyViewedItem: Product = {
            ...product,
            cartQuantity: 1,
          };
          dispatch(addToRecentlyViewed(recentlyViewedItem));
        }
      };


    return (

        <div key={product.id} >
            {isFlexDisplay ? (
                <div className='flex mb-[16px] bg-gray-50 p-3 rounded-[5px] '>
                    <Link to={`/products/product-details/${product.id}`}>
                        <div className='relative max-w-[400px] min-w-[400px]'>
                            <img className='rounded-[5px]' src={product?.image} alt={'enchanté_fashon'} />
                            {product?.new && <div className='absolute top-4 left-4 bg-orangeSkin text-white rounded-[5px] py-1 px-3'>new</div>}
                            {product?.free_shipping && <img title='Free Shipping' className='absolute top-4 right-4 rounded-[30px] py-1 px-3 w-[74px]' src={free_shipping} alt="" />}
                        </div>
                    </Link>

                    <div className='w-full relative p-[16px]'>
                        <div className="details flex item-center justify-between">
                            <div className='max-w-[300px]'>
                                <h3 className='font-medium capitalize'>{product?.name}</h3>
                                <h3 className=''>{product?.desc}...</h3>
                            </div>
                            <div className='flex items-start space-x-3'>
                                <span className="text-[24px] font-medium montserrat">${product?.price}</span>
                                {product?.discount && <span className='text-[16px] font-medium montserrat opacity-60 discount-strike'>${(product?.price * 0.3) + product?.price}</span>}
                            </div>
                        </div>
                        <Link to={`/products/product/${product.id}`}> <div className='absolute bottom-4 left-4 underline'>more details...</div></Link>
                        <div className='absolute bottom-4 right-4'>
                            {existingCartItem ? (
                                <div className='flex items-center space-x-4'>
                                    <QuantityControlsBtn
                                        onClick={() => { decreaseQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                        children={<Minus size={22} color="#f8f8f8" weight="bold" />}
                                        className='rounded-[5px] hover:opacity-70 p-2 bg-black text-white'
                                    />

                                    <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                    <QuantityControlsBtn
                                        onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                        children={<Plus size={22} color="#f8f8f8" weight="bold" />}
                                        className='rounded-[5px] hover:opacity-70 p-2 bg-black text-white'
                                    />
                                </div>
                            ) : (
                                <button className="rounded-[5px] hover:opacity-70 transition duration-300 p-3 bg-black text-white" onClick={() => addToCart(product)}>
                                    <ShoppingCartSimple size={22} color="#f8f8f8" weight="regular" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )
                :
                (
                    <>
                        <Link onClick={() => addToRecentlyViewedAction(product)} to={`/products/product-details/${product.id}`}>
                            <div className='relative'>
                                <img className='rounded-[5px]' src={product?.image} alt={'enchanté_fashon'} />
                                {product?.new && <div className='absolute top-4 left-4 bg-orangeSkin text-white rounded-[5px] py-1 px-3'>new</div>}
                                {product?.free_shipping && <img title='Free Shipping' className='absolute top-4 right-4 rounded-[30px] py-1 px-3 w-[74px]' src={free_shipping} alt="" />}
                            </div>
                        </Link>

                        <div className='flex justify-between pt-[14px]'>
                            <div className="details">
                                <h3 className='font-medium capitalize'>{product?.name}</h3>
                                <div className='flex items-start space-x-3'>
                                    <span className={`font-medium montserrat ${price_font_size}`}>${product?.price}</span>
                                    {product?.discount && <span className={`text-[16px] font-medium montserrat opacity-60 discount-strike ${discount_font_size}`}>${(product?.price * 0.3) + product?.price}</span>}
                                </div>
                            </div>
                            <div>
                                {existingCartItem ? (
                                    <div className='flex items-center space-x-4'>
                                        <QuantityControlsBtn
                                            onClick={() => { decreaseQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                            children={<Minus size={icon_size} color="#f8f8f8" weight="bold" />}
                                            className={`rounded-[5px] hover:opacity-70 p-2 bg-black text-white ${shop_button}`}
                                        />

                                        <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                        <QuantityControlsBtn
                                            onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                            children={<Plus size={icon_size} color="#f8f8f8" weight="bold" />}
                                            className={`rounded-[5px] hover:opacity-70 p-2 bg-black text-white ${shop_button}`}
                                        />
                                    </div>
                                ) : (
                                    <button className={`rounded-[5px] hover:opacity-70 transition duration-300 p-3 bg-black text-white ${shop_button}`} onClick={() => addToCart(product)}>
                                        <ShoppingCartSimple size={icon_size} color="#f8f8f8" weight="regular" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default ProductFrame;