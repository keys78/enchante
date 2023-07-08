import { Info } from '@phosphor-icons/react';
import { useState } from 'react';

interface IProps {
    message: string
}

const Tooltip = ({message}: IProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInfoClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className='relative'>
        <Info onClick={handleInfoClick} style={{ cursor: 'pointer' }} size={17} color="#f75a2c" />
      {showTooltip && (
        <div className='s-480:p-4 p-2 rounded-[5px] bg-white shadow absolute w-[300px] -top-20 right-0 s-480:text-[16px] text-[12px]'>
          { message }
        </div>
      )}
    </div>
  );
};

export default Tooltip;
