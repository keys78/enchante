import { useEffect, useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../network/hooks";
import { loginUser, reset } from "../../reducers/auth/authSlice";
import { Link, useNavigate } from 'react-router-dom';
import LogoMain from '../../assets/svg/LogoMain';
import GoogleIcon from '../../assets/svg/GoogleIcon';
import Loader from '../../components/UI/Loader';
// import Google_logo from '../../components/icons/GoogleLogo';

export type LoginData = {
    email: string;
    password: string;
};

const Login = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>("password");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const { isSuccess, isLoading, isError, message, token } = useAppSelector((state) => state.auth);
    // const { user } = useAppSelector((state) => state.user);
    // const user = {}

    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('ent-token') : null;
    const token2 = storedToken ? JSON.parse(storedToken) : '';


    // useEffect(() => {
    //     if (token2 || token) {
    //         navigate('/')
    //     }
    //     dispatch(reset())
    // }, [isError, isSuccess, message, navigate, dispatch, token, token2])

    useEffect(() => {
        // navigate('/')
    }, [navigate])


    const LoginValidation = yup.object().shape({
        email: yup
            .string()
            .email("Please provide a valid email address")
            .required("email is required"),
        password: yup
            .string()
            .min(6, "password must be at least at 6 characters")
            .required("password is required"),
    });

    const handleToggle = () => {
        if (inputType === "password") {
            setInputType("text");
            setIsVisible(!isVisible);
        } else {
            setInputType("password");
            setIsVisible(!isVisible);
        }
    };

    return (
        <div className="app-container max-w-[100%] min-h-[100vh] w-full mx-auto relative overflow-hidden dark:bg-veryDarkGrey">
            <div className="max-w-[400px] mx-auto py-12">
                <div className="mx-[16px]">
                    <Link to="/">
                        <div className="logo-main bg-black text-white py-[30px] px-[20px] absolute top-0 left-0">
                            <LogoMain logo_width="s-480:w-[140px] w-[90px]" />
                        </div>
                    </Link>
                    <p className='pb-8 text-center text-[16] s-767:pt-16 pt-24'>Login and resume your shopping experience</p>

                    <div>
                        <Formik
                            validationSchema={LoginValidation}
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={async (
                                values: LoginData,
                                { resetForm }: FormikHelpers<LoginData>
                            ) => {
                                const data = { ...values, };
                                dispatch(loginUser(data));
                                resetForm();
                            }}
                        >
                            {(props) => (
                                <form onSubmit={props.handleSubmit}>
                                    <div className="input-container">
                                        <label className="opacity-100 pl-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="input-class"
                                            type="text"
                                            value={props.values.email}
                                            onBlur={props.handleBlur("email")}
                                            onChange={props.handleChange("email")}
                                        />
                                        <span
                                            className={
                                                "text-red-500 text-[10px] translate-x-2 animate-pulse transition-all"
                                            }
                                        >
                                            {props.touched.email && props.errors.email}
                                        </span>
                                    </div>

                                    <label className="opacity-100 pl-2" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="password-input">
                                        <div>
                                            <input
                                                className="input-class-p"
                                                type={inputType}
                                                value={props.values.password}
                                                onBlur={props.handleBlur("password")}
                                                onChange={props.handleChange("password")}
                                                autoComplete={"off"}
                                            />
                                        </div>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => handleToggle()}
                                        >
                                            {!isVisible ? "SHOW" : "HIDE"}
                                        </div>
                                    </div>
                                    <span
                                        className={
                                            "text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"
                                        }
                                    >
                                        {props.touched.password && props.errors.password}
                                    </span>
                                    <br />
                                    <div className="my-2 lg:block flex justify-center items-center">
                                        <button
                                            disabled={isLoading}
                                            type="submit"
                                            className="gen-btn-class bg-[#000] text-[#fff] w-full h-[48px] rounded-[5px] text-[18px] flex items-center justify-center font-medium"
                                        >
                                            {!isLoading ? (
                                                "LOG IN"
                                            ) : (
                                                <Loader />
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-center pt-4">
                                        Don&apos;t have an account? &nbsp;
                                        <Link to={"/auth/signup"}>
                                            <span className="text-bold text-orange-500">Sign up</span>
                                        </Link>
                                    </div>

                                    <div className="flex items-center w-full dark:bg-darkGrey my-[10px]">
                                        <hr className='w-[40%]' />
                                        <span className="w-[15%] text-center text-[14px] font-bold dark:bg-veryDarkGrey">OR</span>
                                        <hr className='w-[40%]' />
                                    </div>

                                    <div
                                        onClick={() => alert("console not ready - try login")}
                                        className="flex items-center w-full justify-center rounded-[5px] border border-[#000] py-3 space-x-3 cursor-pointer"
                                    >
                                        <GoogleIcon />
                                        <span>Continue with Google</span>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            {/* <div className='stripe_btm absolute bottom-[-300px] right-[-300px] h-[500px] border-[50px] border-orange-500 opacity-[0.7]'></div>
            <div className='stripe_btm absolute bottom-[-335px] right-[-335px] h-[500px] border-[50px] border-[#000]'></div> */}
        </div>
    );
};

export default Login;
