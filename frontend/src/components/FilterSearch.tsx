import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Option = {
  label: string;
  value: string;
};

type FilterSearchProps = {
  options: Option[];
};

const FilterSearch: React.FC<FilterSearchProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

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
  };

  return (
    <div className="filter-search">
      <input
        type="text"
        placeholder="Search..."
        onClick={handleInputClick}
        value={searchValue}
        onChange={handleInputChange}
        className='bg-gray-600 text-white'
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map((option) => (
            <Link to={'/products'}>
                <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterSearch;
