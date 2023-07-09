import { useEffect, useRef, useState } from 'react'
import { getSellerProducts } from '../../reducers/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { DotsThreeVertical, Eye, Pen, TrashSimple } from '@phosphor-icons/react';
import { characterLimit } from '../../utils/general';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useOnClickOutside from '../../components/hooks/useOnClickOutside';

const MyProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<any>('')
  const { sellerProducts } = useAppSelector(state => state.products)

  const promptModalRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => { setActiveIndex('') };
  useOnClickOutside(promptModalRef, clickOutsidehandler);

  useEffect(() => {
    dispatch(getSellerProducts({}));
  }, [dispatch])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellerProducts.map((val, i) =>
            <tr>
              <td><img className='w-[100px]' src={val?.image} alt="" /></td>
              <td>{characterLimit(val?.name, 20)}</td>
              <td>{characterLimit(val?.category, 30)}</td>
              <td>${val?.price}</td>
              <td>{val?.createdAt ?? 'Date'}</td>
              <td onClick={() => setActiveIndex(i)} className='action__group'><DotsThreeVertical size={28} weight='bold' />
                {activeIndex === i &&
                  <motion.div ref={promptModalRef}
                    initial={{ opacity: 0, translateX: -50, zIndex: 99 }}
                    animate={{ opacity: 1, translateX: 0, zIndex: 99 }}
                    transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96], delay: i * 0.1 }}
                    className='action__prompt'>
                    {/* <div onClick={() => navigate(`/products/product-details/${val?._id}`)}><Eye /> View Details</div> */}
                    <div onClick={() => navigate(`/products/product-details/${val?._id}`, { state: { source: 'My Products' } })}>view details</div>
                    <div onClick={() => toast.error('endpoint unavialable')}><Pen />Edit</div>
                    <div onClick={() => toast.error('endpoint unavialable')}><TrashSimple /> Delete</div>
                  </motion.div>
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default MyProducts;