import axios from "axios";
import { CartItem } from "../../types";
import { useAppSelector } from "../../network/hooks";
import { RootState } from "../../network/store";

interface CheckoutButtonProps {
    cartItems: CartItem[];
}

const CheckoutButton = ({ cartItems }: CheckoutButtonProps) => {
    const cart = useAppSelector((state: RootState) => state.cart)

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
            className="p-2 bg-black text-white rounded-[5px] w-full"
            onClick={() => handleCheckout()}
        >
            CHECK OUT (${cart.cartTotalAmount})
        </button>
    );
};

export default CheckoutButton;