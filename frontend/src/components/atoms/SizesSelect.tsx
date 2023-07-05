const SizesSelect = ({ sizeArr, props }) => {
    return (
        <div className="pt-6 pb-12">
            <h3 className="text-[14px] pb-2">Select available sizes</h3>
            <div className='flex items-center space-x-5'>
                {sizeArr.map((val: any) => {
                    const isSelected = props.values.sizes.includes(val as never);

                    const handleClick = () => {
                        const { sizes } = props.values;
                        const positionMap = { S: 0, M: 1, L: 2, XL: 3, XXL: 4 };
                        const clickedIndex = sizes.indexOf(val as never);
                        const currentSize = sizes[clickedIndex];

                        if (clickedIndex !== -1) {
                            // Size already exists in the array, will remove it
                            const updatedSizes = sizes.filter((_, index) => index !== clickedIndex);
                            props.setFieldValue('sizes', updatedSizes);
                        } else {
                            // Size doesn't exist in the array, lets add it at the appropriate position
                            const position = positionMap[val];
                            const updatedSizes = [...sizes];
                            if (position < sizes.length && sizes[position] !== undefined) {
                                updatedSizes.splice(position, 0, val as never);
                            } else {
                                updatedSizes.push(val as never);
                            }
                            if (currentSize !== undefined) {
                                const currentSizeIndex = updatedSizes.indexOf(currentSize);
                                updatedSizes.splice(currentSizeIndex, 1);
                            }
                            props.setFieldValue('sizes', updatedSizes);
                        }
                    };
                    return (
                        <div
                            key={val}
                            onClick={handleClick}
                            className={`border border-black text-center flex items-center justify-center cursor-pointer rounded-[5px] h-[32px] w-[32px] ${isSelected && 'bg-black text-white'} `}
                        >
                            {val}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default SizesSelect