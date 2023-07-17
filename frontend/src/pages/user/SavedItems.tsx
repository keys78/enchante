import { useAppDispatch, useAppSelector } from '../../network/hooks'
import Pagination from '../../components/pagination/Pagination';
import { useEffect, useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { getUser } from '../../reducers/private/user/userSlice';
import { characterLimit } from '../../utils/general';
import { toggleSavedProducts } from '../../reducers/products/productsSlice';


const SavedItems = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)
  const [filteredSearch, setFilteredSearch] = useState(user?.savedItems)
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

  const toggleSavedItems = (val) => {
    dispatch(toggleSavedProducts({ productId: val?._id }));
    setTimeout(() => {
      dispatch(getUser())
    }, 3000)
  }



  return (
    <>
      <div className='mb-2'>

        <div className='s-767:w-3/12 w-full ml-auto s-480:mb-0 mb-3'>
          {/* <div className='flex space-x-2 border items-center rounded-[5px] px-2 w-full'>
            <MagnifyingGlass size={20} color="#9e9e9e" />
            <input
              value={searchTerm}
              onChange={handleInputChange}
              className='w-full rounded-[5px] py-1 border-0 outline-none' type="search" placeholder='filter search products' />
          </div> */}
        </div>
      </div>

      {filteredSearch.length > 0 ? (
        <>
          <div className='overflow-x-auto'>
            <table className='pb-[200px]'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSearch?.map((val) =>
                  <>
                    <tr>
                      <td className='min-w-[100px]'><img className='w-[100px] !h-[50px] rounded border border-gray-200' src={val?.image} alt="" /></td>
                      <td className='min-w-[150px]'>{characterLimit(val?.name, 20)}</td>
                      <td className='min-w-[150px]'>{characterLimit(val?.category, 30)}</td>
                      <td className='min-w-[100px]'>${val?.price}</td>
                      <td className='min-w-[150px]'>{new Date(val?.createdAt).toLocaleDateString() ?? 'Date'}</td>
                      <td className='relative cursor-pointer' onClick={() => toggleSavedItems(val)}>
                        {<div className='text-orangeSkin underline cursor-pointer s-767:text-[16px] text-[12px] s-767:pl-0 pl-2 py-2'> Remove </div>}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className='s-480:pt-[100px] pt-[50px] s-480:pb-0 pb-[50px] '>
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            /> */}
          </div>
        </>
      ) : (
        <p className='flex items-center justify-center h-[300px] text-center'>Hi {user?.username}, you have no saved item(s) <br /> Click on the love icon on any product to add. </p>
      )}
    </>
  )
}

export default SavedItems;