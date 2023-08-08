import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types';
import ProductFrame from '../products/ProductFrame';
import useWindowSize from '../hooks/useWindowSize';
import { useAppSelector } from '../../network/hooks';



const SelectedProducts = () => {
  const { width } = useWindowSize();
  const { products } = useAppSelector(state => state.products)

  return (
    <section id="featured" className='s-1025:pt-44 s-767:pt-[100px] pt-[60px] s-1025:px-[80px] s-767:px-[40px] px-[16px]'>
      {width < 768 && <h1 className="s-767:text-[42px] s-480:text-[32px] text-[24px] font-nunitosans font-bold leading-tight s-767:pb-[50px] pb-[20px] s-767:text-left text-center">Featured products</h1>}
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
            1025: {
              slidesPerView: 3,
            },
          }}
        >
          {width > 768 && <h1 className="absolute top-0 left-0 text-4xl font-nunitosans font-bold leading-tight">Featured products</h1>}
          {products.slice(0.4).map((product: Product, i: number) => {
            return (
              <SwiperSlide key={i}>
                <ProductFrame  product_image={'product-image-2'} product={product} price_font_size={'text-[24px]'} icon_size={22} showControls={false} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default SelectedProducts;