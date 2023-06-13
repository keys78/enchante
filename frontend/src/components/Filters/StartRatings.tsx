import { useState } from 'react';
import { CaretRight, Star } from '@phosphor-icons/react';
import { filterByStarNumberOfRatings } from '../../reducers/products/productsSlice';
import { useAppDispatch } from '../../network/hooks';

interface StartRatingsProps {
  selectedRating: number | null;
  setSelectedRating: (rating: number) => void;
}

const StartRatings = ({ selectedRating, setSelectedRating }: StartRatingsProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const starRatings = [
    { value: 5, filledStars: 5, emptyStars: 0 },
    { value: 4, filledStars: 4, emptyStars: 1 },
    { value: 3, filledStars: 3, emptyStars: 2 },
    { value: 2, filledStars: 2, emptyStars: 3 },
    { value: 1, filledStars: 1, emptyStars: 4 },
  ];

  const caretStyle: React.CSSProperties = {
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
    transition: 'transform 0.3s ease-in-out',
  };

  const optionsStyle: React.CSSProperties = {
    maxHeight: isOpen ? `${starRatings.length * 35}px` : '0',
    overflow: 'hidden',
    overflowY: 'auto',
    transition: 'max-height 0.3s ease-in-out',
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    dispatch(filterByStarNumberOfRatings({ starNumberOfRatings: rating }));
  };

  return (
    <div className="pb-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between rounded-[5px] px-3 py-2 bg-gray-50 font-medium cursor-pointer"
      >
        <h2>Star Ratings</h2>
        <CaretRight size={14} color="#141414" style={caretStyle} weight="bold" />
      </div>
      <div className='filter-options-list py-3' style={optionsStyle}>
        {isOpen &&
          starRatings.map((rating) => (
            <div className="flex space-x-3 px-3 mb-[10px]" key={rating.value}>
             
              <label htmlFor={`rating${rating.value}`}>
                <div className="flex space-x-1">
                  {Array(rating.filledStars).fill(
                    <Star size={18} color="#f75a2c" weight="regular" />
                  )}
                  {Array(rating.emptyStars).fill(
                    <Star size={18} color="#d4d4d4" weight="regular" />
                  )}
                </div>
              </label>
              <input
                type="radio"
                id={`rating${rating.value}`}
                name="starRating"
                value={rating.value}
                checked={selectedRating === rating.value}
                onChange={() => handleRatingChange(rating.value)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default StartRatings;
