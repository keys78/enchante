import { products } from '../utils/data'
import { addToCart, decreaseCart } from "../reducers/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../network/hooks";
import { RootState } from "../network/store";
import { Product, CartItem } from "../types";


const Products = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();


    const handleAddToCart = (product: Product) => {
        const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === product.id);
        if (existingCartItem) {
            // Product already in cart, do not add again
            return;
        } else {
            // Add the product to the cart
            const cartItem: CartItem = {
                ...product,
                cartQuantity: 1, // Set the cart quantity to a valid number
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

    return (
        <div className="home-container mt-[1200px]">
            {products.length > 0 ? (
                <>
                    <h2>New Arrivals</h2>
                    <div className="flex items-center justify-between">
                        {products.map((product: Product) => {
                            const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === product.id);
                            return (
                                <div key={product.id} className="product">
                                    <h3>{product.name}</h3>
                                    <img className="w-[300px]" src={product.image} alt={product.name} />
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
            ) : products.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <p>Unexpected error occurred...</p>
            )}
        </div>
    )
}

export default Products