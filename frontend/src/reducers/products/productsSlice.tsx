// productsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../../utils/data";
import { Product } from "../../types";


interface ProductsState {
    products: Product[];
    filteredProducts: Product[];
}

const initialState: ProductsState = {
    products: products,
    filteredProducts: products,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        filterProductsByPrice: (state, action: PayloadAction<{ priceRange: { min: number; max: number } }>) => {
            const { priceRange } = action.payload;
            state.filteredProducts = state.products.filter(
                (product: Product) => product.price <= priceRange.max
            );
        },

        filterProductsByCategory: (state, action: PayloadAction<{ category: Product["category"] }>) => {
            const { category } = action.payload;
            if (category === "all") {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    (product: Product) => product.category === category
                );
            }
        },

        filterProductsByBrand: (state, action: PayloadAction<{ brand: Product["brand"] }>) => {
            const { brand } = action.payload;
            if (brand === "all") {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    (product: Product) => product.brand === brand
                );
            }
        },

        filterProductsByColor: (state, action: PayloadAction<{ color: Product["color"] }>) => {
            const { color } = action.payload;
            if (color === "all") {
                state.filteredProducts = state.products;
            } else {
                state.filteredProducts = state.products.filter(
                    (product: Product) => product.color === color
                );
            }
        },

        filterByFreeShipment: (state, action: PayloadAction<{ freeShipping: Product["free_shipping"] }>) => {
            const { freeShipping } = action.payload;
            if (freeShipping) {
                state.filteredProducts = state.products.filter(
                    (product: Product) => product.free_shipping === true
                );
            } else {
                state.filteredProducts = state.products;
            }
        },

        resetAllFilters: (state) => {
            state.filteredProducts = state.products;
        },

    },
    extraReducers: {},
});

export const {
    filterProductsByPrice,
    filterProductsByCategory,
    resetAllFilters,
    filterProductsByColor,
    filterProductsByBrand,

    filterByFreeShipment,
} = productsSlice.actions;

export default productsSlice.reducer;
