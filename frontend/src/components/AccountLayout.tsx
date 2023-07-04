// import React, { ReactNode } from 'react';
// import Footer from './shared/Footer';
// import Navbar from './shared/Navbar';

import { Link } from "react-router-dom";
import AccountSidebar from "./sidebar/AccountSidebar";
import { CaretRight } from "@phosphor-icons/react";
import NewsLetter from "./home/NewsLetter";
import Loader from "./UI/Loader";
import { useAppSelector } from "../network/hooks";
import { ReactNode } from "react";

interface AccountLayoutProps {
    children: ReactNode;
    title: string,
}


const AccountLayout: React.FC<AccountLayoutProps> = ({ children, title }) => {
    const { user, isLoading, isError, message } = useAppSelector(state => state.user)

    return (
        <section className={`app-container w-full mt-[12px] s-1025:px-[80px] s-767:px-[40px] px-[16px] `}>
            <div className='w-full'>
                <div className='s-480:pt-[30px] pt-[18px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/user/accounts'}>Accounts</Link> <CaretRight size={14} /> </span> <span className='font-medium'>{title}</span>
                </div>

                <div className='s-767:flex items-start s-767:space-x-3 w-full'>
                    <AccountSidebar />

                    <div className='w-full border border-gray-200 rounded-[5px] s-480:pt-[16px] pt-[8px] s-480:pb-[40px] pb-[0]'>
                        <h1 className='s-480:text-[18px] text-[16px] font-medium border-b border-gray-200 s-480:px-[14px] px-[10px] s-480:pb-[12px] pb-[6px] s-480:mb-[18px] mb-[9px]'>{title}</h1>
                        <div className='s-480:px-[14px] px-[10px]'>
                            {isLoading && <div className='flex items-center justify-center my-[200px]'><Loader /></div>}
                            {isError && <div className='flex items-center justify-center my-[200px] text-red-400'>An error has occured: {message as string}</div>}
                            {children}
                        </div>

                    </div>
                </div>
            </div>

            <NewsLetter newsletter_extras={'s-480:pb-20 pb-10 s-767:pt-[144px] pt-[50px]'} />
        </section>
    )
}

export default AccountLayout;
