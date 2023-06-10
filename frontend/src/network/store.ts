// import authReducer from '@/features/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cart/cartSlice'
import productsReducer from '../reducers/products/productsSlice'



export const store = configureStore({
  reducer: {
        // auth: authReducer,
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