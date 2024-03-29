import axios from "axios"
import { IToken, Product } from "../../types"
import { toast } from "react-toastify"


const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

const getAllProducts = async (page: number) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/?page=${page}&limit=9`, config)
    return data
}

const getAllProductsTwo = async () => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/?limit=1000`, config)
    return data
}

const getSellerProducts = async (token: IToken,) => {
    const authConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/seller-products`, authConfig)
    return data
}

const getSingleProduct = async (productId: string) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/product/${productId}`, config)
    return data
}

const searchProducts = async (queryParam: any, page: number) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/search/${queryParam}?page=${page}&limit=6`, config)
    return data
}

const toggleSavedProduct = async (token: IToken, productId: string) => {
    const authConfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.put(import.meta.env.VITE_APP_BASE_API + `products/${productId}/like`, {}, authConfig)
    toast.success(data.message as string, { autoClose: 1000 });
    return data?.message
}

const createProduct = async (token: IToken, productData: Product) => {
    const authConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.post(import.meta.env.VITE_APP_BASE_API + `products/create-product`, productData, authConfig)
    toast.success(data.message as string, { autoClose: 1000 });
    return data?.message
}

const updateProduct = async (token: IToken, productId: string, productData: Product) => {
    const authConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.put(import.meta.env.VITE_APP_BASE_API + `products/update-product/${productId}`, productData, authConfig)
    toast.success(data.message as string, { autoClose: 1000 });
    return data?.message
}

const deleteProduct = async (token: IToken, productId: string) => {
    const authConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.delete(import.meta.env.VITE_APP_BASE_API + `products/delete-product/${productId}`, authConfig)
    toast.success(data.message as string, { autoClose: 1000 });
    return data?.message
}


// Orders
const getUserOrders = async (token: IToken) => {
    const authConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/orders`, authConfig)
    return data
}

const getSingleOrder = async (token: IToken, orderId: string) => {
    const authConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/order/${orderId}`, authConfig)
    return data
}

const deleteOrder = async (token: IToken, orderId: string) => {
    const authConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.delete(import.meta.env.VITE_APP_BASE_API + `products/delete-order/${orderId}`, authConfig)
    toast.success(data.message as string, { autoClose: 1000 });
    return data?.message
}

const productService = {
    getAllProducts,
    getAllProductsTwo,
    getSellerProducts,
    getSingleProduct,
    searchProducts,

    toggleSavedProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    getUserOrders,
    getSingleOrder,
    deleteOrder
}

export default productService;