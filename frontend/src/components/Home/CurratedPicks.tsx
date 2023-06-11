import { ArrowRight } from '@phosphor-icons/react'
import picks_one from '../../assets/png/picks_one.jpg'
import { Link } from 'react-router-dom'

const CurratedPicks = () => {
    const curratedArray = [
        { image: picks_one, btn_text: 'best seller', route: 'products' },
        { image: picks_one, btn_text: 'shop men', route: 'products' },
        { image: picks_one, btn_text: 'shop women', route: 'products' },
        { image: picks_one, btn_text: 'best seller', route: 'products' },
    ]

    return (
        <section className='pb-[400px]'>
            <div className='mx-auto px-[80px]'>
                <h1 className="text-[42px] font-nunitosans font-bold leading-tight pb-12">Currated Picks.</h1>
                <div className='grid grid-cols-4 space-x-5'>
                    {curratedArray.map((val) =>
                        <div className='relative overflow-hidden'>
                            <img src={val.image} className='rounded-md filter grayscale hover:filter-none hover:duration-500 hover:scale-150 transform transition-transform duration-300' />
                            <div className='absolute bottom-20 w-full px-[30px]'>
                                <Link to={`/${val.route}`}>
                                    <button className='flex items-center justify-center w-full space-x-8 rounded-md bg-white text-black py-3'>
                                        <div className='font-medium text-[18px] capitalize'>{val.btn_text}</div>
                                        <div className='animation-linear'>
                                            <ArrowRight size={24} color="#000" weight='bold' />
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CurratedPicks