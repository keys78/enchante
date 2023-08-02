import { useState, useEffect } from 'react';
import sample_2 from '../../assets/png/img_two.jpg';
import sample_3 from '../../assets/png/img_s_xx.jpg';
import sample_4 from '../../assets/png/img_ss_x.jpg';
import sample_5 from '../../assets/png/img_s_2.jpg';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface Props {
  currentImage: string;
}

const ThumbnailsGallery = ({ currentImage }: Props) => {
  const [currentView, setCurrentView] = useState(currentImage);
  const [slideAnimation, setSlideAnimation] = useState('');

  const thumbnails = [currentImage, sample_2, sample_3, sample_4, sample_5];
  const lastIndex = thumbnails.length - 1;

  useEffect(() => {
    // Update the currentView whenever the currentImage prop changes
    setCurrentView(currentImage);
  }, [currentImage]);

  useEffect(() => {
    setSlideAnimation('slide-in');
    const timeout = setTimeout(() => {
      setSlideAnimation('');
    }, 300);

    return () => clearTimeout(timeout);
  }, [currentView]);

  const handlePrevClick = () => {
    const currentIndex = thumbnails.indexOf(currentView);
    const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentView(thumbnails[newIndex]);
  };

  const handleNextClick = () => {
    const currentIndex = thumbnails.indexOf(currentView);
    const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentView(thumbnails[newIndex]);
  };



  return (
    <div>
      <div className='relative w-full overflow-x-hidden'>
        <img className={`w-full s-767:h-[400px] h-auto rounded-[5px] ${slideAnimation}`} src={currentView} alt="Current View" />
        <div className='absolute w-full top-0'>
          <div className='w-full s-767:h-[400px] h-auto flex items-center justify-center'>
            <div className='w-full flex items-center justify-between px-4 s-767:mt-0 mt-[110px]'>
              <div className='prev cursor-pointer h-[26px] w-[26px] rounded-[5px] bg-[#f75a2c] flex items-center justify-center' onClick={handlePrevClick}>
                <CaretLeft size={20} color="#f1f1f1" weight='bold' />
              </div>
              <div className='next cursor-pointer h-[26px] w-[26px] rounded-[5px] bg-[#f75a2c] flex items-center justify-center' onClick={handleNextClick}>
                <CaretRight size={20} color="#f1f1f1" weight='bold' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex s-767:space-x-4 space-x-[3px] mt-3'>
        {thumbnails.map((thumbnail, index) => (
          <div
            className={`cursor-pointer rounded-[5px] w-[150px] ${thumbnail === currentView ? 'border-2 border-orangeSkin' : 'border-2 border-white'}`}
            key={index}
            onClick={() => setCurrentView(thumbnail)}
          >
            <img className=" rounded-[5px]" src={thumbnail} alt="Thumbnail" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailsGallery;
