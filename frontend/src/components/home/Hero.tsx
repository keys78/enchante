/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { CardSliderOne, CardSliderTwo, SliderData, heroDisplayTexts } from '../../utils/data';
import Slideshow from '../UI/SlidesShow';
import CardCarousel from '../UI/CardCarousel';
import { FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';
import useWindowSize from '../hooks/useWindowSize';


const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const { width } = useWindowSize();

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 5000);

        return () => clearTimeout(timer);
    }, [activeIndex]);

    const determineClasses = (index: any) => {
        if (index === activeIndex) {
            return 'active';
        } else if (index === (activeIndex + 1) % 5) {
            return 'next';
        } else if (index === (activeIndex - 1 + 5) % 5) {
            return 'prev';
        }
        return 'inactive';
    };

    return (
        <>
            <div className='s-767:flex block space-x-5 items-start justify-between mt-4 relative'>
                <div className='flex items-center justify-between space-x-5 s-767:max-w-[600px] w-full s-767:pt-[100px] pt-[20px] relative mb-[25px] s-480:pr-0 pr-[16px]'>
                    <div className='s-767:px-[30px]'>
                        <ul className='flex flex-col s-480:space-y-6 space-y-4'>
                            {heroDisplayTexts.map((item) => (
                                <li
                                    onClick={() => setActiveIndex(item.tag - 1)}
                                    key={item.tag}
                                    className={`${item.tag === activeIndex + 1 && 'active-hero-text'} hover:cursor-pointer text-textGray pl-3 s-767:text-[16px] text-[13px] `}
                                >
                                    {item.tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-card-container">
                        {heroDisplayTexts.map((val, index) => (
                            <div className={`text-card ${determineClasses(index)}`} key={val.tag}>
                                <h1 className={`s-767:text-[42px] s-480:text-[32px] text-[21px] font-nunitosans font-bold leading-tight s-767:pb-[30px] pb-[10px] s-767:text-left text-center`}>
                                    {val.title}
                                </h1>
                                <p className='text-textGray s-767:text-[16px] text-[14px] s-767:text-left text-center'>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full img-flexor'>
                    <div className='s-1440:flex block'>
                        <div>
                            <Slideshow slides={SliderData} />
                        </div>
                        {width > 1440 &&
                            <div className='flex flex-col mt-10 -ml-4 space-y-[300px] '>
                                <CardCarousel cardItems={CardSliderOne} />
                                <CardCarousel cardItems={CardSliderTwo} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='fixed bottom-0 right-0 z-50'>
                <div className="py-7 bg-black text-white">
                    <div className='flex space-x-14'>
                        <div className='flex flex-col space-y-3 max-w-[24px] mx-[14px]'>
                            <FacebookLogo className="cursor-pointer" size={24} color="#a2a5b5" weight="regular" />
                            <InstagramLogo className="cursor-pointer" size={24} color="#a2a5b5" weight="regular" />
                            <TwitterLogo className="cursor-pointer" size={24} color="#a2a5b5" weight="regular" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
