import { Link, useNavigate } from "react-router-dom";
import { resetUser } from "../../reducers/private/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { logout } from "../../reducers/auth/authSlice";

const UserActionsPanel = () => {
    const { user } = useAppSelector(state => state.user)
    const navigate = useNavigate()
    // const auth = false;
    const dispatch = useAppDispatch();

    function logoutUser() {
        dispatch(logout())
        dispatch(resetUser());
        localStorage.removeItem('countdown_start');
        window.location.href = '/';
    }

    return (
        <div className="bg-[#fff] w-[250px] shadow rounded-[5px]">
            <ul className="py-2 flex flex-col">
                {!user.username && (
                    <Link to="/auth/login"><li className="pb-[8px] border-b mb-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG IN</button>
                    </li>
                    </Link>
                )}
                <li onClick={() => navigate('/user/accounts')} className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer">My Account</li>
                <li onClick={() => navigate('/user/my-orders')} className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer">My Orders</li>
                <li onClick={() => navigate('/user/saved-items')} className="py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer">Saved Items</li>
                {user.username && (
                    <li onClick={() => logoutUser()} className="pt-[8px] border-t mt-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default UserActionsPanel