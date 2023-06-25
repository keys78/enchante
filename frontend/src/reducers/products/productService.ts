import axios from "axios"


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

const searchProducts = async (queryParam: any) => {
    const { data } = await axios.get(import.meta.env.VITE_APP_BASE_API + `products/search/${queryParam}`, config)
    console.log('resultttttttt', data)
    return data.data
}

const productService = {
    getAllProducts,
    getSingleProduct,
    searchProducts
}

export default productService;