import { CaretRight } from "@phosphor-icons/react";
import React, { useState } from "react";

type FilterProps = {
  title: string;
  selectedFilter: string;
  options: string[];
  handleFilterClick: (value: string) => void;
};

const ToggleFilters: React.FC<FilterProps> = ({ title, selectedFilter, options, handleFilterClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const caretStyle = {
    transform: isOpen ? "rotate(90deg)" : "rotate(0)",
    transition: "transform 0.3s ease-in-out",
  };

  const optionsStyle: React.CSSProperties = {
    maxHeight: isOpen ? `${options.length * 50}px` : "0",
    overflow: "hidden",
    overflowY: "auto",
    transition: "max-height 0.3s ease-in-out",
  };

  return (
    <div className="pb-1">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between rounded-[5px] px-3 py-2 bg-gray-50 font-medium cursor-pointer"
      >
        <h1>{title}</h1>
        <CaretRight size={14} color="#141414" style={caretStyle} weight="bold" />
      </div>
      <ul className="filter-options-list" style={optionsStyle}>
        <li
          className={
            selectedFilter === "all"
              ? "active-hero-text pl-2"
              : "pl-2 active-hero-text-before cursor-pointer py-2"
          }
          onClick={() => handleFilterClick("all")}
        >
          All
        </li>
        {options.map((option) => (
          <li
            key={option}
            className={
              selectedFilter === option
                ? "active-hero-text pl-2"
                : "pl-2 active-hero-text-before cursor-pointer py-2"
            }
            onClick={() => handleFilterClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToggleFilters;
