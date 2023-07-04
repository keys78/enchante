import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../network/hooks'
import ProductFrame from '../../components/products/ProductFrame';
import Pagination from '../../components/pagination/Pagination';
import { Product } from '../../types';
import { useEffect, useState } from 'react';
import { ListDashes, MagnifyingGlass, SquaresFour } from '@phosphor-icons/react';
import useWindowSize from '../../components/hooks/useWindowSize';
import { getUser } from '../../reducers/private/user/userSlice';


const SavedItems = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)
  const { width } = useWindowSize();
  const [filteredSearch, setFilteredSearch] = useState(user?.savedItems)
  const [isFlexDisplay, setIsFlexDisplay] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productPerPage] = useState<number>(9)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const totalPages = Math.ceil(filteredSearch.length / productPerPage);


  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    setFilteredSearch(user?.savedItems ?? []);
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem('savedItems', JSON.stringify(filteredSearch));
  }, [filteredSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    setFilteredSearch(value === '' ? user?.savedItems : user?.savedItems?.filter(val => Object.values(val).join("").toLocaleLowerCase().includes(value)));
  };




  return (
    <>
      <div className='flex s-480:flex-row flex-col-reverse s-480:items-center s-480:space-x-10 w-full s-480:mb-3 mb-5'>
        <div className='whitespace-nowrap flex items-center s-480:space-x-4 space-x-3'>
          <SquaresFour className='cursor-pointer' onClick={() => setIsFlexDisplay(false)} size={width < 767 ? 22 : 30} color={`${isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
          <ListDashes className='cursor-pointer' onClick={() => setIsFlexDisplay(true)} size={width < 767 ? 22 : 30} color={`${!isFlexDisplay ? "" : '#f75a2c'}`} weight="fill" />
          <div><span className='font-medium s-480:text-[20px] text-[16px]'>{filteredSearch.length}
          </span> result{filteredSearch.length === 1 ? '' : 's'}</div>
        </div>

        <div className='s-767:w-8/12 w-full mx-auto s-480:mb-0 mb-3'>
          <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
            <MagnifyingGlass size={20} color="#9e9e9e" />
            <input
              value={searchTerm}
              onChange={handleInputChange}
              className='w-full rounded-[5px] py-2 border-0 outline-none' type="search" placeholder='filter search products' />
          </div>
        </div>
      </div>

      {filteredSearch.length > 0 ? (
        <>
          <div className={`${!isFlexDisplay && 'grid s-1024:grid-cols-3 grid-cols-2 s-480:gap-x-[16px] gap-x-[8px] s-480:gap-y-[34px] gap-y-[16px]'} `}>
            {filteredSearch.map((product: Product, i: number) =>
              <div className={`relative w-full p-1 rounded-[5px] ${!isFlexDisplay && 's-480:bg-white bg-gray-50'}`}>
                <AnimatePresence>
                  <ProductFrame
                    product={product}
                    showControls={false}
                    showSavedToggle={true}
                    key={i}
                    isFlexDisplay={isFlexDisplay}
                    price_font_size='s-480:text-[18px] text-[16px] font-bold'
                    discount_font_size={'text-[12px]'}
                    shop_button={'p-[4px]'}
                    icon_size={18}
                  />
                </AnimatePresence>
              </div>
            )}
          </div>
          <div className='s-480:pt-[100px] pt-[50px] s-480:pb-0 pb-[50px] '>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <p className='flex items-center justify-center h-[300px] text-center'>Hi {user?.username}, you have no saved item(s) <br /> Click on the love icon on any product to add. </p>
      )}
    </>
  )
}

export default SavedItems;