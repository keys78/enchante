import { Link } from "react-router-dom";

const UserActionsPanel = () => {
    const auth = true;

    return (
        <div className="bg-[#fff] w-[250px] shadow rounded-[5px]">
            <ul className="py-2 flex flex-col">
                {!auth && (
                    <Link to="/login"><li className="pb-[8px] border-b mb-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG IN</button>
                    </li>
                    </Link>
                )}
                <li className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer">My Account</li>
                <li className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer">My Orders</li>
                <li className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer">Saved Items</li>
                {auth && (
                    <li className="pt-[8px] border-t mt-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default UserActionsPanel