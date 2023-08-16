import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducers/auth/authSlice';
import { resetUser } from '../../reducers/private/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../network/hooks';

const AutoLogout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const storedRemainingSeconds = parseInt(localStorage.getItem('remainingSeconds') || '518400', 10);
    const [secondsRemaining, setSecondsRemaining] = useState(storedRemainingSeconds);
    const { user } = useAppSelector(state => state.user )

    const logoutUser = useCallback(async () => {
        try {
            dispatch(logout());
            navigate('/');
            dispatch(resetUser());
            localStorage.removeItem('remainingSeconds');
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [secondsRemaining]);

    useEffect(() => {
        user?.username && localStorage.setItem('remainingSeconds', secondsRemaining.toString());

        if (secondsRemaining === 0) {
            logoutUser();
        }
    }, [secondsRemaining, logoutUser, user?.username]);

    return user?.username && secondsRemaining > 0 && secondsRemaining <= 10 ? (
        <div
            className='!capitalize italic text-grey-600 text-[12px] absolute top-0 right-0 bg-gray-300 rounded-tl-[5px] rounded-bl-[5px] py-3 px-3 z-50'
        >
            Auto logout in {secondsRemaining} sec
        </div>
    ) : null;
};

export default AutoLogout;
