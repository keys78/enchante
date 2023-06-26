import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product } from "../types";
import { getAllProducts } from "../reducers/products/productsSlice";
import { Link, useNavigate } from 'react-router-dom';
import { CaretRight, SquaresFour, ListDashes, MagnifyingGlass, Funnel } from '@phosphor-icons/react';
import ProductFrame from '../components/products/ProductFrame';
import NewsLetter from '../components/home/NewsLetter';
import RecentlyViewed from '../components/products/RecentlyViewed';
import { AnimatePresence } from 'framer-motion';
import useWindowSize from '../components/hooks/useWindowSize';
import AllFilters from '../components/filters/AllFilters';
import Loader from '../components/UI/Loader';
import SortComponent from '../components/sort/SortComponent';
import FiltersDisplayPanel from '../components/UI/FiltersDisplayPanel';
import MobileProductsFilters from '../components/filters/MobileProductsFilters';
import Pagination from '../components/pagination/Pagination';


const Products = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const [isFlexDisplay, setIsFlexDisplay] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchInput, setSearchInput] = useState<string>("");
    const [showFiltersBar, setShowFiltersBar] = useState<boolean>(false)
    const { filteredProducts, totalPages, isLoading, isError, isSuccess, message } = useAppSelector((state: RootState) => state.products);
   

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const queryParams = new URLSearchParams({ q: searchInput });
        navigate(`/catalog/?${queryParams.toString()}`);
    };


    useEffect(() => {
        dispatch(getAllProducts(currentPage))
    }, [dispatch, currentPage])




    return (
        <section className={`app-container w-full mt-[12px] s-1025:px-[80px] s-767:px-[40px] px-[16px] `}>
            <div className='w-full'>
                <div className='s-480:pt-[30px] pt-[18px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span> <span className='font-medium'>All Products</span>
                </div>

                {isLoading && <div className='flex items-center justify-center my-[200px]'><Loader /></div>}
                {isError && <div className='flex items-center justify-center my-[200px] text-red-400'>An error has occured: {message}</div>}
                {
                    isSuccess && !isError && !isLoading &&
                    <div className='flex items-start space-x-5'>
                        {width > 767 && (<AllFilters allFilterCompStyles={'min-w-[200px] max-w-[200px] w-full rounded-[5px] border p-1'} />)}

                        <div className='w-full'>
                            {width < 1024 &&
                                <form onSubmit={handleSearchSubmit} className='flex space-x-3 items-center justify-center w-full mx-auto mb-[10px]'>
                                    <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                        <MagnifyingGlass size={20} color="#9e9e9e" />
                                        <input
                                            value={searchInput}
                                            onChange={handleSearchInputChange}
                                            className='w-full rounded-[5px] py-2 border-0 outline-none' type="search" placeholder='Search products, brands and categories' />
                                    </div>
                                    <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                                </form>
                            }
                            <div className='flex items-center justify-between s-480:space-x-10 space-x-3 w-full s-480:mb-3 mb-5'>
                                <div className='whitespace-nowrap flex items-center s-480:space-x-4 space-x-3'>
                                    {width < 767 && <Funnel onClick={() => setShowFiltersBar(!showFiltersBar)} size={22} color="#141414" />}
                                    <SquaresFour className='cursor-pointer' onClick={() => setIsFlexDisplay(false)} size={width < 767 ? 22 : 30} color={`${isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                    <ListDashes className='cursor-pointer' onClick={() => setIsFlexDisplay(true)} size={width < 767 ? 22 : 30} color={`${!isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                    <div><span className='font-medium s-480:text-[20px] text-[16px]'>{filteredProducts.length}
                                    {/* <sup>{totalResults}</sup> */}
                                    </span> result{filteredProducts.length === 1 ? '' : 's' }</div>
                                </div>
                                {width > 1024 &&
                                    <form onSubmit={handleSearchSubmit} className='flex space-x-3 items-center justify-center w-full mx-auto'>
                                        <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                            <MagnifyingGlass size={20} color="#9e9e9e" />
                                            <input
                                                value={searchInput}
                                                onChange={handleSearchInputChange}
                                                className='w-full rounded-[5px] py-2 border-0 outline-none' type="search" placeholder='Search products, brands and categories' />
                                        </div>
                                        <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                                    </form>
                                }

                                <SortComponent />

                            </div>

                            <FiltersDisplayPanel />

                            {filteredProducts.length > 0 ? (
                                <>
                                    <div className={`${!isFlexDisplay && 'grid s-1024:grid-cols-3 grid-cols-2 s-480:gap-x-[16px] gap-x-[8px] s-480:gap-y-[34px] gap-y-[16px]'} `}>
                                        {filteredProducts.map((product: Product, i: number) =>
                                            <div className={`relative w-full p-1 rounded-[5px] ${!isFlexDisplay && 's-480:bg-white bg-gray-50'}`}>
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
                                    <div className='pt-[100px]'>
                                        <Pagination
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalPages={totalPages}
                                        />
                                    </div>
                                </>
                            ) : (
                                <p className='flex items-center justify-center h-[300px]'>No products available.</p>
                            )}
                        </div>
                    </div>
                }

                <MobileProductsFilters showFiltersBar={showFiltersBar} setShowFiltersBar={setShowFiltersBar} />

            </div>

            <RecentlyViewed />
            <NewsLetter newsletter_extras={'s-480:pb-20 pb-10 s-767:pt-[144px] pt-[50px]'} />


        </section>
    );
};

export default Products;
