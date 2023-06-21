import { ArrowRight } from '@phosphor-icons/react';
import pickss_one from '../../assets/png/pickss_one.jpg';
import picks_two from '../../assets/png/picks_two.jpg';
import picks_three from '../../assets/png/picks_three.jpg';
import picks_four from '../../assets/png/picks_four.jpg';
import { Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

type CuratedItem = {
  image: string;
  btn_text: string;
  route: string;
};

const CurratedPicks = () => {
  const { width } = useWindowSize();
  const curratedArray: CuratedItem[] = [
    { image: pickss_one, btn_text: 'best seller', route: 'products' },
    { image: picks_three, btn_text: 'shop women', route: 'products' },
    { image: picks_two, btn_text: 'shop men', route: 'products' },
    { image: picks_four, btn_text: 'shop casual', route: 'products' },
  ];

  return (
    <section id="currated" className='pb-20 s-1025:px-[80px] s-767:px-[40px] px-[16px]'>
      <div className='mx-auto'>
        <h1 className="s-767:text-[42px] s-480:text-[32px] text-[24px] font-nunitosans font-bold leading-tight s-767:pb-[50px] pb-[20px] s-767:text-left text-center">Currated picks</h1>
        <div className='grid s-767:grid-cols-4 grid-cols-2 s-767:gap-5 s-480:gap-3 gap-2'>
          {curratedArray.map((val, index) => (
            <div className='rounded-[5px] currated-image relative overflow-hidden' key={index}>
              <img src={val.image} className='rounded-[5px] filter grayscale hover:filter-none hover:scale-150 hover:duration-500 transform transition-transform duration-300' alt='Curated Pick' />
              <div className='absolute bottom-4 s-767:left-4 left-2 s-767:right-4 right-2'>
                <Link to={`/${val.route}`}>
                  <button className='whitespace-nowrap flex items-center justify-center w-full space-x-2 rounded-[5px] bg-white text-black s-767:py-2 py-1 hover:bg-[#f75a2c] transition-colors duration-300'>
                    <div className='font-medium s-767:text-lg text-[14px] capitalize'>{val.btn_text}</div>
                    <div className='animation-linear'>
                      <ArrowRight size={ width > 767 ? 20 : 14} color="#000" weight='bold' />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CurratedPicks;
