import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product, CartItem } from "../types";
import { filterByFreeShipment, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, filterProductsByPrice, resetAllFilters } from "../reducers/products/productsSlice";
import ToggleFilters from '../components/Filters/ToggleFilters';
import StartRatings from '../components/Filters/StartRatings';
import { useAddQuantity, useAddToCart, useDecreaseCart } from '../components/hooks/CartCTABtn';


const Products = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    const { products, filteredProducts } = useAppSelector((state: RootState) => state.products);
    const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPrice() });
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isFreeShipment, setIsFreeShipment] = useState<boolean>(false)
    const addToCart = useAddToCart();
    const addQuantity = useAddQuantity();
    const decreaseCart = useDecreaseCart();
    const [selectedFilters, setSelectedFilters] = useState({
        category: "all",
        color: "all",
        brand: "all",
        star_ratings: ''
    });



    function getMaxPrice(): number {
        let maxPrice = 0;
        products.forEach((product: Product) => {
            if (product.price > maxPrice) {  maxPrice = product.price;  }
        });
        return maxPrice;
    }

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxPrice = parseInt(e.target.value);
        setPriceRange((prevRange) => ({ ...prevRange, max: maxPrice }));
        dispatch(filterProductsByPrice({ priceRange: { min: 0, max: maxPrice } }));
    };


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
        setSelectedRating(null);
    };


    const getUniqueFilterValues = (products: Product[], item: keyof Product): string[] => {
        const arr = products.map((val: Product) => val[item]);
        const uniqueValues = [...new Set(arr)] as string[];
        return uniqueValues;
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
                <StartRatings selectedRating={selectedRating} setSelectedRating={setSelectedRating} />


                <div>
                    Free Shipping <input checked={isFreeShipment} onChange={handleFreeShipmentChange} type="checkbox" />
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
                                                onClick={() => decreaseCart(existingCartItem)}
                                            >
                                                -
                                            </button>
                                            <span>{existingCartItem.cartQuantity}</span>
                                            <button
                                                className="rounded p-2 bg-green-500 text-white"
                                                onClick={() => addQuantity(existingCartItem)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="rounded p-4 bg-red-500 text-white"
                                            onClick={() => addToCart(product)}
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
