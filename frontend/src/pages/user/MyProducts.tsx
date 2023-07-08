import { useEffect } from 'react'
import { getSellerProducts } from '../../reducers/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../../network/hooks';

const MyProducts = () => {
  const dispatch = useAppDispatch();
  const { sellerProducts } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(getSellerProducts({}));
  }, [dispatch])

  return (
    <div>
       <table>
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
      </tr>
      <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
      </tr>
      <tr>
        <td>Row 3, Cell 1</td>
        <td>Row 3, Cell 2</td>
        <td>Row 3, Cell 3</td>
      </tr>
    </tbody>
  </table>
      {sellerProducts.map((val) =>
        <div className='flex'>
          <img className='w-[100px]' src={val?.image} alt="" />
          <p>{val?.name}</p>
        </div>
      )}
    </div>
  )
}

export default MyProducts