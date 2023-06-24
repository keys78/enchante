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
  const [isColorGroup] = useState(true)

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
    <div className="pb-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between rounded-[5px] px-3 py-2 bg-gray-50 font-medium cursor-pointer"
      >
        <h1>{title}</h1>
        <CaretRight size={14} color="#141414" style={caretStyle} weight="bold" />
      </div>
      <ul className="filter-options-list mt-1" style={optionsStyle}>
        <li
          className={`pl-2 ${selectedFilter === "all" ? "active-hero-text" : "active-hero-text-before cursor-pointer my-2"}`}
          onClick={() => handleFilterClick("all")}
        >
          All
        </li>
        {options.map(option => (
          <li
            key={option}
            className={`pl-2 capitalize pb-1 pt-2 hover:bg-gray-100 ${selectedFilter === option ? "active-hero-text" : "active-hero-text-before cursor-pointer my-2"}`}
            onClick={() => handleFilterClick(option)}
          >
            {isColorGroup && selectedFilter !== option ? (
              <div className="grid grid-cols-2">
                <span>{option}</span>
                {isColorGroup && option === "white" ? (
                  <div style={{ border: `2px solid ${'#000'}` }} className="h-[20px] w-[20px] rounded-[100%] flex items-center justify-center">
                  <div style={{ background: `${'#fbfbfb'}` }} className="h-[12px] w-[12px] rounded-[100%]"></div>
                </div>
                ) : (
                  <div style={{ border: `2px solid ${option}` }} className="h-[20px] w-[20px] rounded-[100%] flex items-center justify-center">
                  <div style={{ background: `${option}` }} className="h-[12px] w-[12px] rounded-[100%]"></div>
                </div>
                )
              }
              </div>
            ) : (
              option
            )}
          </li>

        ))}
      </ul>

    </div >
  );
};

export default ToggleFilters;
