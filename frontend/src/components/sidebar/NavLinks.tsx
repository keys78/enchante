import { pagesList } from '../../utils/data';
import { resetUser } from '../../reducers/private/user/userSlice';
import { logout } from '../../reducers/auth/authSlice';
import * as Icon from "@phosphor-icons/react";
import { useAppDispatch, useAppSelector } from '../../network/hooks';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
    isSideBar?: boolean,
    setIsSideBar?: ((arg0: boolean) => void) | undefined, // Provide a default value
    list_style: string,
    link_text_size: string,
    icon_size: number
}

const NavLinks = ({ isSideBar, setIsSideBar, list_style, link_text_size, icon_size }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.user)

    const filteredPagesList = user?.role === "admin"
    ? ( user?.username? pagesList : pagesList.slice(0, 3))
    : ( user?.username ? pagesList.filter((val) => val.title !== 'Manage Products') : pagesList.slice(0, 3));
  

    function logoutUser() {
        dispatch(logout())
        window.location.href = '/';
        setTimeout(() => { dispatch(resetUser()); }, 3000)
    }

    return (
        <ul className={`${list_style}`}>
            <div>
                {
                    filteredPagesList.map((val) => {
                        const IconComponent = Icon[val.icon]; // Access the icon dynamically
                        return (
                            <li
                                key={val.title}
                                onClick={() => { navigate(val.link); setIsSideBar && setIsSideBar(!isSideBar) }}
                                className={`py-3 px-4 hover:bg-frenchGray cursor-pointer mb-1 ${location.pathname === val.link ? 'bg-frenchGray text-orangeSkin' : ''
                                    }`}
                            >
                                <span className={`flex items-center ${link_text_size}`}>
                                    <IconComponent size={icon_size} color={location.pathname === val.color} /> &nbsp;&nbsp;&nbsp; {val.title}
                                </span>
                            </li>
                        );
                    })}
            </div>

            {!user.username && (
                    <Link to="/auth/login"><li className="pb-[8px] border-b mb-[8px] px-4">
                        <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG IN</button>
                    </li>
                    </Link>
                )}

            {user.username && (
                <li onClick={() => logoutUser()} className="pt-[8px] border-t mt-[8px] px-4">
                    <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                </li>
            )}
        </ul>
    )
}

export default NavLinks;
