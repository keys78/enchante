import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product } from "../types";
import { filterByFreeShipment, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, filterProductsByPrice, resetAllFilters } from "../reducers/products/productsSlice";
import ToggleFilters from '../components/filters/ToggleFilters';
import StartRatings from '../components/filters/StartRatings';
import { Link } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import ProductFrame from '../components/products/ProductFrame';
import RangeSlider from '../components/filters/RangeSliders';


const Products = () => {
    const dispatch = useAppDispatch();
    const { products, filteredProducts } = useAppSelector((state: RootState) => state.products);
    const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPrice() });
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isFreeShipment, setIsFreeShipment] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState({
        category: "all",
        color: "all",
        brand: "all",
        star_ratings: ''
    });



    function getMaxPrice(): number {
        let maxPrice = 0;
        products.forEach((product: Product) => {
            if (product.price > maxPrice) { maxPrice = product.price; }
        });
        return maxPrice;
    }

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxPrice = parseInt(e.target.value);
        setPriceRange((prevRange) => ({ ...prevRange, max: maxPrice }));
        dispatch(filterProductsByPrice({ priceRange: { min: 0, max: maxPrice } }));
    };


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


    const handleFreeShipmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        setIsFreeShipment(checked);
        dispatch(filterByFreeShipment({ freeShipping: checked }));
    };

    const handleResetFilters = () => {
        dispatch(resetAllFilters());
        setPriceRange({ min: 0, max: getMaxPrice() });
        setIsFreeShipment(false);
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

                        <div className='flex items-center justify-between rounded-[5px] px-3 py-2 bg-gray-50 font-medium cursor-pointer'>
                            <h1>Free Shipping</h1>
                            <input checked={isFreeShipment} onChange={handleFreeShipmentChange} type="checkbox" />
                        </div>

                        <button
                            className='rounded-[5px] px-3 py-2 bg-gray-900 font-medium cursor-pointer border-2border-white text-white w-full mt-6 hover:bg-white hover:text-black transition duration-300 hover:border-2 hover:border-black'
                            onClick={handleResetFilters}>Reset Filters</button>

                    </div>

                    <div>
                        <div className=''>
                            Products no{filteredProducts.length}
                        </div>
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2">
                                    {filteredProducts.map((product: Product, i: number) =>
                                        <ProductFrame product={product} key={i} />
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
