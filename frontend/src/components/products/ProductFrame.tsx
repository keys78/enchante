import { useAddQuantity, useAddToCart, useDecreaseQuantity } from '../hooks/useCartControls';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import 'swiper/css';
import 'swiper/css/navigation';
import { CartItem, Product } from '../../types';
import { CaretRight, Minus, Plus, ShoppingCartSimple } from '@phosphor-icons/react';
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
    details_adjust?: string,
    showControls?: boolean,
    showSavedToggle?: boolean,
}

const ProductFrame = ({ product, key, isFlexDisplay, price_font_size, discount_font_size, shop_button, icon_size, details_adjust, showControls }: Props) => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const { width } = useWindowSize();
    const addToCart = useAddToCart();
    const addQuantity = useAddQuantity();
    const decreaseQuantity = useDecreaseQuantity();
    const [animationKey, setAnimationKey] = useState<number>(0);
    const existingCartItem = cart.cartItems.find((item: CartItem) => item._id === product._id);
    const dispatch = useAppDispatch();
    const { recentlyViewed } = useAppSelector(state => state.products)


    const addToRecentlyViewedAction = (product: Product) => {
        const existingRecentlyViewedItem = recentlyViewed.find((item) => item._id === product._id);

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
            key={product?._id}
            layout
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.2, delay: key * 0.3 }}
            exit={{ opacity: 0 }}
        >
            {isFlexDisplay ? (
                //flex View Display
                <div className='flex mb-[16px] border s-767:p-3 rounded-[5px] '>
                    <Link to={`/products/product-details/${product._id}`}>
                        <div className='relative s-767:max-w-[400px] max-w-[300px] w-full s-767:p-0 p-[5px]'>
                            {/* <img className='rounded-[5px]' src={sample} alt={'enchanté_fashon'} /> */}
                            <img className='rounded-[5px]' src={product?.image} alt={'enchanté_fashon'} />
                            {product?.new_product && <div className='absolute s-767:top-4 top-2 s-767:left-4 left-2 bg-orangeSkin text-white rounded-[5px] s-767:py-[1px] s-767:px-2 px-1 s-767:text-[16px] text-[12px]'>new</div>}
                            {product?.free_shipping && width > 767 && <img title='Free Shipping' className='absolute top-4 right-4 rounded-[30px] py-1 px-3 w-[74px]' src={free_shipping} alt="" />}
                        </div>
                    </Link>

                    <div className='w-full relative s-767:p-[16px] p-[0] s-767:py-0 py-1'>
                        <div className="details s-767:flex block item-center justify-between s-767:px-0 px-2">
                            <div className='max-w-[400px]'>
                                <h3 className='font-medium capitalize s-767:pb-2 pb-1 s-767:text-[16px] text-[12px]'>{width > 767 ? characterLimit(product?.name, 50) : characterLimit(product?.name, 20)}</h3>
                                <h3 className='s-767:text-[16px] text-[12px] s-767:pb-0 pb-2'>{width > 767 ? characterLimit(product?.desc, 70) : characterLimit(product?.desc, 70)}...</h3>
                            </div>
                            <div className='flex items-start space-x-3'>
                                <span className="s-1024:text-[24px] s-767:text-[16px] text-[13px] font-medium montserrat">${product?.price}</span>
                                {product?.discount && <span className='s-1024:text-[16px] s-767:text-[12px] text-[10px] font-medium montserrat opacity-60 discount-strike'>${(product?.price * 0.3) + product?.price}</span>}
                            </div>
                        </div>

                        <Link to={`/products/product/${product._id}`}>
                            <div className='s-767:pl-0 pl-2 s-767:pb-0 pb-2 s-767:text-[16px] text-[12px] s-767:absolute s-767:bottom-4 s-767:left-4 underline flex space-x-3 items-center text-orangeSkin'> more details {<CaretRight />}</div>
                        </Link>

                        {/* {showSavedToggle && <div onClick={toggleSavedItems} className='text-orangeSkin underline cursor-pointer s-767:text-[16px] text-[12px] s-767:pl-0 pl-2 py-2'> Remove </div>} */}



                        {showControls && <div className='s-767:absolute s-767:bottom-4 s-767:right-4'>
                            {existingCartItem ? (
                                <div className='s-767:pl-0 pl-2 flex items-center space-x-4'>
                                    <QuantityControlsBtn
                                        onClick={() => { decreaseQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                        children={<Minus size={width > 767 ? 22 : 14} color="#f8f8f8" weight="bold" />}
                                        className='rounded-[5px] s-767:hover:opacity-70 s-767:p-2 p-1 bg-black text-white'
                                    />

                                    <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                    <QuantityControlsBtn
                                        onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                        children={<Plus size={width > 767 ? 22 : 14} color="#f8f8f8" weight="bold" />}
                                        className='rounded-[5px] s-767:hover:opacity-70 s-767:p-2 p-1 bg-black text-white'
                                    />
                                </div>
                            ) : (
                                <>
                                    {width > 767 ? (
                                        <button className="rounded-[5px] hover:opacity-70 transition duration-300 p-3 bg-black text-white" onClick={() => addToCart(product)}>
                                            <ShoppingCartSimple size={22} color="#f8f8f8" weight="regular" />
                                        </button>
                                    ) : (
                                        <button className={`whitespace-nowrap flex items-center justify-center space-x-3 rounded-[5px] s-767:hover:opacity-70 transition duration-300 py-1 px-2 text-[12px] bg-black text-white w-[96%] mx-auto`} onClick={() => addToCart(product)}>
                                            <span>ADD TO CART</span> <ShoppingCartSimple size={14} color="#f8f8f8" weight="regular" />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        }
                    </div>
                </div>
            )
                :
                (
                    //Grid View Display
                    <div>
                        <Link onClick={() => addToRecentlyViewedAction(product)} to={`/products/product-details/${product._id}`}>
                            <div className='relative'>
                                {/* <div style={{ backgroundImage: `url(${product.image})` }} className='relative product-image'> */}
                                <img className='rounded-[5px] product-image border border-gray-200' src={product?.image} alt={'enchanté_fashon'} />
                                {product?.new_product && <div className='absolute s-480:top-4 top-1 s-480:left-4 left-1 bg-orangeSkin text-white rounded-[5px] s-480:py-[1px] s-480:px-2 px-1 s-480:text-[16px] text-[12px]'>new</div>}
                                {product?.free_shipping && width > 480 && <img title='Free Shipping' className='absolute top-4 right-4 rounded-[30px] py-1 px-3 s-767:w-[74px] w-[54px]' src={free_shipping} alt="" />}
                            </div>
                        </Link>

                        <div className='flex justify-between s-480:pt-[14px] pt-[5px]'>
                            <div className={`details s-480:mb-0 ${details_adjust}`}>
                                <h3 className='font-medium capitalize s-480:text-[16px] text-[14px] s-767:max-w-[100%] max-w-[250px]'>{width > 480 ? characterLimit(product?.name, 50) : characterLimit(product?.name, 30)}</h3>
                                <div className='flex items-start space-x-3'>
                                    <span className={`font-medium montserrat ${price_font_size}`}>${product?.price}</span>
                                    {product?.discount && <span className={`font-medium montserrat opacity-80 discount-strike ${discount_font_size}`}>${(product?.price * 0.3) + product?.price}</span>}
                                </div>
                                {product?.free_shipping && width < 480 && <img title='Free Shipping' className='w-[44px]' src={free_shipping} alt="" />}
                                {/* {showSavedToggle && <div onClick={toggleSavedItems} className='text-orangeSkin underline cursor-pointer s-767:text-[16px] text-[12px]'> Remove </div>} */}
                            </div>
                            {showControls && (
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
                                                        className={`rounded-[5px] s-767:hover:opacity-70 p-2 bg-black text-white ${shop_button}`}
                                                    />

                                                    <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                                    <QuantityControlsBtn
                                                        onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                                        children={<Plus size={17} color="#f8f8f8" weight="bold" />}
                                                        className={`rounded-[5px] s-767:hover:opacity-70 p-2 bg-black text-white ${shop_button}`}
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
                                                <button className={`whitespace-nowrap flex items-center justify-center space-x-3 rounded-[5px] s-767:hover:opacity-70 transition duration-300 py-2 px-3 text-[13px] bg-black text-white w-[96%] mx-auto`} onClick={() => addToCart(product)}>
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

// eslint-disable-next-line react-refresh/only-export-components
export default ProductFrame
// export default React.memo(ProductFrame);