import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetUser } from "../../reducers/private/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { logout } from "../../reducers/auth/authSlice";

interface Props {
    setShowUserCTA: (arg: boolean) => void
}

const UserActionsPanel = ({ setShowUserCTA }: Props) => {
    const { user } = useAppSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    function logoutUser() {
        dispatch(logout())
        window.location.href = '/';
        setTimeout(() => {dispatch(resetUser());}, 3000)
    }

    const pagesList = [
        { title: 'My Account', link: '/user/account' },
        { title: 'My Orders', link: '/user/my-orders' },
        { title: 'Saved Items', link: '/user/saved-items' },
    ]

    return (
        <div className="bg-[#fff] w-[250px] shadow rounded-[5px]">
            <ul className="py-2 flex flex-col">
                {!user.username && (
                    <Link to="/auth/login"><li className="pb-[8px] border-b mb-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG IN</button>
                    </li>
                    </Link>
                )}
                {pagesList.map(val =>
                    <li
                        onClick={() => { navigate(val?.link); setShowUserCTA(false) }}
                        className={`py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer  ${location.pathname === val.link && 'bg-[#e4e4e4] text-orangeSkin'}`}
                    >
                        {val.title}
                    </li>
                )}
                {user.username && (
                    <li onClick={() => logoutUser()} className="pt-[8px] border-t mt-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default UserActionsPanel;