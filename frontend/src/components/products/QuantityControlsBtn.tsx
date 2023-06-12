import React, { MouseEventHandler, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  className: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const QuantityControlsBtn: React.FC<Props> = ({ className, children, onClick, disabled = false }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <motion.button
      key={className}
      whileTap={{ scale: 1.05 }}
      className={`${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default QuantityControlsBtn;
