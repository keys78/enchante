import { ArrowRight } from '@phosphor-icons/react';
import pickss_one from '../../assets/png/pickss_one.jpg';
import picks_two from '../../assets/png/picks_two.jpg';
import picks_three from '../../assets/png/picks_three.jpg';
import picks_four from '../../assets/png/picks_four.jpg';
import { Link } from 'react-router-dom';

const CurratedPicks = () => {
  const curratedArray = [
    { image: pickss_one, btn_text: 'best seller', route: 'products' },
    { image: picks_two, btn_text: 'shop men', route: 'products' },
    { image: picks_three, btn_text: 'shop women', route: 'products' },
    { image: picks_four, btn_text: 'shop casual', route: 'products' },
  ];

  return (
    <section className='pb-20'>
      <div className='mx-auto px-8'>
        <h1 className="text-4xl font-nunitosans font-bold leading-tight pb-12">Currated picks</h1>
        <div className='grid grid-cols-4 gap-5'>
          {curratedArray.map((val, index) => (
            <div className='currated-image relative overflow-hidden' key={index}>
              <img src={val.image} className='rounded-md filter grayscale hover:filter-none hover:scale-150 hover:duration-500 transform transition-transform duration-300' alt='Curated Pick' />
              <div className='absolute bottom-4 left-4 right-4'>
                <Link to={`/${val.route}`}>
                  <button className='flex items-center justify-center w-full space-x-2 rounded-md bg-white text-black py-2 hover:bg-[#f75a2c] transition-colors duration-300'>
                    <div className='font-medium text-lg capitalize'>{val.btn_text}</div>
                    <div className='animation-linear'>
                      <ArrowRight size={24} color="#000" weight='bold' />
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
