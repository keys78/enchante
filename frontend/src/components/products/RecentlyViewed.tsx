import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product } from '../../types';
import ProductFrame from '../products/ProductFrame';
import { useAppSelector } from '../../network/hooks';
import useWindowSize from '../hooks/useWindowSize';


const RecentlyViewed = () => {
    const { width } = useWindowSize();
    const { recentlyViewed } = useAppSelector(state => state.products)

    return (
        <>
            {recentlyViewed.length > 0 &&
                <section className='s-1025:pt-44 s-767:pt-[100px] pt-[60px]'>
                    {width < 768 && <h1 className="s-767:text-[42px] s-480:text-[32px] text-[24px] font-nunitosans font-bold leading-tight s-767:pb-[50px] pb-[20px] s-767:text-left text-center">Recently viewed</h1>}
                    <div className='mx-auto'>
                        <Swiper
                            className={`${recentlyViewed.length <= 3 ? 'pt-[78px]' : 'pt-[48px]'}`}
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
                                1025: {
                                    slidesPerView: 3,
                                },
                            }}
                        >
                            {width > 768 && <h1 className="absolute top-0 left-0 text-4xl font-nunitosans font-bold leading-tight pb-7">Recently viewed</h1>}
                            {recentlyViewed.map((product: Product, i: number) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <ProductFrame product={product}
                                            price_font_size='text-[16px]'
                                            discount_font_size={'text-[12px]'}
                                            shop_button={'p-[4px]'}
                                            icon_size={18}
                                            showControls={false} />
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