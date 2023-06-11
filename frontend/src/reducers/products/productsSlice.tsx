import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products } from "../../utils/data";
import { Product } from "../../types";

interface ProductsState {
    products: Product[];
    filteredProducts: Product[];
    filterTerms: Record<string, string | null>;
}

const initialState: ProductsState = {
    products: products,
    filteredProducts: products,
    filterTerms: {},
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // filterProductsByPrice: (state, action: PayloadAction<{ priceRange: { min: number; max: number } }>) => {
        //     const { priceRange } = action.payload;
        //     state.filteredProducts = state.products.filter((product: Product) => product.price <= priceRange.max);
        // },

        filterProductsByPrice: (state, action: PayloadAction<{ priceRange: { min: number; max: number } }>) => {
            const { priceRange } = action.payload;

            const { category, color, brand, freeShipping } = state.filterTerms;

            state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (brand ? product.brand === brand : true) &&
                (freeShipping ? product.free_shipping === (freeShipping === "true") : true) &&
                product.price >= priceRange.min &&
                product.price <= priceRange.max
            );
        },



        filterProductsByCategory: (state, action: PayloadAction<{ category: Product["category"] }>) => {
            const { category } = action.payload;
            state.filterTerms.category = category === "all" ? null : category;

            const { category: filterCategory, brand, color, freeShipping } = state.filterTerms;
            state.filteredProducts = state.products.filter((product: Product) =>
                (filterCategory ? product.category === filterCategory : true) &&
                (brand ? product.brand === brand : true) &&
                (color ? product.color === color : true) &&
                (freeShipping ? product.free_shipping : true)
            );
        },


        filterProductsByColor: (state, action: PayloadAction<{ color: Product["color"] }>) => {
            const { color } = action.payload;
            state.filterTerms.color = color === "all" ? null : color;

            const { category, brand, color: filterColor, freeShipping } = state.filterTerms;
            state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (brand ? product.brand === brand : true) &&
                (filterColor ? product.color === filterColor : true) &&
                (freeShipping ? product.free_shipping : true)
            );
        },

        filterProductsByBrand: (state, action: PayloadAction<{ brand: Product["brand"] }>) => {
            const { brand } = action.payload;
            state.filterTerms.brand = brand === "all" ? null : brand;

            const { category, color, brand: filterBrand, freeShipping } = state.filterTerms;
            state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (filterBrand ? product.brand === filterBrand : true) &&
                (freeShipping ? product.free_shipping : true)
            );
        },


        filterByStarNumberOfRatings: (state, action: PayloadAction<{ starNumberOfRatings: number }>) => {
            const { starNumberOfRatings } = action.payload;
            const { category, color, brand } = state.filterTerms;
          
            if (starNumberOfRatings) {
              state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (brand ? product.brand === brand : true) &&
                product.star_ratings === starNumberOfRatings
              );
          
              state.filterTerms.starNumberOfRatings = starNumberOfRatings.toString();
            } else {
              state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (brand ? product.brand === brand : true)
              );
          
              delete state.filterTerms.starNumberOfRatings;
            }
          },
          
          


        filterByFreeShipment: (state, action: PayloadAction<{ freeShipping: Product["free_shipping"] }>) => {
            const { freeShipping } = action.payload;
            const { category, color, brand } = state.filterTerms;
          
            if (freeShipping) {
              state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (brand ? product.brand === brand : true) &&
                product.free_shipping === true
              );
          
              state.filterTerms.freeShipping = "true";
            } else {
              state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (brand ? product.brand === brand : true)
              );
          
              delete state.filterTerms.freeShipping;
            }
          },

          
          
        resetAllFilters: (state) => {
            state.filteredProducts = state.products;
            state.filterTerms = {};
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
    filterByStarNumberOfRatings,
    filterByFreeShipment,

} = productsSlice.actions;

export default productsSlice.reducer;
