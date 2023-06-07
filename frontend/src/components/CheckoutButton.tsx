import axios from "axios";
import { Product } from "../types";

interface CheckoutButtonProps {
    cartItems: Product[];
}

const CheckoutButton = ({ cartItems }: CheckoutButtonProps) => {
    const handleCheckout = () => {
        axios.post(`http://localhost:4000/stripe/create-checkout-session`, {
            cartItems: cartItems,
            userId: '20201'
        })
        .then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        })
        .catch((err) => console.log(err.message));
    };

    return (
        <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => handleCheckout()}
        >
            Check out
        </button>
    );
};

export default CheckoutButton;