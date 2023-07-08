import React, { ReactNode } from 'react';
import { useFormikContext } from 'formik';

interface SizesSelectProps {
  sizeArr: string[];
}

const SizesSelect: React.FC<SizesSelectProps> = ({ sizeArr }) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();

  const positionMap = { S: 0, M: 1, L: 2, XL: 3, XXL: 4 };

  const handleClick = (val: string) => {
    const { sizes } = values;
    const clickedIndex = sizes.indexOf(val);
    const currentSize = sizes[clickedIndex];

    if (clickedIndex !== -1) {
      // Size already exists in the array, will remove it
      const updatedSizes = sizes.filter((_, index) => index !== clickedIndex);
      setFieldValue('sizes', updatedSizes);
    } else {
      // Size doesn't exist in the array, let's add it at the appropriate position
      const position = positionMap[val];
      const updatedSizes = [...sizes];
      const currentIndex = updatedSizes.findIndex((size) => positionMap[size] > position);

      if (currentIndex !== -1) {
        updatedSizes.splice(currentIndex, 0, val);
      } else {
        updatedSizes.push(val);
      }

      if (currentSize !== undefined) {
        const currentSizeIndex = updatedSizes.indexOf(currentSize);
        updatedSizes.splice(currentSizeIndex, 1);
      }

      setFieldValue('sizes', updatedSizes);
    }
  };

  const isSizesTouched = touched.sizes;
  const sizesError = errors.sizes;

  return (
    <div className="pt-6 s-480:pb-12 pb-6">
      <h3 className="text-[14px] pb-2">Select available sizes</h3>
      <div className="flex items-center space-x-5">
        {sizeArr.map((val) => {
          const isSelected = values.sizes.includes(val);

          return (
            <div
              key={val}
              onClick={() => handleClick(val)}
              className={`s-480:text-[16px] text-[14px] border border-black text-center flex items-center justify-center cursor-pointer rounded-[5px] s-480:h-[32px] h-[24px] s-480:w-[32px] w-[28px] ${
                isSelected && 'bg-black text-white'
              } ${isSizesTouched && sizesError ? 'border-red-500' : ''}`}
            >
              {val}
            </div>
          );
        })}
      </div>
      {isSizesTouched && sizesError && (
        <div className="text-red-500 mt-2 text-[12px]">{sizesError as ReactNode}</div>
      )}
    </div>
  );
};

export default SizesSelect;
