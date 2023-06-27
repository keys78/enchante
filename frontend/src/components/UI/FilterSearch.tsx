import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


type Option = {
  label: string;
  value: string;
  icon: any;
};

type FilterSearchProps = {
  options: Option[];
};

const FilterSearch: React.FC<FilterSearchProps> = ({ options }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const searchContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: Option) => {
    setSearchValue(option.label);
    setIsOpen(false);
    const queryParams = new URLSearchParams({ q: option.label });
    navigate(`/catalog/?${queryParams.toString()}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  const renderOptions = () => {
    if (filteredOptions.length === 0) {
      return <li className="search-not-found">Search not found</li>;
    }

    return filteredOptions.map((option) => (
      <div onClick={() => handleOptionClick(option)} key={option.value}>
       <li className='flex items-center'>{option.icon} &nbsp; {option.label}</li>
      </div>
    ));
  };

  return (
    <div ref={searchContainerRef} className="filter-search">
      <div className="flex items-center rounded-[5px] bg-[#fafafa] cursor-pointer">
        <input
          type="text"
          placeholder="Quick Search..."
          onClick={handleInputClick}
          value={searchValue}
          onChange={handleInputChange}
          className={`bg-gray-600 text-white ${isOpen ? 'expanded' : ''}`}
        />
        <MagnifyingGlass onClick={handleInputClick} className="mx-2" size={22} color="#070707" weight="thin" />
      </div>
      {isOpen && (
        <ul className="options-list">
          {renderOptions()}
        </ul>
      )}
    </div>
  );
};

export default FilterSearch;
// setShowSearchBar: (arg0: boolean) => void,
