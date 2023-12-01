import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const SignUp = ({ setIsLoggedIn }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormdata] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    });

    function changeHandler(event) {
        setFormdata((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ));
    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password don't match.");
            return;
        }

        setIsLoggedIn(true);
        toast.success('Account created successfully!');

        // print form data
        // console.log(formData);
        navigate('/');
    }

    return (
        <div className='w-full min-h-[85%] bg-[#0D1011]'>
            <div className='w-11/12 max-w-[470px] mx-auto pt-36 pb-20 flex flex-col gap-y-4'>
                <div className='text-white py-1 max-[955px]:mx-5'>
                    <h2 className='text-3xl font-semibold'>Welcome to StreamPulse - Sign In Today!</h2>
                    <h2 className='text-3xl mt-3 font-semibold'>Create Your Account</h2>
                </div>

                <div className='max-[955px]:mx-5'>
                    <form onSubmit={submitHandler} className='flex flex-col gap-y-4'>
                        <div className='flex gap-x-4 max-[695px]:flex-col max-[695px]:gap-y-4 max-[955px]:max-w-[457px]'>
                            <label className='relative'>
                                <p className='text-white text-md mb-1 leading-[1.375rem]'>
                                    First Name<sup className='text-red-600 ml-1'>*</sup>
                                </p>
                                <input type="text"
                                    className='bg-gray-900 rounded-[8px] text-gray-300 w-full  py-[12px] pl-[12px] pr-[35px] border-b-2 border-slate-400' placeholder='First name'
                                    onChange={changeHandler}
                                    name='firstName'
                                    value={formData.firstName}
                                    required
                                />
                            </label>

                            <label className='relative'>
                                <p className='text-white text-md mb-1 leading-[1.375rem]'>
                                    Last Name
                                </p>
                                <input type="text"
                                    className='bg-gray-900 rounded-[8px] text-gray-300 w-full py-[12px] pl-[12px] pr-[35px] border-b-2 border-slate-400' placeholder='Last name'
                                    onChange={changeHandler}
                                    name='lastName'
                                    value={formData.lastName}
                                />
                            </label>
                        </div>

                        <div className='max-[955px]:max-w-[457px]'>
                            <label>
                                <p className='text-white text-md mb-1 leading-[1.375rem]'>
                                    Email<sup className='text-red-600 ml-1'>*</sup>
                                </p>
                                <input type="email"
                                    className='bg-gray-900 rounded-[8px] text-gray-300 w-full p-[12px] border-b-2 border-slate-400' placeholder='Email Address'
                                    onChange={changeHandler}
                                    name='email'
                                    value={formData.email}
                                    required
                                />
                            </label>
                        </div>

                        <div className='flex gap-x-4 max-[695px]:flex-col max-[695px]:gap-y-4 max-[955px]:max-w-[457px]'>
                            <label className='relative'>
                                <p className='text-white text-md mb-1 leading-[1.375rem]'>
                                    Password<sup className='text-red-600 ml-1'>*</sup>
                                </p>
                                <input type={showPassword ? 'text' : 'password'}
                                    className='bg-gray-900 rounded-[8px] text-gray-300 w-full  py-[12px] pl-[12px] pr-[35px] border-b-2 border-slate-400' placeholder='Password'
                                    onChange={changeHandler}
                                    name='password'
                                    value={formData.password}
                                    required
                                />
                                <span
                                    onClick={() => { setShowPassword((prev) => !prev); }}
                                    className='absolute right-2 bottom-3 cursor-pointer'>
                                    {
                                        !showPassword ? <AiOutlineEye fontSize='1.4rem' fill='#d1d5db' /> : <AiOutlineEyeInvisible fontSize='1.4rem' fill='#d1d5db' />
                                    }
                                </span>
                            </label>

                            <label className='relative'>
                                <p className='text-white text-md mb-1 leading-[1.375rem]'>
                                    Confirm Password<sup className='text-red-600 ml-1'>*</sup>
                                </p>
                                <input type={showConfirmPassword ? 'text' : 'password'}
                                    className='bg-gray-900 rounded-[8px] text-gray-300 w-full py-[12px] pl-[12px] pr-[35px] border-b-2 border-slate-400' placeholder='Confirm Password'
                                    name='confirmPassword'
                                    onChange={changeHandler}
                                    value={formData.confirmPassword}
                                    required
                                />
                                <span
                                    className='absolute right-2 bottom-3 cursor-pointer'
                                    onClick={() => { setShowConfirmPassword((prev) => !prev); }}>
                                    {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                                </span>
                            </label>
                        </div>
                        <button className='w-full text-gray-200 text-lg font-medium bg-[#f10583] mt-3 mb-1 px-3 py-2 rounded-[8px] hover:bg-[#E60E83] max-[955px]:max-w-[457px]'>
                            Sign Up
                        </button>
                        <div className='flex w-full items-center max-[955px]:max-w-[457px]'>
                            <div className='bg-gray-200 w-full h-[1px]'></div>
                            <p className='text-gray-200 font-semibold mx-3'>OR</p>
                            <div className='bg-gray-200 w-full h-[1px]'></div>
                        </div>

                        <p className='w-full text-gray-200 text-lg font-medium cursor-pointer border border-gray-400 mt-2 mb-3 px-3 py-2 rounded-[8px] flex gap-x-4 justify-center items-center max-[955px]:max-w-[457px]'>
                            <FcGoogle /> {" "} Sign Up With Google
                        </p>
                        <Link to='/login'>
                            <p className='text-blue-500 text-lg text-center'>Already have an Account ? Login here</p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;