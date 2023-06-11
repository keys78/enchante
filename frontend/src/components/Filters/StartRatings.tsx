import { Star } from '@phosphor-icons/react';
import { filterByStarNumberOfRatings } from '../../reducers/products/productsSlice'
import { useAppDispatch } from '../../network/hooks';

interface StartRatingsProps {
    selectedRating: any,
    setSelectedRating: any
}

const StartRatings = ({ selectedRating, setSelectedRating }: StartRatingsProps) => {
    const dispatch = useAppDispatch();

    const starRatings = [
        { value: 5, filledStars: 5, emptyStars: 0 },
        { value: 4, filledStars: 4, emptyStars: 1 },
        { value: 3, filledStars: 3, emptyStars: 2 },
        { value: 2, filledStars: 2, emptyStars: 3 },
        { value: 1, filledStars: 1, emptyStars: 4 },
    ];

    const handleRatingChange = (rating: number) => {
        setSelectedRating(rating);
        dispatch(filterByStarNumberOfRatings({ starNumberOfRatings: rating }));
    };

    return (
        <div>
            <h2>Filter by Star Ratings</h2>
            {starRatings.map((rating) => (
                <div className='flex space-x-3' key={rating.value}>
                    <input
                        type="radio"
                        id={`rating${rating.value}`}
                        name="starRating"
                        value={rating.value}
                        checked={selectedRating === rating.value}
                        onChange={() => handleRatingChange(rating.value)}
                    />
                    <label htmlFor={`rating${rating.value}`}>
                        <div className='flex'>
                            {Array(rating.filledStars).fill(
                                <Star size={20} color="#f75a2c" weight="fill" />
                            )}
                            {Array(rating.emptyStars).fill(
                                <Star size={20} color="#d4d4d4" weight="fill" />
                            )}
                        </div>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default StartRatings