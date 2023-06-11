import { useState } from 'react';
import { addToCart, decreaseCart } from "../reducers/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product, CartItem } from "../types";
import { filterByFreeShipment, filterByStarNumberOfRatings, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, filterProductsByPrice, resetAllFilters } from "../reducers/products/productsSlice";
import ToggleFilters from '../components/Filters/ToggleFilters';
import { Star } from '@phosphor-icons/react';

const Products = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const { products, filteredProducts } = useAppSelector((state: RootState) => state.products);

    const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPrice() });
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isFreeShipment, setIsFreeShipment] = useState<boolean>(false)
    const starRatings = [
        { value: 5, filledStars: 5, emptyStars: 0 },
        { value: 4, filledStars: 4, emptyStars: 1 },
        { value: 3, filledStars: 3, emptyStars: 2 },
        { value: 2, filledStars: 2, emptyStars: 3 },
        { value: 1, filledStars: 1, emptyStars: 4 },
      ];


    const dispatch = useAppDispatch();

    const handleAddToCart = (product: Product) => {
        const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === product.id);
        if (existingCartItem) {
            return;
        } else {
            const cartItem: CartItem = {
                ...product,
                cartQuantity: 1,
            };
            dispatch(addToCart(cartItem));
        }
    };

    const handleAddQuantity = (product: CartItem) => {
        dispatch(addToCart(product));
    };

    const handleDecreaseCart = (product: CartItem) => {
        dispatch(decreaseCart(product));
    };

    function getMaxPrice(): number {
        let maxPrice = 0;
        products.forEach((product: Product) => {
            if (product.price > maxPrice) {
                maxPrice = product.price;
            }
        });
        return maxPrice;
    }


    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxPrice = parseInt(e.target.value);
        setPriceRange((prevRange) => ({ ...prevRange, max: maxPrice }));
        dispatch(filterProductsByPrice({ priceRange: { min: 0, max: maxPrice } }));
    };


    const [selectedFilters, setSelectedFilters] = useState({
        category: "all",
        color: "all",
        brand: "all",
        star_ratings: ''
    });

    const handleCategoryClick = (category: Product["category"]) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            category
        }));
        dispatch(filterProductsByCategory({ category }));
    };

    const handleColorClick = (color: Product["color"]) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            color
        }));
        dispatch(filterProductsByColor({ color }));
    };

    const handleBrandClick = (brand: Product["brand"]) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            brand
        }));
        dispatch(filterProductsByBrand({ brand }));
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
        setSelectedRating(null); // Reset selected star rating
    };



    const getUniqueFilterValues = (products: Product[], item: keyof Product): string[] => {
        const arr = products.map((val: Product) => val[item]);
        const uniqueValues = [...new Set(arr)] as string[];
        return uniqueValues;
    };





    const handleRatingChange = (rating: number) => {
        setSelectedRating(rating);
        dispatch(filterByStarNumberOfRatings({ starNumberOfRatings: rating }));
    };



    return (
        <div className="home-container mt-[12px]">
            <div className="py-12 flex space-x-7">
                <div>
                    <input
                        type="range"
                        min="0"
                        max={getMaxPrice().toString()}
                        value={priceRange.max.toString()}
                        onChange={handlePriceRangeChange}
                    />
                    <span>${priceRange.max}</span>
                </div>

                <ToggleFilters
                    title="Filter By Category"
                    selectedFilter={selectedFilters.category}
                    options={getUniqueFilterValues(products, 'category')}
                    handleFilterClick={handleCategoryClick}
                />

                <ToggleFilters
                    title="Filter By Color"
                    selectedFilter={selectedFilters.color}
                    options={getUniqueFilterValues(products, 'color')}
                    handleFilterClick={handleColorClick}
                />
                <ToggleFilters
                    title="Filter By Brand"
                    selectedFilter={selectedFilters.brand}
                    options={getUniqueFilterValues(products, 'brand')}
                    handleFilterClick={handleBrandClick}
                />


                <div>
                    <h2>Filter by Star Ratings</h2>
                    {starRatings.map((rating) => (
                        <div className='flex space-x-3' key={rating.value}>
                            <input
                                type="radio"
                                id={`rating${rating.value}`}
                                name="starRating"
                                value={rating.value}
                                checked={selectedRating === rating.value}
                                onChange={() => handleRatingChange(rating.value)}
                            />
                            <label htmlFor={`rating${rating.value}`}>
                                <div className='flex'>
                                    {Array(rating.filledStars).fill(
                                        <Star size={20} color="#f75a2c" weight="fill" />
                                    )}
                                    {Array(rating.emptyStars).fill(
                                        <Star size={20} color="#d4d4d4" weight="fill" />
                                    )}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>

                <div>
                    Free Shipping<input checked={isFreeShipment} onChange={handleFreeShipmentChange} type="checkbox" />
                </div>

                <div>
                    <button onClick={handleResetFilters}>Reset Filters</button>
                </div>

            </div>

            <div className='w-full border-2 border-black'>
                {filteredProducts.length}
            </div>



            {filteredProducts.length > 0 ? (
                <>
                    <div className="flex items-center justify-between">
                        {filteredProducts.map((product: Product) => {
                            const existingCartItem = cart.cartItems.find(
                                (item: CartItem) => item.id === product.id
                            );
                            return (
                                <div key={product.id} className="product">
                                    <h3>{product.name}</h3>
                                    <img
                                        className="w-[300px]" src={product.image} alt={product.name}
                                    />
                                    <div className="details">
                                        <span>{product.desc}</span>
                                        <span className="price">${product.price}</span>
                                    </div>
                                    {existingCartItem ? (
                                        <div className="cart-actions">
                                            <button
                                                className="rounded p-2 bg-red-500 text-white"
                                                onClick={() => handleDecreaseCart(existingCartItem)}
                                            >
                                                -
                                            </button>
                                            <span>{existingCartItem.cartQuantity}</span>
                                            <button
                                                className="rounded p-2 bg-green-500 text-white"
                                                onClick={() => handleAddQuantity(existingCartItem)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="rounded p-4 bg-red-500 text-white"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add To Cart
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
};

export default Products;
