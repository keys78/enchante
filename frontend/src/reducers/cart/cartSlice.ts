import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";


interface CartItem {
  id: string;
  name: string,
  image: string,
  desc: string,
  price: number
  cartQuantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

const storedCartItems = localStorage.getItem("enchante-cart");

const initialState: CartState = {
  cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.cartQuantity += 1;
        toast.info("product quantity updated", { position: "bottom-right", autoClose: 500, });
      } else {
        const newCartItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems = [...state.cartItems, newCartItem];
        toast.success(`${newCartItem.name} added to cart`, { position: "bottom-right", autoClose: 500, });
      }

      localStorage.setItem("enchante-cart", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action: PayloadAction<CartItem>) {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
          toast.info("product quantity updated", { position: "bottom-right", autoClose: 500, });
        } else {
          state.cartItems.splice(itemIndex, 1);
          toast.error("Product removed from cart", { position: "bottom-right", autoClose: 500, });
        }
      }

      localStorage.setItem("enchante-cart", JSON.stringify(state.cartItems));
    },

    decreaseCartQuantity(state, action: PayloadAction<CartItem>) {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
          toast.info("product quantity updated", { position: "bottom-right", autoClose: 500, });
        }
      }

      localStorage.setItem("enchante-cart", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action: PayloadAction<CartItem>) {
      const { id } = action.payload;
      const selectedCartItem = state.cartItems.find((item) => item.id === id);

      if (selectedCartItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        toast.error(`${selectedCartItem.name} removed from cart`, {
          position: "bottom-right",
          delay: 1000,
        });
      }

      localStorage.setItem("enchante-cart", JSON.stringify(state.cartItems));
    },



    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));

      localStorage.setItem("enchante-cart", JSON.stringify(state.cartItems));
    },


    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("enchante-cart", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-right", autoClose: 500, });
    },
  },
});

export const { addToCart, decreaseCart, decreaseCartQuantity, removeFromCart, getTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
