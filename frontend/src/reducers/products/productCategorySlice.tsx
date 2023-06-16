import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../../utils/data";
import { Product } from "../../types";

interface ProductsState {
    products: Product[];
    productCategory: Product[];
    filteredProductCategory: Product[];
}

const initialState: ProductsState = {
    products: products,
    productCategory: [],
    filteredProductCategory: [],
};

const productsSlice = createSlice({
    name: "productCategory",
    initialState,
    reducers: {
        GetProductsByCategory: (state, action: PayloadAction<{ category: Product["category"] }>) => {
            const { category } = action.payload;
            state.productCategory = state.products.filter(
                (product: Product) => product.category === category
            );
            state.filteredProductCategory = state.productCategory;
        },

        filterCategoryByPrice: (state, action: PayloadAction<{ priceRange: { min: number; max: number } }>) => {
            const { priceRange } = action.payload;
            state.filteredProductCategory = state.productCategory.filter(
                (product: Product) => product.price <= priceRange.max
            );
        },

        filterCategoryByCategory: (state, action: PayloadAction<{ category: Product["category"] }>
        ) => {
            const { category } = action.payload;
            if (category === "all") {
                state.filteredProductCategory = state.productCategory;
            } else {
                state.filteredProductCategory = state.productCategory.filter(
                    (product: Product) => product.category === category
                );
            }
        },

        filterCategoryByBrand: (state, action: PayloadAction<{ brand: Product["brand"] }>) => {
            const { brand } = action.payload;
            if (brand === "all") {
                state.filteredProductCategory = state.productCategory;
            } else {
                state.filteredProductCategory = state.filteredProductCategory.filter(
                    (product: Product) => product.brand === brand
                );
            }
        },

        filterCategoryByColor: (state, action: PayloadAction<{ color: Product["color"] }>) => {
            const { color } = action.payload;
            if (color === "all") {
                state.filteredProductCategory = state.productCategory;
            } else {
                state.filteredProductCategory = state.productCategory.filter(
                    (product: Product) => product.color === color
                );
            }
        },

        filterCategoryByFreeShipment: (state, action: PayloadAction<{ freeShipping: Product["free_shipping"] }>) => {
            const { freeShipping } = action.payload;
            if (freeShipping) {
                state.filteredProductCategory = state.productCategory.filter(
                    (product: Product) => product.free_shipping === true
                );
            } else {
                state.filteredProductCategory = state.productCategory;
            }
        },

        resetAllCategoryFilters: (state) => {
            state.filteredProductCategory = state.productCategory;
        },
    },
    extraReducers: {},
});

export const {
    filterCategoryByPrice,
    filterCategoryByCategory,
    resetAllCategoryFilters,
    filterCategoryByColor,
    filterCategoryByBrand,
    filterCategoryByFreeShipment,
    GetProductsByCategory,
} = productsSlice.actions;

export default productsSlice.reducer;
