/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { products } from "../../utils/data";
import { IToken, Product } from "../../types";
import errorHandler from "../../utils/errorHandler";
import productService from "./productService";
import { Auth } from "../auth/authSlice";

const storedRecentlyViewed = localStorage.getItem("enchante-rv");
const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ent-token') : null;
export const token2 = storedToken ? JSON.parse(storedToken) : '';
// filterTerms: Record<string, string | null | number>;

const emptyProduct: Product = {
  _id: '',
  category: '',
  name: '',
  image: '',
  desc: '',
  sizes: [],
  price: 0,
  color: '',
  brand: '',
  free_shipping: false,
  new: false,
  star_ratings: 0,
};

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  totalPages: number,
  totalResults: number,
  product: Product;
  filterTerms: Record<any, any>;
  recentlyViewed: Product[];
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: any;
}

interface GetAllProductsPayload {
  results: Product[]; // Add the 'results' property
  totalPages: number;
  totalResults: number;
}





const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  totalPages: 0,
  totalResults: 0,
  product: emptyProduct,
  recentlyViewed: storedRecentlyViewed ? JSON.parse(storedRecentlyViewed) : [],
  filterTerms: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


export const getAllProducts = createAsyncThunk<GetAllProductsPayload, number>(
  '/products',
  async (page, thunkAPI) => {
    try {
      return await productService.getAllProducts(page);
    } catch (error: any) {
      errorHandler(error, thunkAPI);
      throw error;
    }
  }
);


export const getSingleProduct = createAsyncThunk<Product, { productId: string; }>(
  'products/product/:productId',
  async ({ productId }, thunkAPI) => {
    try {
      return await productService.getSingleProduct(productId)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
      throw error;
    }
  }
);

export const searchProducts = createAsyncThunk<GetAllProductsPayload, { queryParam: any, page: number }>(
  'products/search',
  async ({ queryParam, page }, thunkAPI) => {
    try {
      const searchResults = await productService.searchProducts(queryParam, page);
      return searchResults || [];
    } catch (error: any) {
      errorHandler(error, thunkAPI);
      throw error;
    }
  }
);

export const toggleSavedProducts = createAsyncThunk<any, any>(
  'products/toggleSavedProduct',
  async ({ productId }, thunkAPI) => {
    const token: IToken = token2 || (thunkAPI.getState() as { auth: Auth }).auth.token;

    try {
      return await productService.toggleSavedProduct(token, productId)
    } catch (error: any) {
      errorHandler(error, thunkAPI)
    }
  }
)



