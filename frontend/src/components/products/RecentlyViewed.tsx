import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types';
import ProductFrame from '../products/ProductFrame';
import { useAppSelector } from '../../network/hooks';


const RecentlyViewed = () => {
    const { recentlyViewed } = useAppSelector(state => state.products)

    return (
        <>
            {recentlyViewed.length > 0 &&
                <section className='pt-44 pb-20'>
                    <div className='mx-auto'>
                        <Swiper
                            className={`${recentlyViewed.length <= 3 ? 'pt-[78px]' : 'pt-[48px]' }`}
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={false}
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
                            <h1 className="absolute top-0 left-0 text-4xl font-nunitosans font-bold leading-tight pb-7">Recently viewed</h1>
                            {recentlyViewed.map((product: Product, i: number) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <ProductFrame product={product} 
                                        price_font_size='text-[16px]'
                                        discount_font_size={'text-[12px]'}
                                        shop_button={'p-[4px]'}
                                        icon_size={18}
                                        showControls={false}/>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </section>
            }
        </>
    );
};

export default RecentlyViewed;