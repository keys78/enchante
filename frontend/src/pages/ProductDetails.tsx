import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../network/hooks";
import { CaretRight, Heart, Minus, Plus, ShoppingCartSimple, Star } from "@phosphor-icons/react";
import ThumbnailsGallery from "../components/products/ThumbnailsGallery";
import RecentlyViewed from "../components/products/RecentlyViewed";
import { RootState } from "../network/store";
import { useAddQuantity, useAddToCart, useDecreaseQuantity } from "../components/hooks/useCartControls";
import { CartItem } from "../types";
import QuantityControlsBtn from "../components/products/QuantityControlsBtn";
import { motion } from "framer-motion";
import { useState } from "react";
import Tabs from "../components/UI/Tabs";
import { Pager } from "../components/UI/Pager";

const ProductDetails = () => {
    const { id } = useParams();
    const { filteredProducts } = useAppSelector(state => state.products)
    const productInfo: any = filteredProducts.find(val => val.id === id)

    const cart = useAppSelector((state: RootState) => state.cart);
    const addToCart = useAddToCart();
    const addQuantity = useAddQuantity();
    const decreaseQuantity = useDecreaseQuantity();
    const [animationKey, setAnimationKey] = useState<number>(0);
    const [loved, seLoved] = useState<boolean>(false);
    const [activeSize, setActiveSize] = useState<number>(0);
    const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === id);
    const [activeTab, setActiveTab] = useState("Product Description");


    const getCurrentIndex = (tab) => {
        setActiveTab(tab);
    };

    const filteredProjects = () => {
        switch (activeTab) {
            case productInfo?.desc:
                return productInfo?.desc;
            case "Comments & Discussions":
                return 'No Comments / Discussions yet';
            default:
                return productInfo?.desc;
        }
    };


    const productDescription = filteredProjects();
    const tabsList = ["Product Description", "Comments & Discussions"];





    return (
        <section className="app-container mt-[12px] px-[120px]">
            <div className="">
                <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/products'}>Products</Link> <CaretRight size={14} /> </span>
                    <span className='font-bold'>{productInfo?.name}</span>
                </div>

                <div className="flex w-full space-x-5 pb-[50px]">
                    <div className="max-w-[50%] min-w-[50%]" >
                        <ThumbnailsGallery imgArr={productInfo} />
                    </div>
                    <div className="w-full pl-[30px]">
                        <div className="flex items-start justify-between">
                            <h1 className="text-[24px]">{productInfo?.name} <span className="italic text-[12px]">{productInfo?.brand}</span></h1>
                            <div className="cursor-pointer" onClick={() => seLoved(!loved)}>
                                {loved ?
                                    <Heart size={22} color="#f75a2c" weight="regular" /> :
                                    <Heart size={22} color="#f75a2c" weight="fill" />
                                }
                            </div>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div className='flex mt-2'>
                                {Array.from({ length: (Number(productInfo?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={18} color="#f75a2c" weight="fill" />
                                ))}
                                {Array.from({ length: 5 - (Number(productInfo?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={18} color="#f75a2c" weight="thin" />
                                ))}
                            </div>
                            <div>
                                ({productInfo?.star_ratings <= 4 ? (productInfo?.star_ratings + (Math.random() * 0.9)).toFixed(1) : productInfo?.star_ratings}/5)
                            </div>
                        </div>
                        <div className='flex items-start space-x-3 py-4'>
                              <span className="text-[24px] font-medium montserrat">${productInfo?.price}</span>
                              {productInfo?.discount && <span className='text-[16px] font-medium montserrat opacity-60 discount-strike'>${(productInfo?.price * 0.3) + productInfo?.price}</span>}
                            </div>
                        <div className="py-6 my-6 border-t border-b border-gray-100 w-full flex items-center justify-between">
                            <div>
                                <h1 className="font-medium pb-4">Available Sizes</h1>
                                <div className="flex space-x-5 items-center">
                                    {productInfo?.sizes.map((val, i) =>
                                        <div onClick={() => setActiveSize(i)} className={`border border-black text-center flex items-center justify-center cursor-pointer rounded-[5px] h-[32px] w-[32px] ${i === activeSize ? "bg-black text-white" : ''}`}>{val}</div>
                                    )}

                                </div>
                            </div>

                            <div className="flex space-x-5 items-center">
                                <div>
                                    <h1 className="font-medium pb-4">Available Colors</h1>
                                    <div style={{ border: `2px solid ${productInfo?.color}` }} className="h-[26px] w-[26px] rounded-[100%] flex items-center justify-center">
                                        <div style={{ background: `${productInfo?.color}` }} className="h-[20px] w-[20px] rounded-[100%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-3 py-4 w-full">
                            <div className="flex items-center justify-between pb-[20px]">
                                <div className="pb-3"><span className="font-medium">{Math.max(1, Math.floor(Math.random() * 10)).toFixed(0)}</span> left in stock!</div>
                                {productInfo?.free_shipping && <button className="bg-black text-white px-3 py-[3px] text-[10px] rounded-[5px] cursor-none">free shipping available</button>}
                            </div>
                            <div>
                                {existingCartItem ? (
                                    <div className='flex items-center space-x-4'>
                                        <QuantityControlsBtn
                                            onClick={() => { decreaseQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                            children={<Minus size={24} color="#f8f8f8" weight="bold" />}
                                            className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[6px]`}
                                        />

                                        <motion.span key={animationKey} animate={{ scale: [1.3, 1] }} className='font-bold'>{existingCartItem.cartQuantity}</motion.span>

                                        <QuantityControlsBtn
                                            onClick={() => { addQuantity(existingCartItem); setAnimationKey((prevKey) => prevKey + 1) }}
                                            children={<Plus size={24} color="#f8f8f8" weight="bold" />}
                                            className={`rounded-[5px] hover:opacity-70 bg-black text-white p-[6px]`}
                                        />
                                    </div>
                                ) : (
                                    <button className={`flex items-center justify-center space-x-3 rounded-[5px] hover:opacity-70 transition duration-300 py-3 px-4 bg-black text-white w-full`} onClick={() => addToCart(productInfo)}>
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
                    <div key={index}>
                        {tab === "Product Description" ? productDescription : 'No Comments / Discussions yet'}
                    </div>
                ))}
            </Pager>
            <RecentlyViewed />
        </section>
    );
};

export default ProductDetails;
