import axios from "axios"
import { IToken } from "../../types"
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

const getSingleProduct = async (productId: string) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/product/${productId}`, config)
    return data
}

const searchProducts = async (queryParam: any, page: number) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/search/${queryParam}?page=${page}&limit=6`, config)
    return data
}

const toggleSavedProduct = async (token: IToken, productId: string) => {
    const authAonfig = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const { data } = await axios.put(import.meta.env.VITE_APP_BASE_API + `products/${productId}/like`, {}, authAonfig)
    toast.success(data.message as string, { autoClose: 1000 });
    return data?.message
}

const productService = {
    getAllProducts,
    getSingleProduct,
    searchProducts,
    toggleSavedProduct
}

export default productService;