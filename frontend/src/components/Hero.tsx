import { useEffect, useState } from 'react';
import image_one from '../assets/png/img_one.jpg'
import image_two from '../assets/png/img_two.jpg'
import image_3 from '../assets/png/img_l_3.jpg'
import image_4 from '../assets/png/img_l_four.jpg'
import image_s_2 from '../assets/png/img_s_2.jpg'
import { cardItems, heroDisplayTexts } from '../utils/data';
import Slideshow from './SlidesShow';
import CardCarousel from './CardCarousel';


const Hero = () => {

    const SliderData = [
        { image: image_one },
        { image: image_3 },
        { image: image_4 },
        { image: image_one },
        { image: image_one },
    ];
    const CardSliderOne = [
        { image: image_two },
        { image: image_two },
        { image: image_two },
        { image: image_two },
        { image: image_two },
    ];
    const CardSliderTwo = [
        { image: image_s_2 },
        { image: image_s_2 },
        { image: image_s_2 },
        { image: image_s_2 },
        { image: image_s_2 },
    ];




    const [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 5000);

        return () => clearTimeout(timer);
    }, [activeIndex]);

    return (
        <div className='flex space-x-5 items-start justify-between mt-4 overflow-hidden'>
            <div className='flex items-center space-x-5 max-w-[600px] w-full pt-[150px]'>
                <div className='px-[30px]'>
                    <ul className='flex flex-col space-y-6'>
                        {heroDisplayTexts.map((item) => (
                            <li
                                onClick={() => setActiveIndex(item.tag - 1)}
                                key={item.tag}
                                className={`${item.tag === activeIndex + 1 && 'border-l-2 border-orangeSkin text-orange-500 font-bold'} hover:cursor-pointer text-textGray pl-3 `}
                            >
                                {item.tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {heroDisplayTexts
                        .filter((val) => val.tag === activeIndex + 1)
                        .map((val) => (
                            <div key={val.tag}>
                                <h1 className='text-[40px] font-nunitosans font-bold leading-tight'>
                                    {val.title}
                                </h1>
                                <p>{val.desc}</p>
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
    );
};

export default Hero;
