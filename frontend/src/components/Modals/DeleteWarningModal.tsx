import { TrashSimple } from "@phosphor-icons/react"
import { useAppDispatch, useAppSelector } from "../../network/hooks"
import { deleteProduct, getAllProductsTwo, getSellerProducts } from "../../reducers/products/productsSlice"
import { Product } from "../../types"
import Loader from "../UI/Loader"

interface DeleteWarningProps {
    product: Product
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}



const DeleteWarningModal = ({ product, setIsDeleteModal }: DeleteWarningProps) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.products)
    const { user } = useAppSelector(state => state.user)


    const deleteProductAction = async () => {
        await dispatch(deleteProduct({ productId: product?._id }))
        await dispatch(getSellerProducts({}));

        user?.role === "admin" &&  await dispatch(getAllProductsTwo({}))

        setIsDeleteModal(false)

    }

    return (
        <div className="space-y-6 w-full mx-auto rounded-md ">
            <h1 className="text-mainRed font-bold text-[16px]">Delete this Product?</h1>
            <p className="text-[13px] text-black">Are you sure you want to delete &apos;{product?.name}&apos;? This action cannot be reversed.</p>
            <div className="flex gap-4">
                <button
                    onClick={deleteProductAction}
                    className="bg-red-500 text-white text-[13px] w-[200px] rounded-[5px]" type="submit">
                    {isLoading ?
                        <span className='flex items-center justify-center'> <Loader /> Deleting... </span>
                        :
                        <span className='flex items-center justify-center'> <TrashSimple size={16} color="#fff" weight='bold' /> &nbsp;&nbsp; Delete   </span>
                    }
                </button>
                <button onClick={() => setIsDeleteModal(false)} className="gen-btn-class w-[200px] bg-black text-white text-[13px] rounded-[5px] p-2 transition duration-200 gen-btn-class"  >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default DeleteWarningModal;
