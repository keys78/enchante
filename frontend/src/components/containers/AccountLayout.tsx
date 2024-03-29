import { Link, useNavigate } from "react-router-dom";
import AccountSidebar from "../sidebar/AccountSidebar";
import { CaretRight } from "@phosphor-icons/react";
import Loader from "../UI/Loader";
import { useAppSelector } from "../../network/hooks";
import { ReactNode } from "react";

interface AccountLayoutProps {
    children: ReactNode;
    title: string,
}




const AccountLayout: React.FC<AccountLayoutProps> = ({ children, title }) => {
    const { isLoading, isError, message } = useAppSelector(state => state.user)
    const navigate = useNavigate();

    const refresh = () => {
        localStorage.removeItem('ent-token')
        localStorage.removeItem('remainingSeconds')

        navigate('/')

    }

    return (
        <section className={`app-container w-full mt-[12px] s-1025:px-[80px] s-767:px-[40px] px-[16px] `}>
            <div className='w-full sm:mb-[150px] mb-[60px]'>
                <div className='s-480:pt-[30px] pt-[18px] pb-[18px] flex items-center space-x-2'>
                    <span className='flex items-center space-x-2' style={{ color: '#a6a4a4' }}><Link to={'/user/account'}>Accounts</Link> <CaretRight size={14} /> </span> <span className='font-medium'>{title}</span>
                </div>

                <div className='s-767:flex items-start s-767:space-x-3 w-full'>
                    <AccountSidebar />

                    <div className='w-full border border-gray-200 rounded-[5px] s-480:pt-[16px] pt-[8px] s-480:pb-[40px] pb-[0]'>
                        <h1 className='s-480:text-[18px] text-[16px] font-medium border-b border-gray-200 s-480:px-[14px] px-[10px] s-480:pb-[12px] pb-[6px] s-480:mb-[18px] mb-[9px]'>{title}</h1>
                        <div className='s-480:px-[14px] px-[10px]'>
                            {isLoading ? (
                                <div className='flex items-center justify-center my-200'>
                                    <Loader />
                                </div>
                            ) : isError ? (
                                <div className='flex items-center justify-center my-200 text-red-400'>
                                    <div>
                                        <p>An error has occurred: {message as string}</p> <br />
                                        <button onClick={refresh} className="py-2 px-3 rounded-[5px] text-white bg-black flex items-center justify-center mx-auto">Refresh</button>
                                    </div>
                                </div>
                            ) : (
                                children
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AccountLayout;
