// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { products } from "../../utils/data";
// import { Product } from "../../types";


// interface ProductsState {
//     products: Product[];
//     filteredProducts: Product[];
//     filterTerms: Product[];
// }

// const initialState: ProductsState = {
//     products: products,
//     filteredProducts: products,
//     filterTerms: [],
// };

// const productsSlice = createSlice({
//     name: "products",
//     initialState,
//     reducers: {
//         filterProductsByPrice: (state, action: PayloadAction<{ priceRange: { min: number; max: number } }>) => {
//             const { priceRange } = action.payload;
//             state.filteredProducts = state.products.filter(
//                 (product: Product) => product.price <= priceRange.max
//             );
//         },

//         filterProductsByCategory: (state, action: PayloadAction<{ category: Product["category"] }>) => {
//             const { category } = action.payload;
//             if (category === "all") {
//                 state.filteredProducts = state.products;
//             } else {
//                 state.filteredProducts = state.products.filter(
//                     (product: Product) => product.category === category
//                 );
//             }
//         },

//         filterProductsByBrand: (state, action: PayloadAction<{ brand: Product["brand"] }>) => {
//             const { brand } = action.payload;
//             if (brand === "all") {
//                 state.filteredProducts = state.products;
//             } else {
//                 state.filteredProducts = state.products.filter(
//                     (product: Product) => product.brand === brand
//                 );
//             }
//         },

//         filterProductsByColor: (state, action: PayloadAction<{ color: Product["color"] }>) => {
//             const { color } = action.payload;
//             if (color === "all") {
//                 state.filteredProducts = state.products;
//             } else {
//                 state.filteredProducts = state.filteredProducts.filter(
//                     (product: Product) => product.color === color
//                 );
//             }
//         },

//         filterByFreeShipment: (state, action: PayloadAction<{ freeShipping: Product["free_shipping"] }>) => {
//             const { freeShipping } = action.payload;
//             if (freeShipping) {
//                 state.filteredProducts = state.products.filter(
//                     (product: Product) => product.free_shipping === true
//                 );
//             } else {
//                 state.filteredProducts = state.products;
//             }
//         },

//         resetAllFilters: (state) => {
//             state.filteredProducts = state.products;
//         },

//     },
//     extraReducers: {},
// });

// export const {
//     filterProductsByPrice,
//     filterProductsByCategory,
//     resetAllFilters,
//     filterProductsByColor,
//     filterProductsByBrand,
//     filterByFreeShipment,

// } = productsSlice.actions;

// export default productsSlice.reducer;














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
          
              state.filterTerms.freeShipping = "true"; // Add the freeShipping filter term to filterTerms
            } else {
              state.filteredProducts = state.products.filter((product: Product) =>
                (category ? product.category === category : true) &&
                (color ? product.color === color : true) &&
                (brand ? product.brand === brand : true)
              );
          
              delete state.filterTerms.freeShipping; // Remove the freeShipping filter term from filterTerms
            }
          },

          
          
        resetAllFilters: (state) => {
            state.filteredProducts = state.products;
            state.filterTerms = {}; // Clear the filterTerms dictionary when resetting filters
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
