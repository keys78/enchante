import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types';
import { selectedProductsArray } from '../../utils/data';
import ProductFrame from '../products/ProductFrame';



const SelectedProducts = () => {

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
          {selectedProductsArray.map((product: Product, i: number) => {
            return (
              <SwiperSlide key={i}>
                <ProductFrame product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default SelectedProducts;