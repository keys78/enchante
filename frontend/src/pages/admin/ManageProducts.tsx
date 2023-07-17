import { useEffect, useRef, useState } from 'react'
import { deleteProduct, getAllProducts, getAllProductsTwo, getSellerProducts } from '../../reducers/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { CloudArrowUp, DotsThreeVertical, Eye, Pen, TrashSimple } from '@phosphor-icons/react';
import { characterLimit } from '../../utils/general';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useOnClickOutside from '../../components/hooks/useOnClickOutside';
import EditProductModal from '../../components/Modals/EditProductModal';
import Modal from '../../components/Modals/Modal';
import DeleteWarningModal from '../../components/Modals/DeleteWarningModal';
import { products } from '../../utils/data';

const ManageProducts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<any>('')
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
  const { products } = useAppSelector(state => state.products)
  const [isEditModal, setIsEditModal] = useState<boolean>(false)

  const promptModalRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => { setActiveIndex('') };
  useOnClickOutside(promptModalRef, clickOutsidehandler);



  useEffect(() => {
    dispatch(getAllProductsTwo({}))
  }, [dispatch])

  // const sellerId = products.map(val => val?._id)
  // console.log('All sellerId', sellerId)

  return (
    <section className='overflow-x-auto'>
      <table className='pb-[200px]'>
        <thead>
          <tr>
            <th>Seller</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((val, i: number) =>
            <>
              <tr>
                <td className='min-w-[100px]'> <span className='font-medium'>{val?.seller?.username}</span></td>
                <td className='min-w-[100px]'><img className='w-[100px] !h-[50px] rounded border border-gray-200' src={val?.image} alt="" /></td>
                <td className='min-w-[150px]'>{characterLimit(val?.name, 20)}</td>
                <td className='min-w-[100px]'>${val?.price}</td>
                <td className='min-w-[150px]'>{new Date(val?.createdAt).toLocaleDateString() ?? 'Date'}</td>
                <td onClick={() => setActiveIndex(i)} className='relative cursor-pointer'><DotsThreeVertical size={28} weight='bold' />
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
                      <div onClick={() => setIsDeleteModal(true)} className='text-mainRed'><TrashSimple color='#EA5555' /> Delete
                        <Modal showModal={isDeleteModal} setShowModal={setIsDeleteModal} general='!h-[200px] !w-[400px]'>
                          {isDeleteModal && <DeleteWarningModal product={val} setIsDeleteModal={setIsEditModal} />}
                        </Modal>
                      </div>
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

export default ManageProducts;





// const ManageProducts = () => {
//   return (
//     <div>ManageProducts</div>
//   )
// }

// export default ManageProducts