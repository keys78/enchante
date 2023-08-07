import useWindowSize from "../hooks/useWindowSize";
import NavLinks from "./NavLinks";

const AccountSidebar = () => {
    const { width } = useWindowSize();

    // const pagesList = [
    //     { title: 'Account', icon: <AppWindow size={22} color={` ${location.pathname === '/user/account' ? '#f75a2c' : '#141414'}`} />, link: '/user/account' },
    //     { title: 'Sell On enchanté', icon: <Money size={22} color={` ${location.pathname === '/user/seller' ? '#f75a2c' : '#141414'}`} />, link: '/user/seller' },
    //     { title: 'My Products', icon: <Stack size={22} color={` ${location.pathname === '/user/my-products' ? '#f75a2c' : '#141414'}`} />, link: '/user/my-products' },
    //     { title: 'Orders', icon: <Package size={22} color={` ${location.pathname === '/user/orders' ? '#f75a2c' : '#141414'}`} />, link: '/user/orders' },
    //     { title: 'Inbox', icon: <EnvelopeOpen size={22} color={` ${location.pathname === '/user/inbox' ? '#f75a2c' : '#141414'}`} />, link: '/user/inbox' },
    //     { title: 'Saved Items', icon: <ArchiveBox size={22} color={` ${location.pathname === '/user/saved-items' ? '#f75a2c' : '#141414'}`} />, link: '/user/saved-items' },
    // ]

    // if (user.role === 'admin') {
    //     pagesList.splice(1, 0, { title: 'Manage Products', icon: <Kanban size={22} color={` ${location.pathname === '/admin/manage-products' ? '#f75a2c' : '#141414'}`} />, link: '/admin/manage-products' });
    // }

    return (
        width > 767 &&
        <aside>
            <NavLinks
                list_style={'w-[285px] flex flex-col justify-between h-[500px] border border-gray-200 rounded-[5px]'}
                link_text_size={"text-[16px]"}
                icon_size={22}
            />
        </aside>
    )
}

export default AccountSidebar