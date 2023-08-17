import { ArrowRight, Package } from "@phosphor-icons/react";
import { getUserOrders } from "../../reducers/products/productsSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import Loader from "../../components/UI/Loader";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { userOrder, isLoading } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserOrders({}));
  }, [dispatch]);

  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-[100px]"> <Loader /></div>
  }

  console.log(userOrder)

  return (
    <div>
      {userOrder?.length > 0 ? (
        <div>
          {userOrder?.map((order) => (
            <div className=" border rounded-[5px] p-4 bg-gray-50 mb-[10px]" key={order?._id}>
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-y-[10px]">
                  <div className="grid grid-cols-6 gap-2">
                    <span className="s-1024:col-span-1 col-span-3 whitespace-nowrap">Order ɳŌ:</span>
                    <span className="font-bold s-1024:col-span-5 col-span-3">{order._id?.slice(15, 24)}</span>
                    <span className="s-1024:col-span-1 col-span-3 whitespace-nowrap">Order Date:</span>
                    <span className="font-bold s-1024:col-span-5 col-span-3">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>

                  <Package size={50} weight="thin" />

                </div>

                <div className="flex items-center space-x-2">
                  <button className="bg-green-700 rounded-[5px] w-[80px] text-center py-[5px] text-white outline-none">{order.payment_status}</button>
                </div>
              </div>

              <button onClick={() => navigate(`/user/order/${order?._id}`)} className="text-orange-500 flex items-center mt-[20px] font-medium">SEE DETAILS&nbsp;<ArrowRight color="#ef9103" size={16} weight="bold" /></button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center text-center py-[100px]">
          <Package className="mx-auto" size={70} weight="thin" />
          <p className="text-center">
            You have no new order(s). <br /> Your orders will appear here when you make one
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