const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToRecentlyViewed(state, action: PayloadAction<Product>) {
      const { _id } = action.payload;
      const existingItemIndex = state.recentlyViewed.findIndex((item) => item._id === _id);

      if (existingItemIndex !== -1) {
        // Item already exists, we need to it to the front
        const existingItem = state.recentlyViewed[existingItemIndex];
        state.recentlyViewed.splice(existingItemIndex, 1);
        state.recentlyViewed.unshift(existingItem);
      } else {

        // Item doesn't exist, add it to the front
        const newlyViewedItem = { ...action.payload, cartQuantity: 1 };
        state.recentlyViewed.unshift(newlyViewedItem);
      }

      // Limiting the number of items to a maximum of 5
      if (state.recentlyViewed.length > 4) {
        state.recentlyViewed.pop();
      }

      localStorage.setItem("enchante-rv", JSON.stringify(state.recentlyViewed));
    },




    filterProductsByPrice: (state, action: PayloadAction<{ maxRange: string }>) => {
      const { maxRange } = action.payload;
      const { category, color, brand, freeShipping } = state.filterTerms;

      const updatedFilterTerms: ProductsState["filterTerms"] = {
        ...state.filterTerms,
        price: maxRange,
      };

      state.filteredProducts = state.products.filter((product: Product) =>
        (category ? product.category === category : true) &&
        (color ? product.color === color : true) &&
        (brand ? product.brand === brand : true) &&
        (freeShipping ? product.free_shipping === (freeShipping === "true") : true) &&
        product.price <= parseInt(maxRange)
      );

      state.filterTerms = updatedFilterTerms;
    },


    filterProductsByCategory: (state, action: PayloadAction<{ category: Product["category"] }>) => {
      const { category } = action.payload;
      state.filterTerms.category = category === "all" ? null : category;

      const { category: filterCategory, brand, color, freeShipping } = state.filterTerms;
      // const numericPrice = typeof price === "number" ? price : price !== null ? parseFloat(price) : null
      state.filteredProducts = state.products.filter((product: Product) =>
        // (numericPrice !== null ? product.price <= numericPrice : true) &&
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
      // const numericPrice = typeof price === "number" ? price : price !== null ? parseFloat(price) : null;
      state.filteredProducts = state.products.filter((product: Product) =>
        (category ? product.category === category : true) &&
        (brand ? product.brand === brand : true) &&
        ((filterColor !== null && product.color === filterColor) || filterColor === null) &&
        (freeShipping ? product.free_shipping : true)
        // (numericPrice !== null ? product.price <= numericPrice : true)
      );
    },



    filterProductsByBrand: (state, action: PayloadAction<{ brand: Product["brand"] }>) => {
      const { brand } = action.payload;
      state.filterTerms.brand = brand === "all" ? null : brand;

      const { category, color, brand: filterBrand, freeShipping } = state.filterTerms;
      // const numericPrice = typeof price === "number" ? price : price !== null ? parseFloat(price) : null;
      state.filteredProducts = state.products.filter((product: Product) =>
        // (numericPrice !== null ? product.price <= numericPrice : true) &&
        (category ? product.category === category : true) &&
        (color ? product.color === color : true) &&
        (filterBrand ? product.brand === filterBrand : true) &&
        (freeShipping ? product.free_shipping : true)
      );
    },


    filterByStarNumberOfRatings: (state, action: PayloadAction<{ starNumberOfRatings: number }>) => {
      const { starNumberOfRatings } = action.payload;
      const { category, color, brand, price } = state.filterTerms;
      const numericPrice = typeof price === "number" ? price : price !== null ? parseFloat(price) : null;

      if (starNumberOfRatings) {
        state.filteredProducts = state.products.filter((product: Product) =>
          (numericPrice !== null ? product.price <= numericPrice : true) &&
          (category ? product.category === category : true) &&
          (color ? product.color === color : true) &&
          (brand ? product.brand === brand : true) &&
          product.star_ratings === starNumberOfRatings
        );

        state.filterTerms.starNumberOfRatings = starNumberOfRatings.toString();
      } else {
        state.filteredProducts = state.products.filter((product: Product) =>
          (numericPrice !== null ? product.price <= numericPrice : true) &&
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


    filterByNewProducts: (state, action: PayloadAction<{ newProduct: Product["new"] }>) => {
      const { newProduct } = action.payload;
      const { category, color, brand } = state.filterTerms;

      if (newProduct) {
        state.filteredProducts = state.products.filter((product: Product) =>
          (category ? product.category === category : true) &&
          (color ? product.color === color : true) &&
          (brand ? product.brand === brand : true) &&
          product.new === true
        );

        state.filterTerms.newProduct = "true";
      } else {
        state.filteredProducts = state.products.filter((product: Product) =>
          (category ? product.category === category : true) &&
          (color ? product.color === color : true) &&
          (brand ? product.brand === brand : true)
        );

        delete state.filterTerms.newProduct;
      }
    },

    //SORTING PRODUCTS
    sortByLowestPrice: (state) => {
      const sortedProducts = [...state.filteredProducts].sort((a, b) => a.price - b.price);
      state.filteredProducts = sortedProducts;
    },
    sortByHighestPrice: (state) => {
      const sortedProducts = [...state.filteredProducts].sort((a, b) => b.price - a.price);
      state.filteredProducts = sortedProducts;
    },
    sortByNameAZ: (state) => {
      const sortedProducts = [...state.filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      state.filteredProducts = sortedProducts;
    },

    sortByNameZA: (state) => {
      const sortedProducts = [...state.filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      state.filteredProducts = sortedProducts;
    },


    resetAllFilters: (state) => {
      state.filteredProducts = state.products;
      state.filterTerms = {};
    },
  },



  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload.results
        state.filteredProducts = action.payload.results
        state.totalPages = action.payload.totalPages
        state.totalResults = action.payload.totalResults
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload.results
        state.filteredProducts = action.payload.results
        state.totalPages = action.payload.totalPages
        state.totalResults = action.payload.totalResults
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload || "Something went wrong";
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(toggleSavedProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(toggleSavedProducts.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(toggleSavedProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  }
});

export const {
  addToRecentlyViewed,

  filterProductsByPrice,
  filterProductsByCategory,
  resetAllFilters,
  filterProductsByColor,
  filterProductsByBrand,
  filterByStarNumberOfRatings,
  filterByFreeShipment,
  filterByNewProducts,

  sortByLowestPrice,
  sortByHighestPrice,
  sortByNameAZ,
  sortByNameZA,


} = productsSlice.actions;

export default productsSlice.reducer;
