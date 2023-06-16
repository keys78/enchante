import React, { useState } from 'react';
import sample_2 from '../../assets/png/img_two.jpg';
import sample_3 from '../../assets/png/img_s_xx.jpg';
import sample_4 from '../../assets/png/img_ss_x.jpg';
import sample_5 from '../../assets/png/img_s_2.jpg';
import { Product } from '../../types';

interface Props {
  imgArr: Product;
}

const ThumbnailsGallery = ({ imgArr }: Props) => {
  const [currentView, setCurrentView] = useState(imgArr.image);
  const thumbnails = [imgArr.image, sample_2, sample_3, sample_4, sample_5];
  const lastIndex = thumbnails.length - 1;

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
      <div className='flex'>
        <div className='prev h-[23px] w-[24px] rounded-[5px] bg-black text-white' onClick={handlePrevClick}>{'<'}</div>
        <div className='next h-[23px] w-[24px] rounded-[5px] bg-black text-white' onClick={handleNextClick}>{'>'}</div>
      </div>
      <div className="slide-container">
        {thumbnails.map((thumbnail, index) => (
          <div
            className={`thumbnail ${thumbnail === currentView ? 'active' : ''}`}
            key={index}
            onClick={() => setCurrentView(thumbnail)}
          >
            <img className="w-[150px] rounded-[5px]" src={thumbnail} alt="Thumbnail" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailsGallery;
