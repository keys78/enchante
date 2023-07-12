import { deleteProduct } from "../../reducers/products/productsSlice"
import { Product } from "../../types"

interface deleteWarningProps {
    product: Product
    setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    // setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    // setShowDeleteBoardModal: React.Dispatch<React.SetStateAction<boolean>>
}



const DeleteWarningModal = ({ product, setIsDeleteModal }: deleteWarningProps) => {

    const deleteProductAction = () => {
        deleteProduct({ productId: product?._id })
        setIsDeleteModal(false)
        console.log('Hello Worodld')
    }

    return (
        <div className="space-y-6 w-full mx-auto rounded-md ">
            <h1 className="text-mainRed font-bold text-[16px]">Delete this Product?</h1>
            <p className="text-[13px] text-black">Are you sure you want to delete the &apos;{product?.name}&apos;? This action cannot be reversed.</p>
            <div className="flex gap-4">

                <button className="flex-1 bg-mainRed text-white text-[13px] rounded-[5px] p-2 transition duration-200 hover:bg-mainRedHover"
                    onClick={deleteProductAction}
                >
                    Delete
                </button>
                <button onClick={() => setIsDeleteModal(false)} className="flex-1 bg-black text-white text-[13px] rounded-[5px] p-2 transition duration-200 hover:bg-opacity-25"  >
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default DeleteWarningModal;
