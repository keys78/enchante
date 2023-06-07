import { useNavigate } from "react-router";
import { products } from "../utils/data";
import { useAppDispatch } from "../network/hooks";
import { addToCart, decreaseCart } from "../reducers/cart/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../network/store";
import { Product, CartItem } from "../types";

const Home = () => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === product.id);
    if (existingCartItem) {
      return;
    } else {
      // we add product to the cart
      const cartItem: CartItem = {
        ...product,
        cartQuantity: 1,
      };
      dispatch(addToCart(cartItem));
    }
  };

  // if product alreay exists in cart and we want to add
  // without navigating to cart page
  const handleAddQuantity = (product: Product) => {
    dispatch(addToCart(product));
  };


  const handleDecreaseCart = (product: Product) => {
    dispatch(decreaseCart(product));
  };

  const cart = useSelector((state: RootState) => state.cart);
  console.log('cart', cart)

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
                    cart?.cartItems?.map((cartItem: Product) => (
                      <div className="cart-item" key={cartItem.id}>
                        <div className="flex">
                          <button className="rounded bg-red-400 py-1 px-3" onClick={() => handleDecreaseCart(cartItem)}>
                            -
                          </button>
                          <div className="count">{cartItem.cartQuantity}</div>
                          <button className="rounded bg-red-400 py-1 px-3" onClick={() => handleAddQuantity(product)}>+</button>
                        </div>
                      </div>
                    ))

                  ) : (
                    <button
                      className="rounded py-2 px-4 bg-red-500 text-white"
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