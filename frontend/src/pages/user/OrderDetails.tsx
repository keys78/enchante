import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOrder, getSingleOrder } from "../../reducers/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import Loader from "../../components/UI/Loader";
import { TrashSimple } from "@phosphor-icons/react";
import Modal from "../../components/Modals/Modal";



const OrderDetails = () => {
    const { orderId } = useParams();
    const { orderDetails: order, isLoading } = useAppSelector(state => state.products)
    const [deleteOrderBoo, setDeleteOrder] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const deleteOrderAction = async () => {
        await dispatch(deleteOrder({ orderId: orderId }))

        navigate(-1)
    }


    useEffect(() => {
        dispatch(getSingleOrder({ orderId: orderId as string }))
    }, [dispatch, orderId])

    if (isLoading) {
        return <div className="flex items-center justify-center w-full h-[100px]"> <Loader /></div>
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-black font-medium text-[12px]"><button className="text-gray-400" onClick={() => navigate('/user/orders')}>Orders </button> &nbsp;{'>'}&nbsp; Order ɳŌ: {orderId?.slice(15, 24)}</div>
                <TrashSimple color="#d41717" weight="bold" className="cursor-pointer" onClick={() => setDeleteOrder(!deleteOrderBoo)} size={20} />
            </div>

            <Modal general="h-auto !max-w-[350px] w-full" setShowModal={setDeleteOrder} showModal={deleteOrderBoo}>
                <h1 className="text-mainRed font-bold text-[16px]">Delete this Order?</h1>
                <p className="text-[13px] text-black">Are you sure you want to delete &apos;<span className="font-bold">Order ɳŌ: {orderId}</span>&apos;? This action cannot be reversed.</p>
                <div className="flex gap-4 pt-[20px]">
                    <button
                        onClick={deleteOrderAction}
                        className="bg-red-500 text-white text-[13px] w-[200px] rounded-[5px]" type="submit">
                        {isLoading ?
                            <span className='flex items-center justify-center'> <Loader /> Deleting... </span>
                            :
                            <span className='flex items-center justify-center'> <TrashSimple size={16} color="#fff" weight='bold' /> &nbsp;&nbsp; Delete   </span>
                        }
                    </button>
                    <button onClick={() => setDeleteOrder(false)} className="gen-btn-class w-[200px] bg-black text-white text-[13px] rounded-[5px] p-2 transition duration-200 gen-btn-class"  >
                        Cancel
                    </button>
                </div>
            </Modal>


            <div className="flex flex-col space-y-10">
                <div className="border border-gray-300 rounded-[5px] mt-[20px]">
                    <div className="border-b border-gray-300 p-[10px]">
                        ORDER SUMMARY
                    </div>
                    <div className="p-[10px]">
                        <p>{`${order?.product?.length} Item${order?.product?.length > 1 ? 's' : ''}`}</p>
                        <p>{`placed on ${new Date(order.createdAt).toLocaleDateString()}`}</p>
                        <p className="pt-[10px]">Total: <span className="font-medium">${order?.total}</span></p>
                    </div>
                </div>

                <div className="border border-gray-300 rounded-[5px]">
                    <div className="border-b border-gray-300 p-[10px]">
                        ITEM{order?.product?.length > 1 ? 'S' : ''} IN YOUR ORDER
                    </div>
                    <div className="flex flex-col space-y-3 p-[10px]">
                        {order?.product?.map((val) =>
                            <div className="border w-full rounded-[5px] s-400:p-4 p-2">
                                <div className="flex items-center space-x-2 justify-between w-full pb-[10px]">
                                    <span className="text-[12px]">Delivery Status:</span>
                                    <button className="bg-yellow-400 rounded-[5px] text-[12px] w-[60px] text-center py-[2px] text-white outline-none">{order.delivery_status}</button>
                                </div>

                                <div className="flex space-x-3">
                                    <img className="max-w-[150px] w-full rounded-[5px]" src={val?.image} />
                                    <div className="flex flex-col space-y-2">
                                        <p className="s-400:leading-6 leading-4">{val?.name} </p>
                                        <p>{val?.category} </p>
                                        <p>${val?.price} </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex s-480:flex-row flex-col items-start s-480:space-x-5 s-480:space-y-0 space-y-3 w-full pb-5">
                    <div className="border border-gray-300 rounded-[5px] w-full">
                        <div className="border-b border-gray-300 p-[10px]">
                            PERSONAL INFO
                        </div>

                        <div className="p-[10px]">
                            <h3>{order?.shipping?.name}</h3>
                            <h3>{order?.shipping?.email}</h3>
                            <h3>{order?.shipping?.phone}</h3>
                        </div>
                    </div>
                    <div className="border border-gray-300 rounded-[5px] w-full">
                        <div className="border-b border-gray-300 p-[10px]">
                            DELIVERY INFO
                        </div>

                        <div className="p-[10px]">
                            <h1 className="font-medium pb-[10px]">Shipping Address</h1>
                            <h3>{order?.shipping?.address?.line1}</h3>
                            <h3>{order?.shipping?.address?.city}</h3>
                            <h3>{order?.shipping?.address?.state}</h3>
                            <h3>{order?.shipping?.address?.country}</h3>
                            <h3>{order?.shipping?.address?.postal_code}</h3>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails;