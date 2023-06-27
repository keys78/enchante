import axios from "axios"


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

const productService = {
    getAllProducts,
    getSingleProduct,
    searchProducts
}

export default productService;