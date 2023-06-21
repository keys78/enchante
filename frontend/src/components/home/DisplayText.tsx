import { AngularLogo, CoatHanger, FlowerLotus } from '@phosphor-icons/react'


const DisplayText = () => {
    return (
        <section className='s-1025:pb-[250px] s-767:pb-[100px] pb-[50px] s-1220:pt-[200px] s-767:pt-[60px]'>
            <div className=' mx-auto s-1025:px-[80px] s-767:px-[40px] px-[16px]'>
                <h1 className="s-767:text-[42px] s-480:text-[32px] text-[24px] font-nunitosans font-bold leading-tight s-767:pb-[50px] pb-[10px] s-767:text-left text-center">All your fashion <br /> needs all in one place.</h1>
                <div className='s-767:flex s-767:space-x-8 s-767:pt-0 pt-[20px] s-767:text-left text-center '>
                    <div className='s-767:max-w-[100%] s-480:max-w-[400px] max-w-[320px] s-767:mb-0 mb-[30px] s-767"text-[16px] text-[14px] w-full mx-auto'>
                        <div className='p-3 w-[60px] bg-[#f4f4f4] s-767:mx-0 mx-auto rounded-md'><AngularLogo size={34} color="#000" /></div>
                        <h3 className='s-767:text-[18px] text-[16px] s-767:pb-1 s-767:pt-4 pt-2 font-medium'>Superior Quality</h3>
                        <p className='text-textGray s-767:text-[16px] text-[14px]'>Unparalleled excellence, surpassing standards, delivering utmost quality and unmatched superiority.</p>
                    </div>
                    <div className='s-767:max-w-[100%] s-480:max-w-[400px] max-w-[320px] s-767:mb-0 mb-[30px] s-767"text-[16px] text-[14px] w-full mx-auto'>
                        <div className='p-3 w-[60px] bg-[#f4f4f4] s-767:mx-0 mx-auto rounded-md'><FlowerLotus size={34} color="#000" /></div>
                        <h3 className='s-767:text-[18px] text-[16px] s-767:pb-1 s-767:pt-4 pt-2 font-medium'>Elevated Craftsmanship</h3>
                        <p className='text-textGray s-767:text-[16px] text-[14px]'>Exquisite attention to detail, meticulous artistry, and unparalleled craftsmanship that redefine luxury and elevate your style.</p>
                    </div>
                    <div className='s-767:max-w-[100%] s-480:max-w-[400px] max-w-[320px] s-767:mb-0 mb-[30px] s-767"text-[16px] text-[14px] w-full mx-auto'>
                        <div className='p-3 w-[60px] bg-[#f4f4f4] s-767:mx-0 mx-auto rounded-md'><CoatHanger  size={34} color="#000" /></div>
                        <h3 className='s-767:text-[18px] text-[16px] s-767:pb-1 s-767:pt-4 pt-2 font-medium'>Refined Sophistication</h3>
                        <p className='text-textGray s-767:text-[16px] text-[14px]'>Embrace refined sophistication with our meticulously curated collection, showcasing elegance, grace, and timeless style for the discerning fashion connoisseur.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default DisplayText;