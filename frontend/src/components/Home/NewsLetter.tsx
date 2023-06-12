import { Link } from 'react-router-dom'
import limited_offer_x from '../../assets/png/limited_offer_x.jpg'
import { Envelope } from '@phosphor-icons/react'

const NewsLetter = () => {
    return (
        <section className='pt-44 pb-20'>
            <div className='mx-auto px-8'>
                <div className='flex bg-[#202122] max-w-[1024px] w-full mx-auto rounded-[5px]'>
                    <div className='max-w-[450px] rounded-[5px]'>
                        <img className='rounded-tl-[5px] rounded-bl-[5px]' src={limited_offer_x} alt="enchante_products" />
                    </div>
                    <div className='text-white pt-7 px-6'>
                        <h5 className='text-textGray'>LIMITED OFFER</h5>
                        <h1 className='py-4 font-semibold montserrat text-[30px] opacity-90'>Enjoy <span className='text-orangeSkin'>30%</span> discount and receive an exclusive gift offer.</h1>
                        <Link to={'/products'}><button className='bg-textGray text-black py-2 px-4 rounded-[5px] font-semibold'>Don't miss out!</button></Link>
                    </div>
                </div>
                <div className='text-center pt-[60px] pb-[30px]'>
                    <h1 className='opacity-90 font-semibold text-[24px] montserrat'>Subscribe to our newletter to get updates <br /> to our lastest collections</h1>
                    <p className='text-btnGray pt-4 text-[14px]'>Get 20% off on your first order by just subscribing to our newletter</p>
                    <div>
                        <div>
                            <Envelope  />
                            <input type="email" placeholder='Enter your email' />
                        </div>
                        <button className='py-2 px-4 bg-[#202122] text-white rounded-[5px]'>Subscribe</button>
                    </div>
                    <div className='text-textGray text-center text-[14px]'>
                        <p>You will be able to unsubscribe at any time. <br /> Read our privacy Policy <a href="#"><span className='font-bold underline text-black'>here</span></a></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter