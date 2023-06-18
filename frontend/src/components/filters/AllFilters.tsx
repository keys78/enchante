import React from 'react'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { RootState } from "../../network/store";
import { Product } from "../../types";
import { filterByFreeShipment, filterByNewProducts, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, resetAllFilters } from "../../reducers/products/productsSlice";
import ToggleFilters from './ToggleFilters'
import RangeSlider from '../filters/RangeSliders'
import StartRatings from './StartRatings'

interface Props {
    allFilterCompStyles?: string,
}

const AllFilters = ({ allFilterCompStyles }: Props) => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state: RootState) => state.products);
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
        <div className={`${allFilterCompStyles}`}>
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
    )
}

export default AllFilters