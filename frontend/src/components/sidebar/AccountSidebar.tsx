import { useNavigate } from "react-router-dom";
import { logout } from "../../reducers/auth/authSlice";
import { resetUser } from "../../reducers/private/user/userSlice";
import { useAppDispatch } from "../../network/hooks";
import { AppWindow, ArchiveBox, EnvelopeOpen, Money, Stack } from "@phosphor-icons/react";
import useWindowSize from "../hooks/useWindowSize";

const AccountSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();
    function logoutUser() {

        dispatch(logout())
        dispatch(resetUser());
        window.location.href = '/';
    }

    const pagesList = [
        { title: 'My Account', icon: <AppWindow size={22} color={` ${location.pathname === '/user/account' ? '#f75a2c' : '#141414'}`} />, link: '/user/account' },
        { title: 'Sell On enchanté', icon: <Money size={22} color={` ${location.pathname === '/user/seller' ? '#f75a2c' : '#141414'}`} />, link: '/user/seller' },
        { title: 'My Orders', icon: <Stack size={22} color={` ${location.pathname === '/user/my-orders' ? '#f75a2c' : '#141414'}`} />, link: '/user/my-orders' },
        { title: 'Inbox', icon: <EnvelopeOpen size={22} color={` ${location.pathname === '/user/inbox' ? '#f75a2c' : '#141414'}`} />, link: '/user/inbox' },
        { title: 'Saved Items', icon: <ArchiveBox size={22} color={` ${location.pathname === '/user/saved-items' ? '#f75a2c' : '#141414'}`} />, link: '/user/saved-items' },
    ]

    return (
        width > 767 &&
        <section>
            <ul className='w-[285px] flex flex-col justify-between h-[500px] border border-gray-200 rounded-[5px]'>
                <div>
                    {pagesList.map(val =>
                        <li
                            onClick={() => { navigate(val?.link) }}
                            className={`py-3 px-4 hover:bg-[#e4e4e4] cursor-pointer mb-1  ${location.pathname === val.link && 'bg-[#e4e4e4] text-orangeSkin'}`}
                        >
                            <span className="flex items-center">{val.icon} &nbsp;&nbsp;&nbsp;  {val.title}</span>
                        </li>
                    )}
                </div>
                <li onClick={() => logoutUser()} className="pt-[8px] border-t mt-[8px] px-4">
                    <button className="bg-[#000] rounded-[5px] py-[10px] px-[auto] w-full text-[#fff] mb-[4px] font-medium">LOG OUT</button>
                </li>
            </ul>
        </section>
    )
}

export default AccountSidebar