import { useAddQuantity, useAddToCart, useDecreaseQuantity } from '../hooks/CartCTABtn';
import { useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { CartItem, Product } from '../../types';
import { selectedProductsArray } from '../../utils/data';
import { Minus, Plus, ShoppingCart, ShoppingCartSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';



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
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          <h1 className="absolute top-0 left-0 text-4xl font-nunitosans font-bold leading-tight">Featured products</h1>
          {selectedProductsArray.map((val: Product, i: number) => {
            const existingCartItem = cart.cartItems.find((item: CartItem) => item.id === val.id);
            return (
              <SwiperSlide key={i}>
                <div key={val.id} className='mt-40px'>
                  <Link to="/product/product-details">
                    <img className='rounded-[5px]' src={val.image} alt={'enchanté_fashon'} />
                  </Link>
                  <div className='flex justify-between pt-[14px]'>
                    <div className="details">
                      <h3 className='font-medium'>{val.name}</h3>
                      <div className='flex items-start space-x-3'>
                        <span className="text-[24px] font-medium montserrat">${val.price}</span>
                        <span className='text-[16px] font-medium montserrat opacity-60 discount-strike'>$20</span>
                      </div>
                    </div>
                    <div>
                      {existingCartItem ? (
                        <div className='flex items-center space-x-4'>
                          <button
                            className="rounded-[5px] hover:opacity-70 transition p-2 duration-300 bg-black text-white"
                            onClick={() => decreaseQuantity(existingCartItem)}
                          >
                            <Minus size={22} color="#f8f8f8" weight="regular" />
                          </button>
                          <span className='font-bold'>{existingCartItem.cartQuantity}</span>
                          <button
                            className="rounded-[5px] hover:opacity-70 transition p-2 duration-300 bg-black text-white"
                            onClick={() => addQuantity(existingCartItem)}
                          >
                            <Plus size={22} color="#f8f8f8" weight="regular" />
                          </button>
                        </div>
                      ) : (
                        <button className="rounded-[5px] hover:opacity-70 transition duration-300 p-3 bg-black text-white" onClick={() => addToCart(val)}>
                          <ShoppingCartSimple size={22} color="#f8f8f8" weight="regular" />
                        </button>
                      )}
                    </div>
                  </div>

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