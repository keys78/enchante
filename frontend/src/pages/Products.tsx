import { useState } from 'react';
import { addToCart, decreaseCart } from "../reducers/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product, CartItem } from "../types";
import { filterByFreeShipment, filterProductsByBrand, filterProductsByCategory, filterProductsByColor, filterProductsByPrice, resetAllFilters } from "../reducers/products/productsSlice";

const Products = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const { products, filteredProducts } = useAppSelector((state: RootState) => state.products);

    const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPrice() });
    const [isFreeShipment, setIsFreeShipment] = useState<boolean>(false)


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
        setIsFreeShipment(false)
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            brand: "all",
            category: "all",
            color: "all",
        }));
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

                <div>
                    <h1>Filter By Category</h1>
                    <ul>
                        <li
                            className={selectedFilters.category === "all" ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
                            onClick={() => handleCategoryClick("all")}
                        >
                            All
                        </li>
                        {getUniqueFilterValues(products, 'category').map((category) => (
                            <li
                                key={category}
                                className={selectedFilters.category === category ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1>Filter By Color</h1>
                    <ul>
                        <li
                            className={selectedFilters.color === "all" ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
                            onClick={() => handleColorClick("all")}
                        >
                            All
                        </li>
                        {getUniqueFilterValues(products, 'color').map((color) => (

                            <li
                                key={color}
                                className={selectedFilters.color === color ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
                                onClick={() => handleColorClick(color)}
                            >
                                {color}
                            </li>
                        ))}
                    </ul>
                </div>


                <div>
                    <h1>Filter By Brand</h1>
                    <ul>
                        <li
                            className={selectedFilters.brand === "all" ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
                            onClick={() => handleBrandClick("all")}
                        >
                            All
                        </li>
                        {getUniqueFilterValues(products, 'brand').map((brand) => (

                            <li
                                key={brand}
                                className={selectedFilters.brand === brand ? "active-hero-text pl-2" : "pl-2 active-hero-text-before cursor-pointer py-2"}
                                onClick={() => handleBrandClick(brand)}
                            >
                                {brand}
                            </li>
                        ))}
                    </ul>
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
