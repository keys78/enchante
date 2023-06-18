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
import { characterLimit } from '../../utils/general';
import useWindowSize from '../hooks/useWindowSize';


interface Props {
    product: Product,
    key?: any,
    isFlexDisplay?: boolean
    price_font_size: string,
    discount_font_size?: string,
    shop_button?: string,
    icon_size: number,
    showControls?: boolean
}

const ProductFrame = ({ product, key, isFlexDisplay, price_font_size, discount_font_size, shop_button, icon_size, showControls }: Props) => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const { width } = useWindowSize();
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

        <motion.div
            key={product?.id}
            layout
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.2, delay: key * 0.3 }}
            exit={{ opacity: 0 }}
        >
            {isFlexDisplay ? (
                //flex View Display
                <div className='flex mb-[16px] bg-gray-50 p-3 rounded-[5px] '>
                    <Link to={`/products/product-details/${product.id}`}>
                        <div className='relative max-w-[400px] min-w-[400px]'>
                            <img className='rounded-[5px]' src={product?.image} alt={'enchanté_fashon'} />
                            {product?.new && <div className='absolute top-4 left-4 bg-orangeSkin text-white rounded-[5px] py-[1px] px-2'>new</div>}
                            {product?.free_shipping && <img title='Free Shipping' className='absolute top-4 right-4 rounded-[30px] py-1 px-3 w-[74px]' src={free_shipping} alt="" />}
                        </div>
                    </Link>

                    <div className='w-full relative p-[16px]'>
                        <div className="details flex item-center justify-between">
                            <div className='max-w-[400px]'>
                                <h3 className='font-medium capitalize'>{product?.name}</h3>
                                <h3 className=''>{characterLimit(product?.desc, 150)}...</h3>
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
                    //Grid View Display
                    <div>
                        <Link onClick={() => addToRecentlyViewedAction(product)} to={`/products/product-details/${product.id}`}>
                            <div className='relative'>
                                <img className='rounded-[5px]' src={product?.image} alt={'enchanté_fashon'} />
                                {product?.new && <div className='absolute s-480:top-4 top-1 s-480:left-4 left-1 bg-orangeSkin text-white rounded-[5px] s-480:py-[1px] s-480:px-2 px-1 s-480:text-[16px] text-[12px]'>new</div>}
                                {product?.free_shipping && width > 480 && <img title='Free Shipping' className='absolute top-4 right-4 rounded-[30px] py-1 px-3 s-767:w-[74px] w-[54px]' src={free_shipping} alt="" />}
                            </div>
                        </Link>

                        <div className='flex justify-between s-480:pt-[14px] pt-[5px]'>
                            <div className="details s-480:mb-0 mb-[50px]">
                                <h3 className='font-medium capitalize s-480:text-[16px] text-[14px] max-w-[250px]'>{width > 480 ? characterLimit(product?.name, 50) : characterLimit(product?.name, 30)}</h3>
                                <div className='flex items-start space-x-3'>
                                    <span className={`font-medium montserrat ${price_font_size}`}>${product?.price}</span>
                                    {product?.discount && <span className={`font-medium montserrat opacity-80 discount-strike ${discount_font_size}`}>${(product?.price * 0.3) + product?.price}</span>}
                                </div>
                                {product?.free_shipping && width < 480 && <img title='Free Shipping' className='w-[44px]' src={free_shipping} alt="" />}

                            </div>
                            {showControls && (
                                // <div className='absolute bottom-2 left-0 w-full'>
                                <div className='cartbtn-fix'>
                                    {existingCartItem ? (
                                        <>
                                            {width > 480 ? (
                                                <span className='flex items-center space-x-4'>
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
                                                </span>
                                            ) : (
                                                <span className='flex items-center justify-between'>
                                                    <QuantityControlsBtn
                                                        onClick={() => { decreaseQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                                        children={<Minus size={17} color="#f8f8f8" weight="bold" />}
                                                        className={`rounded-[5px] hover:opacity-70 p-2 bg-black text-white ${shop_button}`}
                                                    />

                                                    <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                                    <QuantityControlsBtn
                                                        onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                                        children={<Plus size={17} color="#f8f8f8" weight="bold" />}
                                                        className={`rounded-[5px] hover:opacity-70 p-2 bg-black text-white ${shop_button}`}
                                                    />

                                                </span>
                                            )}
                                        </>

                                    ) : (
                                        <>
                                            {width > 480 ? (
                                                <button className={`rounded-[5px] hover:opacity-70 transition duration-300 p-3 bg-black text-white ${shop_button}`} onClick={() => addToCart(product)}>
                                                    <ShoppingCartSimple size={icon_size} color="#f8f8f8" weight="regular" />
                                                </button>
                                            ) : (
                                                <button className={`whitespace-nowrap flex items-center justify-center space-x-3 rounded-[5px] hover:opacity-70 transition duration-300 py-2 px-3 text-[13px] bg-black text-white w-[96%] mx-auto`} onClick={() => addToCart(product)}>
                                                    <span>ADD TO CART</span> <ShoppingCartSimple size={15} color="#f8f8f8" weight="regular" />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                )
            }
        </motion.div>
    )
}

export default ProductFrame;