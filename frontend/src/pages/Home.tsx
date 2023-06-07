import { useNavigate } from "react-router";
import { products } from "../utils/data";
import { useAppDispatch } from "../network/hooks";
import { addToCart } from "../reducers/cart/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../network/store";
import { Product, CartItem } from "../types";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === product.id);
    if (existingCartItem) {
      // Product already in cart, do not add again
      return;
    } else {
      // Add the product to the cart
      dispatch(addToCart(product));
    }
    navigate("/cart");
  };

  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="home-container">
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
                    <button className="rounded p-4 bg-gray-500 text-white" disabled>
                      Already In Cart
                    </button>
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
  );
};

export default Home;
