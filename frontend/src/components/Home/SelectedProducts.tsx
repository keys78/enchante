
import { Link } from 'react-router-dom';
import { CartItem, Product } from '../../types';
import {  useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import { useAddQuantity, useAddToCart, useDecreaseQuantity } from '../hooks/CartCTABtn';
import img_s_x from '../../assets/png/img_s_x.jpg'

const SelectedProducts = () => {
    const cart = useAppSelector((state: RootState) => state.cart);
    const addToCart = useAddToCart();
    const addQuantity = useAddQuantity();
    const decreaseQuantity = useDecreaseQuantity();

    const selectedProductsArray = [
        {
            id: '1',
            category: 'men',
            name: 'Iphone Pro MAX',
            image: img_s_x,
            desc: 'Lorem Ipsum dlee fhbsvuh h fshis sfh jhsfjlfj sfh hfs al',
            color: 'red',
            free_shipping: true,
            brand: 'Apple',
            price: 900,
            star_ratings: 3,
        },
        {
            id: '2',
            category: 'women',
            name: 'Lipstick',
            image: img_s_x,
            desc: 'Lorem Ipsum dlee fhbsvuh h fshis sfh jhsfjlfj sfh hfs al',
            color: 'red',
            free_shipping: true,
            brand: 'Apple',
            price: 900,
            star_ratings: 3,
        },
        {
            id: '3',
            category: 'men',
            name: 'Shoe',
            image: img_s_x,
            desc: 'Lorem Ipsum dlee fhbsvuh h fshis sfh jhsfjlfj sfh hfs al',
            color: 'red',
            free_shipping: true,
            brand: 'Apple',
            price: 900,
            star_ratings: 3,
        },
    ];

    return (
        <section className='pt-44 pb-20'>
            <div className='mx-auto px-8'>
                <h1 className="text-4xl font-nunitosans font-bold leading-tight pb-12">Selected Products</h1>
                <div className='flex'>
                        <div className='currated-image relative overflow-hidden'>
                            <div className="flex items-center justify-between">
                                {selectedProductsArray.map((product: Product) => {
                                    const existingCartItem = cart.cartItems.find(
                                        (item: CartItem) => item.id === product.id
                                    );
                                    return (
                                        <div key={product.id} className="product">
                                            <h3>{product.name}</h3>
                                            <img
                                                className="w-[300px]" src={product.image} alt={product.name}
                                            />
                                            <div className="details">
                                                <span>{product.desc}</span>
                                                <span className="price">${product.price}</span>
                                            </div>
                                            {existingCartItem ? (
                                                <div className="cart-actions">
                                                    <button
                                                        className="rounded p-2 bg-red-500 text-white"
                                                        onClick={() => decreaseQuantity(existingCartItem)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{existingCartItem.cartQuantity}</span>
                                                    <button
                                                        className="rounded p-2 bg-green-500 text-white"
                                                        onClick={() => addQuantity(existingCartItem)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="rounded p-4 bg-red-500 text-white"
                                                    onClick={() => addToCart(product)}
                                                >
                                                    Add To Cart
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}

export default SelectedProducts;
