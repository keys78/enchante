import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { CaretRight, Heart, Minus, Plus, ShoppingCartSimple, Star } from "@phosphor-icons/react";
import ThumbnailsGallery from "../components/products/ThumbnailsGallery";
import RecentlyViewed from "../components/products/RecentlyViewed";
import { RootState } from "../network/store";
import { useAddQuantity, useAddToCart, useDecreaseQuantity } from "../components/hooks/useCartControls";
import { CartItem } from "../types";
import QuantityControlsBtn from "../components/products/QuantityControlsBtn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Tabs from "../components/UI/Tabs";
import { Pager } from "../components/UI/Pager";
import { characterLimit } from "../utils/general";
import useWindowSize from "../components/hooks/useWindowSize";
import NewsLetter from "../components/home/NewsLetter";
import { getSingleProduct, toggleSavedProducts } from "../reducers/products/productsSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const source = location.state?.source;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { product } = useAppSelector(state => state.products)
    const cart = useAppSelector((state: RootState) => state.cart);
    const addToCart = useAddToCart();
    const addQuantity = useAddQuantity();
    const decreaseQuantity = useDecreaseQuantity();
    const [animationKey, setAnimationKey] = useState<number>(0);
    const [activeSize, setActiveSize] = useState<number>(0);
    const existingCartItem = cart.cartItems.find((item: CartItem) => item._id === id);
    const [activeTab, setActiveTab] = useState("Product Description");
    const { user } = useAppSelector(state => state.user)
    const isSaved = user?.savedItems.find(val => val._id === product?._id)

    useEffect(() => {
        dispatch(getSingleProduct({ productId: id as string }))
    }, [dispatch, id])



    const toggleSavedButton = () => {
        dispatch(toggleSavedProducts({ productId: product?._id }))
        setTimeout(() => {
            dispatch(getSingleProduct({ productId: id as string }))
        }, 2000)
    }


    const getCurrentIndex = (tab) => {
        setActiveTab(tab);
    };

    const filteredProjects = () => {
        switch (activeTab) {
            case product?.desc:
                return product?.desc;
            case "Comments & Discussions":
                return 'No Comments / Discussions yet';
            default:
                return product?.desc;
        }
    };


    const productDescription = filteredProjects();
    const tabsList = ["Product Description", "Comments & Discussions"];





    return (
        <section className="app-container mt-[12px] s-1025:px-[80px] s-767:px-[40px] px-[16px]">
            <div>
                <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><div onClick={() => navigate(-1)}>{source ?? 'Products'}</div> <CaretRight size={14} /> </span>
                    <span className='font-bold capitalize'>{characterLimit(product?.name, 16)}</span>
                </div>

                <div className="s-767:flex w-full s-767:space-x-5 s-767:pb-[50px]">
                    <div className="s-767:max-w-[50%] s-767:min-w-[50%] s-767:pb-0 pb-[30px]" >
                        <ThumbnailsGallery imgArr={product} />
                    </div>
                    <div className="w-full s-767:pl-[30px]">
                        <div className="flex items-start justify-between">
                            <h1 className="s-767:text-[24px] text-[16px] capitalize">{product?.name} <span className="italic text-[12px]">{product?.brand}</span></h1>
                            <motion.div
                                whileTap={{ scale: 1.05 }}
                                whileHover={{ scale: 0.85 }}
                                className="cursor-pointer" onClick={toggleSavedButton}>
                                {!isSaved ?
                                    <Heart size={22} color="#f75a2c" weight="regular" /> :
                                    <Heart size={22} color="#f75a2c" weight="fill" />
                                }
                            </motion.div>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div className='flex mt-2'>
                                {Array.from({ length: (Number(product?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={18} color="#f75a2c" weight="fill" />
                                ))}
                                {Array.from({ length: 5 - (Number(product?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={18} color="#f75a2c" weight="thin" />
                                ))}
                            </div>
                            <div>
                                ({product?.star_ratings <= 4 ? (product?.star_ratings + (Math.random() * 0.9)).toFixed(1) : product?.star_ratings}/5)
                            </div>
                        </div>
                        <div className='flex items-start space-x-3 py-4'>
                            <span className="s-767:text-[24px] text-[16px] font-medium montserrat">${product?.price}</span>
                            {product?.discount && <span className='s-767:text-[16px] text-[13px] font-medium montserrat opacity-60 discount-strike'>${(product?.price * 0.3) + product?.price}</span>}
                        </div>
                        <div className="py-6 s-767:my-6 border-t border-b border-gray-100 w-full flex items-center justify-between s-767:text-[16px] text-[14px]">
                            <div>
                                <h1 className="font-medium pb-4">Available Sizes</h1>
                                <div className="flex space-x-5 items-center">
                                    {product?.sizes.map((val, i) =>
                                        <div onClick={() => setActiveSize(i)} className={`border border-black text-center flex items-center justify-center cursor-pointer rounded-[5px] h-[32px] w-[32px] ${i === activeSize ? "bg-black text-white" : ''}`}>{val}</div>
                                    )}

                                </div>
                            </div>

                            <div className="flex space-x-5 items-center">
                                <div>
                                    <h1 className="font-medium pb-4">Available Colors</h1>
                                    <div style={{ border: `2px solid ${product?.color}` }} className="h-[26px] w-[26px] rounded-[100%] flex items-center justify-center">
                                        <div style={{ background: `${product?.color}` }} className="h-[20px] w-[20px] rounded-[100%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-3 s-767:py-4 py-2 w-full s-767:text-[16px] text-[14px]">
                            <div className="flex items-center justify-between s-767:pb-[20px] pb-[6px]">
                                <div className="s-767:pb-3 pb-0"><span className="font-medium">{Math.max(1, Math.floor(Math.random() * 10)).toFixed(0)}</span> left in stock!</div>
                                {product?.free_shipping && <button className="bg-black text-white px-3 py-[3px] text-[10px] rounded-[5px] cursor-none">free shipping available</button>}
                            </div>
                            <div>
                                {existingCartItem ? (
                                    <div className='flex items-center space-x-4'>
                                        <QuantityControlsBtn
                                            onClick={() => { decreaseQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                            children={<Minus size={width > 767 ? 24 : 20} color="#f8f8f8" weight="bold" />}
                                            className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[6px]`}
                                        />

                                        <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                        <QuantityControlsBtn
                                            onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                            children={<Plus size={width > 767 ? 24 : 20} color="#f8f8f8" weight="bold" />}
                                            className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[6px]`}
                                        />
                                    </div>
                                ) : (
                                    <button className={`flex items-center justify-center space-x-3 rounded-[5px] hover:opacity-70 transition duration-300 py-3 px-4 bg-black text-white w-full`} onClick={() => addToCart(product)}>
                                        <span>ADD TO CART</span> <ShoppingCartSimple size={20} color="#f8f8f8" weight="regular" />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Tabs tabList={tabsList} activeTab={activeTab} setActiveTab={setActiveTab} currentTab={getCurrentIndex} />

            <Pager value={tabsList.indexOf(activeTab)}>
                {tabsList.map((tab, index) => (
                    <div className="s-767:text-[16px] text-[14px]" key={index}>
                        {tab === "Product Description" ? productDescription : 'No Comments / Discussions yet'}
                    </div>
                ))}
            </Pager>
            <div className="s-767:pb-[150px] pb-[50px]">
                <RecentlyViewed />
                <NewsLetter newsletter_extras={'pb-0 s-767:pt-[144px] pt-0'} />
            </div>
        </section>
    );
};

export default ProductDetails;
