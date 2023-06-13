import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product } from "../types";
import { filterByFreeShipment, filterByNewProducts, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, resetAllFilters } from "../reducers/products/productsSlice";
import ToggleFilters from '../components/filters/ToggleFilters';
import StartRatings from '../components/filters/StartRatings';
import { Link } from 'react-router-dom';
import { CaretRight, SquaresFour, ListDashes, MagnifyingGlass } from '@phosphor-icons/react';
import ProductFrame from '../components/products/ProductFrame';
import RangeSlider from '../components/filters/RangeSliders';
import FilterSearch from '../components/UI/FilterSearch';


const Products = () => {
    const dispatch = useAppDispatch();
    const { products, filteredProducts } = useAppSelector((state: RootState) => state.products);
    const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPrice() });
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isFreeShipment, setIsFreeShipment] = useState<boolean>(false)
    const [isNewProduct, setIsNewProduct] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState({
        category: "all",
        color: "all",
        brand: "all",
        star_ratings: ''
    });

    const [isFlexDisplay, setIsFlexDisplay] = useState<boolean>(false)


    function getMaxPrice(): number {
        let maxPrice = 0;
        products.forEach((product: Product) => {
            if (product.price > maxPrice) { maxPrice = product.price; }
        });
        return maxPrice;
    }


    const handleFilterClick = (filterType: 'category' | 'color' | 'brand', filterValue: string) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: filterValue,
        }));

        switch (filterType) {
            case 'category':
                dispatch(filterProductsByCategory({ category: filterValue }));
                break;
            case 'color':
                dispatch(filterProductsByColor({ color: filterValue }));
                break;
            case 'brand':
                dispatch(filterProductsByBrand({ brand: filterValue }));
                break;
            default:
                break;
        }
    };


    const handleFilterByNewProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setIsNewProduct(checked);
        dispatch(filterByNewProducts({ newProduct: checked }));
    };


    const handleFreeShipmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setIsFreeShipment(checked);
        dispatch(filterByFreeShipment({ freeShipping: checked }));
    };

    const handleResetFilters = () => {
        dispatch(resetAllFilters());
        setPriceRange({ min: 0, max: getMaxPrice() });
        setIsFreeShipment(false);
        setIsNewProduct(false)
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            brand: "all",
            category: "all",
            color: "all",
        }));
        setSelectedRating(null);
    };


    const getUniqueFilterValues = (products: Product[], item: keyof Product): string[] => {
        const arr = products.map((val: Product) => val[item]);
        const uniqueValues = [...new Set(arr)] as string[];
        return uniqueValues;
    };




    return (
        <section className="app-container mt-[12px]">
            <div className='bg-black h-[100px] w-full mt-[30px]'>

            </div>

            <div className='px-[120px]'>
                <div className='pt-[30px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/'}>Home</Link> <CaretRight size={14} /> </span> <span className='font-medium'>Products</span>
                </div>

                <div className='flex items-start space-x-5'>

                    <div className="min-w-[200px] max-w-[200px] w-full rounded-[5px] border p-1">
                        <ToggleFilters
                            title="Category"
                            selectedFilter={selectedFilters.category}
                            options={getUniqueFilterValues(products, 'category')}
                            handleFilterClick={(filterValue) => handleFilterClick('category', filterValue)}
                        />

                        <ToggleFilters
                            title="Color"
                            selectedFilter={selectedFilters.color}
                            options={getUniqueFilterValues(products, 'color')}
                            handleFilterClick={(filterValue) => handleFilterClick('color', filterValue)}
                        />

                        <ToggleFilters
                            title="Brand"
                            selectedFilter={selectedFilters.brand}
                            options={getUniqueFilterValues(products, 'brand')}
                            handleFilterClick={(filterValue) => handleFilterClick('brand', filterValue)}
                        />

                        <StartRatings selectedRating={selectedRating} setSelectedRating={setSelectedRating} />

                        <RangeSlider
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                        />

                        <div className='flex items-center justify-between rounded-[5px] px-3 py-2 mb-2 bg-gray-50 font-medium'>
                            <h1>New Arrivals</h1>
                            <input checked={isNewProduct} onChange={handleFilterByNewProducts} type="checkbox" className='cursor-pointer' />
                        </div>

                        <div className='flex items-center justify-between rounded-[5px] px-3 py-2 bg-gray-50 font-medium'>
                            <h1>Free Shipping</h1>
                            <input checked={isFreeShipment} onChange={handleFreeShipmentChange} type="checkbox" className='cursor-pointer' />
                        </div>

                        <button
                            className='rounded-[5px] px-3 py-2 bg-gray-900 font-medium cursor-pointer border-2border-white text-white w-full mt-6 hover:bg-white hover:text-black transition duration-300 hover:border-2 hover:border-black'
                            onClick={handleResetFilters}>
                            Reset Filters
                        </button>

                    </div>

                    <div>
                        <div className='flex items-center justify-between space-x-3'>
                            <div className='w-[300px] flex space-x-4 border-2 border-black'>
                                <SquaresFour className='cursor-pointer' onClick={() => setIsFlexDisplay(false)} size={26} color="#141414" weight="fill" />
                                <ListDashes className='cursor-pointer' onClick={() => setIsFlexDisplay(true)} size={26} color="#141414" weight="fill" />
                                <div>{filteredProducts.length} Products</div>
                            </div>
                            <form className='flex space-x-3 items-center justify-center w-full mx-auto my-[25px]'>
                                <div className='flex space-x-2 border items-center rounded-[5px] px-2 bg-[fafafa]'>
                                    <MagnifyingGlass size={32} color="#141414" />
                                    <input className='w-full rounded-[5px] py-2 border-0 outline-none bg-[fafafa]' type="email" placeholder='Search products, brands and categories' />
                                </div>
                                <button className='subscribe-buttonpy-2 px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                            </form>

                            <div>
                                Sort By: <input type="text" />
                            </div>

                        </div>
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-3">
                                    {filteredProducts.map((product: Product, i: number) =>
                                        <div className='border-2 relative border-black'>
                                            <ProductFrame product={product} key={i} isFlexDisplay={isFlexDisplay} />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>No products available.</p>
                        )}
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Products;
