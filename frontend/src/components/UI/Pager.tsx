import React from "react";
import { motion } from "framer-motion";

interface IProps {
  value: number;
  children: any
}

export function Pager({ children, value }: IProps) {
  return (
    <motion.div className="page-cont">
      <motion.div className="anime-page"
        transition={{
          tension: 190,
          friction: 70,
          mass: 0.4
        }}
        initial={false}
        animate={{ x: value * -100 + "%" }}
      >
        {React.Children.map(children, (child) => (
          <motion.div className="pagoo"
            key={child.id}
            aria-hidden={value !== child.id}
            tabIndex={value === child.id ? 0 : -1}
          >
            {child}
          </motion.div>
        ))}

      </motion.div>
    </motion.div>
  );
}
