import { ArchiveBox, Package, Stack, TrendUp } from "@phosphor-icons/react"
import { useAppDispatch, useAppSelector } from "../../network/hooks"
import { useEffect } from "react"
import { getSellerProducts } from "../../reducers/products/productsSlice"

const Accounts = () => {
  const { user } = useAppSelector(state => state.user)
  const { sellerProducts, userOrder } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSellerProducts({}));
  }, [dispatch])

  return (
    <section>
      <div className="flex items-center s-1220:space-x-3 justify-between s-1220:flex-row flex-col s-1220:space-y-0 space-y-3">
        <div className="bg-black text-white rounded-[5px] p-4 flex items-start justify-between w-full">
          <div>
            <h1 className="s-767:text-[36px] text-[20px] ">{sellerProducts?.length}</h1>
            <p className="s-480:text-[16px] text-[14px] pb-2">My Product{sellerProducts?.length === 1 ? '' : 's'}</p>
            <div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-[#24f64e] s-480:text-[14px] text-[12px]"><TrendUp size={14} color="#24f64e" />&nbsp; {sellerProducts?.length * 2.5}% </div>
                <p className="opacity-50 text-[14px] whitespace-nowrap">Since last month</p>
              </div>
            </div>
          </div>
          <Stack size={32} color="#24f64e" />
        </div>
        <div className="bg-black text-white rounded-[5px] p-4 flex items-start justify-between w-full">
          <div>
            <h1 className="s-767:text-[36px] text-[20px] ">{user?.savedItems?.length}</h1>
            <p className="s-480:text-[16px] text-[14px] pb-2">Saved Item{user?.savedItems?.length === 1 ? '' : 's'}</p>
            <div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-[#24f64e] s-480:text-[14px] text-[12px]"><TrendUp size={14} color="#24f64e" />&nbsp; {user?.savedItems?.length * 2.8}% </div>
                <p className="opacity-50 text-[14px] whitespace-nowrap">Since last month</p>
              </div>
            </div>
          </div>
          <ArchiveBox size={32} color="#24f64e" />
        </div>
        <div className="bg-black text-white rounded-[5px] p-4 flex items-start justify-between w-full">
          <div>
            <h1 className="s-767:text-[36px] text-[20px] ">{userOrder?.length}</h1>
            <p className="s-480:text-[16px] text-[14px] pb-2">Order{userOrder?.length === 1 ? '' : 's'}</p>
            <div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-[#24f64e] s-480:text-[14px] text-[12px]"><TrendUp size={14} color="#24f64e" />&nbsp; {(userOrder?.length * 2.3)?.toFixed(1)}% </div>
                <p className="opacity-50 text-[14px] whitespace-nowrap">Since last month</p>
              </div>
            </div>
          </div>
          <Package size={32} color="#24f64e" />
        </div>
      </div>
      <div className="s-1025:flex justify-between mt-[20px] s-1025:space-x-3 s-1025:space-y-0 space-y-3">
        <div className="w-full">
          <h1 className="px-2 py-1 border border-gray-200 bg-gray-50 rounded-[5px]">Account Info</h1>
          <div className="grid grid-cols-2 w-full gap-3">
            <p>Name:</p>
            <p>{user?.username}</p>
            <p>Email:</p>
            <p className="break-all">{user?.email}</p>
            <p>Joined</p>
            <p>{new Date(user?.createdAt).toLocaleDateString() ?? 'Date'}</p>
          </div>
        </div>
        <div className="w-full">
          <h1 className="px-2 py-1 border border-gray-200 bg-gray-50 rounded-[5px]">Shipping Address</h1>
          <div className="grid grid-cols-2 w-full ">
            <div>N/A</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Accounts;


