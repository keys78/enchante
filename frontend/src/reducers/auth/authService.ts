import { IUserLogin, IUserSignUp } from '../../types'
import axios from 'axios'
import { toast } from 'react-toastify'




const signup = async (userData: IUserSignUp) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL + 'auth/signup'}`, userData)

    toast.success(response?.data?.message as string, { autoClose: false });
    return response
}

const login = async (userData: IUserLogin) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL + 'auth/login'}`, userData)


    if (data?.token) {
        localStorage.setItem('ent-token', JSON.stringify(data.token))
    }
    return data
}

const verifyEmail = async (id: string, verifyToken: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL + `auth/${id}/verify/${verifyToken}`}`)

    toast.success(response.data.message as string, { autoClose: false });
    console.log('response', response)
    return response?.data?.message
}


const logout = () => {
    localStorage.removeItem('ent-token')
}

const authService = {
    signup,
    login,
    verifyEmail,
    logout,
}
export default authService
