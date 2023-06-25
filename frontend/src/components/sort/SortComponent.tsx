import { useState } from 'react'
import { useAppDispatch } from '../../network/hooks';
import { sortByHighestPrice, sortByLowestPrice, sortByNameAZ, sortByNameZA } from '../../reducers/products/productsSlice';

const SortComponent = () => {
  const dispatch = useAppDispatch();
  const [currentSelection, setCurrentSelection] = useState("Select order....")


  const handleSelectionChange = (selectedValue) => {
    switch (selectedValue) {
      case 'Price (Lowest)':
        dispatch(sortByLowestPrice());
        break;
      case 'Price (Highest)':
        dispatch(sortByHighestPrice());
        break;
      case 'Name (A - Z)':
        dispatch(sortByNameAZ());
        break;
      case 'Name (Z - A)':
        dispatch(sortByNameZA());
        break;
      default:
        break;
    }
  };


  return (
    <select
      value={currentSelection}
      onChange={(e) => {
        setCurrentSelection(e.target.value);
        handleSelectionChange(e.target.value);
      }}
      className="border border-gray-500 rounded p-2 text-sm cursor-pointer outline-none "
    >
      <option disabled value="Select Order">Select Order...</option>
      <option value="Price (Lowest)">Price (Lowest)</option>
      <option value="Price (Highest)">Price (Highest)</option>
      <option value="Name (A - Z)">Name (A - Z)</option>
      <option value="Name (Z - A)">Name (Z - A)</option>
    </select>
  )
}

export default SortComponent