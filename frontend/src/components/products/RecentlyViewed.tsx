import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types';
import { selectedProductsArray } from '../../utils/data';
import ProductFrame from '../products/ProductFrame';
import { useAppSelector } from '../../network/hooks';



const RecentlyViewed = () => {

    const { recentlyViewed } = useAppSelector(state => state.products)

  return (
    <section className='pt-44 pb-20'>
      <div className='mx-auto'>
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
          <h1 className="absolute top-0 left-0 text-4xl font-nunitosans font-bold leading-tight">Recently viewed</h1>
          {recentlyViewed.map((product: Product, i: number) => {
            return (
              <SwiperSlide key={i}>
                <ProductFrame product={product} price_font_size={'text-[24px]'} icon_size={22}  />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default RecentlyViewed;