import { Package } from "@phosphor-icons/react";


const Orders = () => {
  return (
    <div className="flex items-center justify-center text-center py-[100px]">
      <div>
        <Package className="mx-auto" size={70} weight="thin" />
        <p className="text-center">You have no new order(s). <br /> Your orders will appear here when you make one</p>
      </div>
    </div>
  )
}

export default Orders;