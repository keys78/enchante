import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cart/cartSlice'
import productsReducer from '../reducers/products/productsSlice'
import authReducer from '../reducers/auth/authSlice'
import userReducer from '../reducers/private/user/userSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch