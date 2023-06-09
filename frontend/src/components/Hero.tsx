/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { CardSliderOne, CardSliderTwo, SliderData, heroDisplayTexts } from '../utils/data';
import Slideshow from './SlidesShow';
import CardCarousel from './CardCarousel';
import { ArrowElbowDownRight, FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';


const Hero = () => {

    const [activeIndex, setActiveIndex] = useState(1);

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
            <div className='flex space-x-5 items-start justify-between mt-4 relative'>
                <div className='flex items-center justify-between space-x-5 max-w-[600px] w-full pt-[100px] relative'>
                    <div className='px-[30px]'>
                        <ul className='flex flex-col space-y-6'>
                            {heroDisplayTexts.map((item) => (
                                <li
                                    onClick={() => setActiveIndex(item.tag - 1)}
                                    key={item.tag}
                                    className={`${item.tag === activeIndex + 1 && 'active-hero-text'} hover:cursor-pointer text-textGray pl-3 `}
                                >
                                    {item.tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-card-container">
                        {heroDisplayTexts.map((val, index) => (
                            <div className={`text-card ${determineClasses(index)}`} key={val.tag}>
                                <h1 className={`text-[42px] font-nunitosans font-bold leading-tight pb-[30px]`}>
                                    {val.title}
                                </h1>
                                <p className='text-textGray'>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full'>
                    <div className='flex'>
                        <div className='row-span-2'>
                            <Slideshow slides={SliderData} />
                        </div>
                        <div className='flex flex-col mt-10 -ml-4 space-y-[300px] '>
                            <CardCarousel cardItems={CardSliderOne} />
                            <CardCarousel cardItems={CardSliderTwo} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed bottom-0 left-0'>
                <div className="py-7 bg-black text-white">
                    <div className='flex space-x-14'>
                        <div className='flex flex-col space-y-3 max-w-[24px] mx-[14px]'>
                            <FacebookLogo className="cursor-pointer" size={24} color="#a2a5b5" weight="thin" />
                            <InstagramLogo className="cursor-pointer" size={24} color="#a2a5b5" weight="thin" />
                            <TwitterLogo className="cursor-pointer" size={24} color="#a2a5b5" weight="thin" />
                        </div>
                        <div className='cursor-pointer flex items-center space-x-2 pr-40'>
                            <ArrowElbowDownRight size={32} color="#fafafa88" weight="fill" />
                            <span className='text-[18px] -mb-[12px] opacity-60'>Shop Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
