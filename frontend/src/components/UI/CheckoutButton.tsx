import axios from "axios";
import { CartItem } from "../../types";
import { useAppSelector } from "../../network/hooks";
import { RootState } from "../../network/store";

interface CheckoutButtonProps {
    cartItems: CartItem[];
}

const CheckoutButton = ({ cartItems }: CheckoutButtonProps) => {
    const cart = useAppSelector((state: RootState) => state.cart)
    const { user } = useAppSelector(state => state.user)

    const handleCheckout = async () => {
        await axios.post(`${import.meta.env.VITE_APP_BASE_API}stripe/create-checkout-session`, {
            userId: user?._id,
            cartItems: cartItems
        })
            .then((res) => {
                if (res.data.url) {
                     axios.post(`${import.meta.env.VITE_APP_BASE_API}stripe/webhook`).then((res) => {console.log('res:', res)}),
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