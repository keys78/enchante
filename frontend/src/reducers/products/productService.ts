import axios from "axios"
import { Product } from "../../types"


const config = {
    headers: {
        "Content-Type": "application/json",
    },
}

const getAllProducts = async () => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/`, config)
    return data
}

const getSingleProduct = async (productId: string) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/product/${productId}`, config)
    return data
}

const productService = {
    getAllProducts,
    getSingleProduct
}

  export default productService;