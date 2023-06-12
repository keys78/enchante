import { useAddQuantity, useAddToCart, useDecreaseQuantity } from '../hooks/CartCTABtn';
import { useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { CartItem, Product } from '../../types';
import { selectedProductsArray } from '../../utils/data';



const SelectedProducts = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const addToCart = useAddToCart();
  const addQuantity = useAddQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  return (
    <section className='pt-44 pb-20'>
      <div className='mx-auto px-8'>
        <Swiper
          className='pt-[48px]'
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          navigation
          pagination={false}
          scrollbar={false}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          <h1 className="absolute top-0 left-0 text-4xl font-nunitosans font-bold leading-tight">Featured products</h1>

          {selectedProductsArray.map((val: Product, i: number) => {
            const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === val.id);
            return (
              <SwiperSlide key={i}>
                <div key={val.id} className='mt-40px'>
                  <img src={val.image} alt={val.name} />
                  <div className="details">
                    <div>
                      <span className="price">${val.price}</span>
                      <h3>{val.name}</h3>
                    </div>
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
                      onClick={() => addToCart(val)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default SelectedProducts;