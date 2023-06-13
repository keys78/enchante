import React, { useEffect, useCallback, useState } from "react";

interface CardItem {
  id: number;
  title: string;
  copy: string;
}

const cardItems: CardItem[] = [
  {
    id: 1,
    title: "Stacked Card Carousel",
    copy:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla. Etiam sed interdum est."
  },
  {
    id: 2,
    title: "Second Item",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 3,
    title: "A Third Card",
    copy:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla."
  },
  {
    id: 4,
    title: "Fourth",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

interface Indexes {
  previousIndex: number;
  currentIndex: number;
  nextIndex: number;
}

function determineClasses(indexes: Indexes, cardIndex: number): string {
  if (indexes.currentIndex === cardIndex) {
    return "active";
  } else if (indexes.nextIndex === cardIndex) {
    return "next";
  } else if (indexes.previousIndex === cardIndex) {
    return "prev";
  }
  return "inactive";
}

const CardCarousel: React.FC = () => {
  const [indexes, setIndexes] = useState<Indexes>({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });

  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2
      }));
    }
  }, [indexes.currentIndex]);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleCardTransition();
    }, 4000);

    return () => clearInterval(transitionInterval);
  }, [handleCardTransition, indexes]);

  return (
    <div className="container">
      <ul className="card-carousel">
        {cardItems.map((card, index) => (
          <li
            key={card.id}
            className={`card ${determineClasses(indexes, index)}`}
          >
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;













import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import { Product } from '../../types';
import { filterProductsByPrice } from '../../reducers/products/productsSlice';

const RangeSlider: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state: RootState) => state.products);
    const [priceRange, setPriceRange] = useState({ min: 0, max: getMaxPrice() });

    useEffect(() => {
        const sliderInput = document.getElementById('slider_input') as HTMLInputElement;
        const sliderThumb = document.getElementById('slider_thumb');
        const sliderLine = document.getElementById('slider_line');

        const showSliderValue = () => {
            if (sliderThumb && sliderInput && sliderLine) {
                sliderThumb.innerHTML = sliderInput.value;
                const bulletPosition = parseFloat(sliderInput.value) / parseFloat(sliderInput.max);
                const space = sliderInput.offsetWidth - sliderThumb.offsetWidth;

                sliderThumb.style.left = `${bulletPosition * space}px`;
                sliderLine.style.width = `${sliderInput.value}%`;
            }
        };

        showSliderValue();

        const handleResize = () => {
            showSliderValue();
        };

        window.addEventListener('resize', handleResize);
        sliderInput.addEventListener('input', showSliderValue, false);

        return () => {
            window.removeEventListener('resize', handleResize);
            sliderInput.removeEventListener('input', showSliderValue);
        };
    }, []);

    function getMaxPrice(): number {
        let maxPrice = 0;
        products.forEach((product: Product) => {
            if (product.price > maxPrice) { maxPrice = product.price; }
        });
        return maxPrice;
    }

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxPrice = parseInt(e.target.value);
        setPriceRange((prevRange) => ({ ...prevRange, max: maxPrice }));
        dispatch(filterProductsByPrice({ priceRange: { min: 0, max: maxPrice } }));
    };


    return (
        <div className="range-slider">
            <div id="slider_thumb" className="range-slider_thumb"></div>
            <div className="range-slider_line">
                <div id="slider_line" className="range-slider_line-fill"></div>
            </div>
            <input
                type="range"
                min="0"
                max={getMaxPrice().toString()}
                value={priceRange.max.toString()}
                onChange={handlePriceRangeChange}
            />
        </div>
    );
};

export default RangeSlider;