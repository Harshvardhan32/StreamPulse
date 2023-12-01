import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ setIsLoggedIn }) => {

    const [formData, setFormData] = useState({
        email: '', password: ''
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ));
    }

    function submitHandler(event) {
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success("Logged in successfully!");
        // print form data
        // console.log(formData);
        navigate('/');
    }

    return (
        <div className='bg-[#0d1011] min-h-[85%]'>
            <div className='w-11/12 max-w-[470px] mx-auto pt-36 pb-20  flex flex-col gap-y-4'>
                <h2 className='text-3xl text-white font-semibold mx-5'>
                    Welcome to StreamPulse
                </h2>
                <form onSubmit={submitHandler} className='flex flex-col gap-y-4 mx-5'>
                    <label>
                        <p className='text-white text-md mb-1 leading-[1.375rem]'>Email Address <sup className='text-red-600 ml-1'>*</sup></p>
                        <input type="email"
                            placeholder='Enter email address'
                            value={formData.email}
                            onChange={changeHandler}
                            name='email'
                            required
                            className='bg-gray-900 rounded-[8px] text-gray-300 w-full  py-[12px] pl-[12px] pr-[35px] border-b-2 border-slate-400'
                        />
                    </label>

                    <label className='relative'>
                        <p className='text-white text-md mb-1 leading-[1.375rem]'>Password <sup className='text-red-600 ml-1'>*</sup></p>

                        <input type={showPassword ? ("text") : ("password")}
                            placeholder='Enter password'
                            value={formData.password}
                            onChange={changeHandler}
                            name='password'
                            required
                            className='bg-gray-900 rounded-[8px] text-gray-300 w-full  py-[12px] pl-[12px] pr-[42px] border-b-2 border-slate-400'
                        />

                        <span
                            className='absolute right-3 top-[38px] cursor-pointer'
                            onClick={() => { setShowPassword((prev) => !prev); }}>
                            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                        </span>
                        <Link>
                            <p className='text-blue-400 text-right text-sm mt-1'>Forgot Password</p>
                        </Link>
                    </label>

                    <button className='w-full text-gray-200 text-lg font-medium bg-[#f10583] mt-3 px-3 py-2 rounded-[8px] hover:bg-[#E60E83]'>
                        Sign In
                    </button>

                    <div className='flex w-full items-center'>
                        <div className='bg-gray-200 w-full h-[1px]'></div>
                        <p className='text-gray-200 font-semibold mx-3'>OR</p>
                        <div className='bg-gray-200 w-full h-[1px]'></div>
                    </div>

                    <p className='w-full text-gray-200 text-lg font-medium cursor-pointer border border-gray-400 mt-1 px-3 py-2 rounded-[8px] flex gap-x-4 justify-center items-center'>
                        <FcGoogle /> {" "} Sign In With Google
                    </p>
                    <Link to='/signup'>
                        <p className='text-blue-500 text-lg text-center'>Don't have an account ? Sign Up</p>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;