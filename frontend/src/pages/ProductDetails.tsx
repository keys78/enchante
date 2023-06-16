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
import { products } from "../utils/data";
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


    const projects = [
        {
            p_tag: '01',
            title: 'Buckley Law',
            stacks: ['Javascript, JQuery, html', 'css3',],
            description: 'Buckley Law is the personal service portfolio of Attorney Buckley, designed to showcase his expertise and facilitate communication with potential clients interested in seeking his legal counsel.',
            category: ['portfolio', 'judiciary',],
            type: 'javascript',
            preview_url: "https://buckleylawoffices.com/",
            code_url: ""
        },
        {
            p_tag: '02',
            title: 'Plaidlife',
            stacks: ['Javascript, JQuery, html', 'css3',],
            description: 'Plaidlife is an e-commerce platform that connects artists of plaid designs to lovers of the pattern, offering a unique and diverse selection of products that cater to their tastes and preferences.',
            category: ['e-commerce',],
            type: 'vue',
            preview_url: "https://plaidlife.com/",
            code_url: ""
        },
    ]

    const tabTitle = [
        { type: 'description' },
        { type: 'discussion & comments' }
    ]


    const getCurrentIndex = (tab: any) => { setActiveTab(tab); };
    const tabList = Array.from(new Set(tabTitle.map(project => project.type)));
    const [activeTab, setActiveTab] = useState(tabList[0]);


    const filteredProjects = () => {
        switch (activeTab) {
            case "all":
                return projects && projects;
            default:
                return projects?.filter((project) => project?.type === activeTab);
        }
    };

    const projectsToRender = filteredProjects(); // Call the function to get the array




    return (
        <section className="app-container mt-[12px] px-[120px]">
            <div className="pb-[200px]">
                <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/products'}>Products</Link> <CaretRight size={14} /> </span>
                    <span className='font-medium'>{productInfo?.name}</span>
                </div>

                <div className="flex w-full space-x-5">
                    <div className="max-w-[60%]" >
                        <img className="w-full" src={productInfo?.image} alt={productInfo?.name} />
                    </div>
                    <div className="product-info w-full">
                        <div className="flex items-center justify-between">
                            <h1 className="text-[26px]">{productInfo?.name}</h1>
                            <div className="cursor-pointer" onClick={() => seLoved(!loved)}>
                                {loved ?
                                    <Heart size={22} color="#f9a83f" weight="regular" /> :
                                    <Heart size={22} color="#f9a83f" weight="fill" />
                                }
                            </div>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div className='flex mt-2'>
                                {Array.from({ length: (Number(productInfo?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={18} color="#f9a83f" weight="fill" />
                                ))}
                                {Array.from({ length: 5 - (Number(productInfo?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={18} color="#f9a83f" weight="thin" />
                                ))}
                            </div>
                            <div>
                                ({productInfo?.star_ratings <= 4 ? (productInfo?.star_ratings + (Math.random() * 0.9)).toFixed(1) : productInfo?.star_ratings}/5)
                            </div>
                        </div>
                        <div className="text-[24px] font-medium montserrat py-4">${productInfo?.price}</div>
                        <div className="py-6 border-t border-b border-gray-100 w-full flex items-center justify-between">
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
                                    <div style={{ background: `${productInfo?.color}` }} className="h-[20px] w-[20px] rounded-[100%]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="my-3 py-4 w-full">
                            <div className="pb-3"><span className="font-medium">{Math.max(1, Math.floor(Math.random() * 10)).toFixed(0)}</span> left in stock!</div>
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
                                        <span>Add To Cart</span> <ShoppingCartSimple size={20} color="#f8f8f8" weight="regular" />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Tabs tabList={tabList} activeTab={activeTab} setActiveTab={setActiveTab} currentTab={(tab: any) => getCurrentIndex(tab)} />

            <Pager value={tabList.indexOf(activeTab)}>
                {tabList.map((tab, i) => (
                    <div key={i}>
                        {products.map((project, i) => (
                            <div
                                key={i}>
                                {project?.desc}


                            </div>
                        ))}
                    </div>
                ))}
            </Pager>

            <RecentlyViewed />
        </section>
    );
};

export default ProductDetails;
