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


    const getCurrentIndex = (tab: any) => { setActiveTab(tab); };
    const tabList = Array.from(new Set(projects.map(project => project.type)));
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
                    <div >
                        <img className="w-full" src={productInfo?.image} alt={productInfo?.name} />
                    </div>
                    <div className="product-info">
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
                            <div className='flex'>
                                {Array.from({ length: (Number(productInfo?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={20} color="#f9a83f" weight="fill" />
                                ))}
                                {Array.from({ length: 5 - (Number(productInfo?.star_ratings)) }, (_, i) => (
                                    <Star key={i} size={20} color="#f9a83f" weight="thin" />
                                ))}
                            </div>
                            <div>
                                ({productInfo?.star_ratings <= 4 ? (productInfo?.star_ratings + (Math.random() * 0.9)).toFixed(1) : productInfo?.star_ratings}/5)
                            </div>
                        </div>
                        <div className="text-[24px] font-medium montserrat">${productInfo?.price}</div>
                        <p className="py-4">{productInfo?.desc}</p>
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
                                <button className={`flex items-center rounded-[5px] hover:opacity-70 transition duration-300 py-2 px-4 bg-black text-white`} onClick={() => addToCart(productInfo)}>
                                    Add To Cart &nbsp;&nbsp;<ShoppingCartSimple size={20} color="#f8f8f8" weight="regular" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Tabs tabList={tabList} activeTab={activeTab} setActiveTab={setActiveTab} currentTab={(tab: any) => getCurrentIndex(tab)} />

            <Pager value={tabList.indexOf(activeTab)}>
                {tabList.map((tab, i) => (
                    <div key={i}>
                        {projectsToRender.map((project, i) => (
                            <div
                                className={` s-991:flex block ${i % 2 == 0 && 's-991:space-x-20'} s-991:mb-40 mb-16 ${i % 2 != 0 && 'flex-row-reverse s-991:space-x-0'}`}
                                key={i}>


                                <div className={`s-991:max-w-[500px] text-[16px] relative`}>
                                    <h1 className="pt-4 pb-2 font-[RoosStRegisDisplay-Regular] opacity-50 text-[20px]">{project.p_tag}</h1>
                                    <h1 className="s-400:text-[30px] text-[24px] font-[RoosStRegisDisplay-Regular]">{project.title}</h1>
                                    <h1 className="pt-4 pb-2b opacity-75 mb-4 s-480:text-[18px] text-[16px]">{project.description}</h1>
                                    <div className="flex space-x-2 capitalize opacity-75 mt-2">
                                        Tools: &nbsp;
                                        {project.stacks.map((val: any) => (
                                            <span key={val}>
                                                {val}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-2 opacity-75 mt-2">
                                        <span>Category:</span>
                                        {project.category.map((val) => (
                                            <span className="bg-gradient-to-br from-[#180249] via-[#21153b] px-2 rounded" lang="ESP" key={val}>
                                                #{val}
                                            </span>
                                        ))}
                                    </div>


                                    <div className="s-991:relative absolute s-991:top-0 top-10 right-0 flex space-x-4 mt-5">
                                        {project.code_url !== "" &&
                                            <button className="bg-[#1d1d1d] px-2 py-1 rounded">
                                                <a target={'_blank'} rel="noopener noreferrer" href={project.code_url}>
                                                    Source code
                                                </a>
                                            </button>
                                        }
                                        <button className="bg-[#1d1d1d] px-2 py-1 rounded">
                                            <a target={'_blank'} rel="noopener noreferrer" href={project.preview_url}>
                                                Demo
                                            </a>
                                        </button>
                                    </div>
                                </div>
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
