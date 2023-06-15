import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../network/hooks';
import { filterProductsByCategory } from '../../reducers/products/productsSlice';

type Option = {
  label: string;
  value: string;
};

type FilterSearchProps = {
  options: Option[];
};

const FilterSearch: React.FC<FilterSearchProps> = ({ options }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "all",
  });

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
    // handleFilterClick('category', option.label)
    dispatch(filterProductsByCategory({category: option.label.toLowerCase()}))
    console.log(option.label)
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleFilterClick = (filterType: 'category', filterValue: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: filterValue,
    }));

    switch (filterType) {
      case 'category':
        dispatch(filterProductsByCategory({ category: filterValue }));
        break;
      default:
        break;
    }
  };

  const renderOptions = () => {
    if (filteredOptions.length === 0) {
      return <li className="search-not-found">Search not found</li>;
    }

    return filteredOptions.map((option) => (
      <Link to={`/products/?${option.value}`} onClick={() => handleOptionClick(option)} key={option.value}>
        <li >{option.label}</li>
      </Link>
    ));
  };

  return (
    <div ref={searchContainerRef} className="filter-search">
      <div className="flex items-center rounded-[5px] bg-[#fafafa] cursor-pointer">
        <input
          type="text"
          placeholder="Search..."
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
