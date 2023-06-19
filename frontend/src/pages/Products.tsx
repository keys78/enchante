import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product } from "../types";
import { sortByHighestPrice, sortByLowestPrice, sortByNameAZ, sortByNameZA } from "../reducers/products/productsSlice";
import { Link } from 'react-router-dom';
import { CaretRight, SquaresFour, ListDashes, MagnifyingGlass, Funnel, X } from '@phosphor-icons/react';
import ProductFrame from '../components/products/ProductFrame';
// import NewsLetter from '../components/home/NewsLetter';
// import RecentlyViewed from '../components/products/RecentlyViewed';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowSize from '../components/hooks/useWindowSize';
import AllFilters from '../components/filters/AllFilters';
import { modalVariants } from '../utils/animations';


const Products = () => {
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();
    const { filteredProducts, filterTerms } = useAppSelector((state: RootState) => state.products);
    const [showFiltersBar, setShowFiltersBar] = useState<boolean>(false)
    const [isFlexDisplay, setIsFlexDisplay] = useState<boolean>(false)
    const [currentSelection, setCurrentSelection] = useState("Select order....")


    const handleSelectionChange = (selectedValue) => {
        switch (selectedValue) {
            case 'Price (Lowest)':
                dispatch(sortByLowestPrice());
                break;
            case 'Price (Highest)':
                dispatch(sortByHighestPrice());
                break;
            case 'Name (A - Z)':
                dispatch(sortByNameAZ());
                break;
            case 'Name (Z - A)':
                dispatch(sortByNameZA());
                break;
            default:
                break;
        }
    };




    return (
        <section className="w-full mt-[12px] s-1024:px-[120px] s-767:px-[40px] px-[16px]">
            <div>
                <div className='s-480:pt-[30px] pt-[18px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span> <span className='font-medium'>Products</span>
                </div>

                <div className='flex items-start space-x-5'>

                    <AnimatePresence>
                        {width > 767 ? (
                            <AllFilters allFilterCompStyles={'min-w-[200px] max-w-[200px] w-full rounded-[5px] border p-1'} />
                        ) : (
                            showFiltersBar && (
                                <motion.div
                                    variants={modalVariants as any}
                                    initial="initial"
                                    animate="final"
                                    exit="exit"
                                    className="filterbar-wrapper w-[300px] bg-white text-textGray h-[100vh] fixed top-0 left-0 p-[20px]"
                                >
                                    <X size={26} onClick={() => setShowFiltersBar(!showFiltersBar)} className="absolute top-4 right-4" color="#070707" weight="regular" />
                                    <h1>Select Filters</h1>
                                    <AllFilters allFilterCompStyles={'mt-[80px] w-full rounded-[5px] border p-1'} />
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>



                    <div className='w-full'>
                        {width < 1024 &&
                            <form className='flex space-x-3 items-center justify-center w-full mx-auto mb-[10px]'>
                                <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                    <MagnifyingGlass size={20} color="#9e9e9e" />
                                    <input className='w-full rounded-[5px] py-2 border-0 outline-none' type="email" placeholder='Search products, brands and categories' />
                                </div>
                                <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                            </form>
                        }
                        <div className='flex items-center justify-between space-x-10 w-full mb-3'>
                            <div className='whitespace-nowrap flex items-center s-480:space-x-4 space-x-3'>
                                {width < 767 && <Funnel onClick={() => setShowFiltersBar(!showFiltersBar)} size={22} color="#141414" />}
                                <SquaresFour className='cursor-pointer' onClick={() => setIsFlexDisplay(false)} size={width < 767 ? 22 : 30} color={`${isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                <ListDashes className='cursor-pointer' onClick={() => setIsFlexDisplay(true)} size={width < 767 ? 22 : 30} color={`${!isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                <div><span className='font-medium s-480:text-[20px] text-[16px]'>{filteredProducts.length}</span> result{filteredProducts.length === 1 ? '' : 's'}</div>
                            </div>
                            {width > 1024 &&
                                <form className='flex space-x-3 items-center justify-center w-full mx-auto'>
                                    <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                        <MagnifyingGlass size={20} color="#9e9e9e" />
                                        <input className='w-full rounded-[5px] py-2 border-0 outline-none' type="email" placeholder='Search products, brands and categories' />
                                    </div>
                                    <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                                </form>
                            }

                            <div>
                                <select
                                    value={currentSelection}
                                    onChange={(e) => {
                                        setCurrentSelection(e.target.value);
                                        handleSelectionChange(e.target.value);
                                    }}
                                    className="border-2 border-black rounded p-2 text-sm cursor-pointer"
                                >
                                    <option disabled value="Select Order">Select Order...</option>
                                    <option value="Price (Lowest)">Price (Lowest)</option>
                                    <option value="Price (Highest)">Price (Highest)</option>
                                    <option value="Name (A - Z)">Name (A - Z)</option>
                                    <option value="Name (Z - A)">Name (Z - A)</option>
                                </select>

                            </div>

                        </div>

                        <div className='flex items-center space-x-2 text-xs mb-[12px]'>
                            {Object.keys(filterTerms).length > 0 && <h3 className="text-gray-400">Applied Filters:</h3>}
                            {Object.entries(filterTerms).map(([key, value], index) => (
                                <div
                                    className='opacity-60 px-2 py-1 border rounded-[20px] lowercase'
                                    key={key}
                                    style={{ backgroundColor: `rgba(300, 300, 300, ${0.8 - (index + 1) * 0.1})` }}
                                >
                                    {key === 'category' && value !== null && <span className="text-gray-500">{value}</span>}
                                    {key === 'color' && value !== null && <span className="text-gray-500">{value}</span>}
                                    {key === 'brand' && value !== null && <span className="text-gray-500">{value}</span>}
                                    {key === 'price' && value !== null && <span className="text-gray-500">{`prices below: $${Number(value) + 1}`}</span>}
                                    {key === 'starNumberOfRatings' && value !== null && (<span className="text-gray-500"> {`${value === "1" ? '1 star' : `${value} stars`}`} </span>)}
                                    {key === 'freeShipping' && value === "true" && <span className="text-gray-500"> free shipping</span>}
                                    {key === 'newProduct' && value === "true" && <span className="text-gray-500"> new product</span>}
                                </div>
                            ))}
                        </div>


                        {filteredProducts.length > 0 ? (
                            <>
                                <div className={`${!isFlexDisplay && 'grid s-1024:grid-cols-3 grid-cols-2 s-480:gap-x-[16px] gap-x-[8px] s-480:gap-y-[34px] gap-y-[16px]'} `}>
                                    {filteredProducts.map((product: Product, i: number) =>
                                        <div className='relative w-full s-480:bg-white bg-gray-50 p-1 rounded-[5px]'>
                                            <AnimatePresence>
                                                <ProductFrame
                                                    product={product}
                                                    showControls={true}
                                                    key={i}
                                                    isFlexDisplay={isFlexDisplay}
                                                    price_font_size='s-480:text-[18px] text-[16px] font-bold'
                                                    discount_font_size={'text-[12px]'}
                                                    shop_button={'p-[4px]'}
                                                    icon_size={18}
                                                />
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>
                                <p className='pt-[30px]'>Add Pagination from backend here</p>
                            </>
                        ) : (
                            <p className='flex items-center justify-center h-[300px]'>No products available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* <RecentlyViewed /> */}
            {/* <NewsLetter newsletter_extras={'pt-[120px]'} /> */}


        </section>
    );
};

export default Products;
