/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { RootState } from '../../network/store';
import { Product } from '../../types';
import { filterProductsByPrice } from '../../reducers/products/productsSlice';
import { CaretRight } from '@phosphor-icons/react';

type RangerProps = {
    priceRange: any;
    setPriceRange: any;
};

const RangeSlider: React.FC<RangerProps> = ({ priceRange, setPriceRange }) => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state: RootState) => state.products);
    const [isOpen, setIsOpen] = useState(false);
    const sliderInputRef = useRef<HTMLInputElement>(null);
    const sliderThumbRef = useRef<HTMLDivElement>(null);
    const sliderLineRef = useRef<HTMLDivElement>(null);

    const caretStyle = {
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
        transition: 'transform 0.3s ease-in-out',
    };

    useEffect(() => {
        const showSliderValue = () => {
            const sliderInput = sliderInputRef.current;
            const sliderThumb = sliderThumbRef.current;
            const sliderLine = sliderLineRef.current;

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
        sliderInputRef.current?.addEventListener('input', showSliderValue, false);

        return () => {
            window.removeEventListener('resize', handleResize);
            sliderInputRef.current?.removeEventListener('input', showSliderValue);
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
        <div className="pb-2 -mt-6">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between rounded-[5px] px-3 py-2 bg-gray-50 font-medium cursor-pointer"
            >
                <h1>Price</h1>
                <CaretRight size={14} color="#141414" style={caretStyle} weight="bold" />
            </div>
            {isOpen &&
                <div className="range-slider filter-options-list border border-black my-6 ">
                    <div ref={sliderThumbRef} className="range-slider_thumb"></div>
                    <div className="range-slider_line">
                        <div ref={sliderLineRef} className="range-slider_line-fill"></div>
                    </div>
                    <input
                        ref={sliderInputRef}
                        className="range-slider_input"
                        type="range"
                        min="0"
                        max={getMaxPrice().toString()}
                        value={priceRange.max.toString()}
                        onChange={handlePriceRangeChange}
                    />
                </div>
            }
        </div>
    );
};

export default RangeSlider;
