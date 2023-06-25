import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import { addToCart, decreaseCart } from '../../reducers/cart/cartSlice';
import { Product, CartItem } from '../../types';

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: RootState) => state.cart);


  return (product: Product) => {
    const existingCartItem = cart.cartItems.find((item: CartItem) => item._id === product._id);
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
};

export const useAddQuantity = () => {
  const dispatch = useAppDispatch();

  return (product: CartItem) => {
    dispatch(addToCart(product));
  };
};

export const useDecreaseQuantity = () => {
  const dispatch = useAppDispatch();

  return (product: CartItem) => {
    dispatch(decreaseCart(product));
  };
};
