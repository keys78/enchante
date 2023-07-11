import { useEffect, useRef, useState } from 'react'
import { getSellerProducts } from '../../reducers/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { DotsThreeVertical, Eye, Pen, TrashSimple } from '@phosphor-icons/react';
import { characterLimit } from '../../utils/general';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useOnClickOutside from '../../components/hooks/useOnClickOutside';
import EditProductModal from '../../components/Modals/EditProductModal';
import Modal from '../../components/Modals/Modal';

const MyProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<any>('')
  const { sellerProducts } = useAppSelector(state => state.products)
  const [isEditModal, setIsEditModal] = useState<boolean>(true)

  const promptModalRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => { setActiveIndex('') };
  useOnClickOutside(promptModalRef, clickOutsidehandler);

  useEffect(() => {
    dispatch(getSellerProducts({}));
  }, [dispatch])

  return (
    <section className='overflow-x-auto'>
      <table>
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
          {sellerProducts?.map((val, i:number) =>
            <>
              <tr>
                <td className='min-w-[100px]'><img className='w-[100px] rounded' src={val?.image} alt="" /></td>
                <td className='min-w-[150px]'>{characterLimit(val?.name, 20)}</td>
                <td className='min-w-[150px]'>{characterLimit(val?.category, 30)}</td>
                <td className='min-w-[100px]'>${val?.price}</td>
                <td className='min-w-[150px]'>{new Date(val?.createdAt).toLocaleDateString() ?? 'Date'}</td>
                <td onClick={() => setActiveIndex(i)} className='action__group'><DotsThreeVertical size={28} weight='bold' />
                  {activeIndex === i &&
                    <motion.div ref={promptModalRef}
                      initial={{ opacity: 0, translateX: -50, zIndex: 99 }}
                      animate={{ opacity: 1, translateX: 0, zIndex: 99 }}
                      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96], delay: i * 0.1 }}
                      className='action__prompt'>
                      <div onClick={() => navigate(`/products/product-details/${val?._id}`, { state: { source: 'My Products' } })}><Eye /> View details</div>
                      <div onClick={() => { setIsEditModal(true) }}><Pen />Edit
                        <Modal showModal={isEditModal} setShowModal={setIsEditModal}>
                          <EditProductModal product={val} />
                        </Modal>
                      </div>
                      <div onClick={() => toast.error('endpoint unavialable')} className='text-mainRed'><TrashSimple color='#EA5555' /> Delete</div>
                    </motion.div>
                  }
                </td>
              </tr>

            </>

          )}
        </tbody>
      </table>
    </section>
  )
}

export default MyProducts;