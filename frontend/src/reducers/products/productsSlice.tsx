import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../../utils/data";
import { Product } from "../../types";

interface ProductsState {
    products: Product[];
    filteredProducts: Product[];
}

interface FilterPricePayload {
    priceRange: { min: number; max: number };
}

interface FilterCategoryPayload {
    category: string;
}

const initialState: ProductsState = {
    products: products,
    filteredProducts: products,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        filterProductsByPrice: (state, action: PayloadAction<FilterPricePayload>) => {
            const { priceRange } = action.payload;
            state.filteredProducts = state.products.filter(
                (product: Product) => product.price <= priceRange.max
            );
        },
        filterProductsByCategory: (state, action: PayloadAction<FilterCategoryPayload>) => {
            const { category } = action.payload;
            if (category === "all") {
              state.filteredProducts = state.products;
            } else {
              state.filteredProducts = state.products.filter((product: Product) => product.category === category);
            }
          },
        filterProductsByColor: (state, action: PayloadAction<Product>) => {
            const { color } = action.payload;
            if (color === "all") {
              state.filteredProducts = state.products;
            } else {
              state.filteredProducts = state.products.filter((product: Product) => product.color === color);
            }
          },
          
        resetAllFilters: (state) => {
            state.filteredProducts = state.products;
          }
          
    },
    extraReducers: {},
});

export const { filterProductsByPrice, filterProductsByCategory, resetAllFilters, filterProductsByColor } = productsSlice.actions;

export default productsSlice.reducer;
