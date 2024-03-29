import { useAppDispatch, useAppSelector } from '../../network/hooks'
import { getUser } from '../../reducers/private/user/userSlice';
import { characterLimit } from '../../utils/general';
import { toggleSavedProducts } from '../../reducers/products/productsSlice';
import { Product } from '../../types';


const SavedItems = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)
 

  const RemoveSavedItems = async(val: Product) => {
    await dispatch(toggleSavedProducts({ productId: val?._id }));
    dispatch(getUser())
  }

  return (
    <>
      {user?.savedItems.length > 0 ? (
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
                {user?.savedItems?.map((val) =>
                  <>
                    <tr>
                      <td className='min-w-[100px]'><img className='w-[100px] !h-[50px] rounded border border-gray-200' src={val?.image} alt="" /></td>
                      <td className='min-w-[150px]'>{characterLimit(val?.name, 20)}</td>
                      <td className='min-w-[150px]'>{characterLimit(val?.category, 30)}</td>
                      <td className='min-w-[100px]'>${val?.price}</td>
                      <td className='min-w-[150px]'>{new Date(val?.createdAt).toLocaleDateString() ?? 'Date'}</td>
                      <td className='relative cursor-pointer' onClick={() => RemoveSavedItems(val)}>
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