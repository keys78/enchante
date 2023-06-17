import { AngularLogo } from '@phosphor-icons/react'


const DisplayText = () => {
    return (
        <section className='pb-[250px]'>
            <div className=' mx-auto px-[80px]'>
                <h1 className="text-[42px] font-nunitosans font-bold leading-tight pb-12">All your fashion <br /> needs all in one place.</h1>
                <div className='flex space-x-8'>
                    <div>
                        <div className='p-3 w-[60px] bg-[#f4f4f4] rounded-md'><AngularLogo size={34} color="#000" /></div>
                        <h3 className='text-[18px] pb-1 pt-4 font-medium'>Superior Quality</h3>
                        <p className='text-textGray'>Unparalleled excellence, surpassing standards, delivering utmost quality and unmatched superiority.</p>
                    </div>
                    <div>
                        <div className='p-3 w-[60px] bg-[#f4f4f4] rounded-md'><AngularLogo size={34} color="#000" /></div>
                        <h3 className='text-[18px] pb-1 pt-4 font-medium'>Superior Quality</h3>
                        <p className='text-textGray'>Unparalleled excellence, surpassing standards, delivering utmost quality and unmatched superiority.</p>
                    </div>
                    <div>
                        <div className='p-3 w-[60px] bg-[#f4f4f4] rounded-md'><AngularLogo size={34} color="#000" /></div>
                        <h3 className='text-[18px] pb-1 pt-4 font-medium'>Superior Quality</h3>
                        <p className='text-textGray'>Unparalleled excellence, surpassing standards, delivering utmost quality and unmatched superiority.</p>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default DisplayText