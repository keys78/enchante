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
                sliderThumb.innerHTML = `$${sliderInput.value}`;

                const maxPrice = getMaxPrice();
                const value = Math.min(parseFloat(sliderInput.value), maxPrice);

                const bulletPosition = value / parseFloat(sliderInput.max);
                const space = sliderInput.offsetWidth - sliderThumb.offsetWidth;

                sliderThumb.style.left = `${bulletPosition * space}px`;
                sliderLine.style.width = `${(value / maxPrice) * 100}%`;
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
    }, [getMaxPrice]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function getMaxPrice(): number {
        let maxPrice = 0;
        products.forEach((product: Product) => {
            if (product.price > maxPrice) {
                maxPrice = product.price;
            }
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
                id="slider_input"
                className="range-slider_input"
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
