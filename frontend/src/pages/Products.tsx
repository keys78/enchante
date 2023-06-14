import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product } from "../types";
import { filterByFreeShipment, filterByNewProducts, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, resetAllFilters, sortByHighestPrice, sortByLowestPrice, sortByNameAZ, sortByNameZA } from "../reducers/products/productsSlice";
import ToggleFilters from '../components/filters/ToggleFilters';
import StartRatings from '../components/filters/StartRatings';
import { Link } from 'react-router-dom';
import { CaretRight, SquaresFour, ListDashes, MagnifyingGlass } from '@phosphor-icons/react';
import ProductFrame from '../components/products/ProductFrame';
import RangeSlider from '../components/filters/RangeSliders';


const Products = () => {
    const dispatch = useAppDispatch();
    const { products, filteredProducts, filterTerms } = useAppSelector((state: RootState) => state.products);
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

    const [currentSelection, setCurrentSelection] = useState("Select order....")


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

    const values = Object.values(filterTerms);



    return (
        <section className="app-container mt-[12px] px-[120px]">
            <div>
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
                        <div className='flex items-center justify-between space-x-10 -mt-8'>
                            <div className='w-[350px] flex items-center space-x-4'>
                                <SquaresFour className='cursor-pointer' onClick={() => setIsFlexDisplay(false)} size={30} color={`${isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                <ListDashes className='cursor-pointer' onClick={() => setIsFlexDisplay(true)} size={30} color={`${!isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
                                <div><span className='font-medium text-[20px]'>{filteredProducts.length}</span> Items</div>
                            </div>
                            <form className='flex space-x-3 items-center justify-center w-full mx-auto my-[25px]'>
                                <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
                                    <MagnifyingGlass size={20} color="#9e9e9e" />
                                    <input className='w-full rounded-[5px] py-2 border-0 outline-none' type="email" placeholder='Search products, brands and categories' />
                                </div>
                                <button className='px-4 bg-[#202122] text-white rounded-[5px] py-2'>Search</button>
                            </form>

                            <div className="min-w-[150px]">
                                <select
                                    value={currentSelection}
                                    onChange={(e) => {
                                        setCurrentSelection(e.target.value);
                                        handleSelectionChange(e.target.value);
                                    }}
                                    className="border-2 border-black rounded p-2 text-sm w-40 cursor-pointer"
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
                                    {key === 'price' && value !== null && <span className="text-gray-500">{`prices below: ${Number(value) + 1}`}</span>}
                                    {key === 'starNumberOfRatings' && value !== null && (<span className="text-gray-500"> {`${value === "1" ? '1 star' : `${value} stars`}`} </span>)}
                                    {key === 'freeShipping' && value === "true" && <span className="text-gray-500"> free shipping</span>}
                                    {key === 'newProduct' && value === "true" && <span className="text-gray-500"> new product</span>}
                                </div>
                            ))}
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
                            <p className='flex items-center justify-center h-[300px]'>No products available.</p>
                        )}
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Products;
