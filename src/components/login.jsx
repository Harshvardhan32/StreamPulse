import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const login = ({ isLoggedIn, setIsLoggedIn, setMobileMenu }) => {
    return (
        <div>
            {!isLoggedIn &&
                <Link to='/login'>
                    <button
                        onClick={() => (setMobileMenu(false))}
                        className='text-xl text-gray-400 border border-gray-500 py-[7px] px-4 rounded-md font-medium transition-all duration-300 hover:bg-[#E60E83] hover:border-[#E60E83] hover:text-white'>
                        Log in
                    </button>
                </Link>
            }
            {isLoggedIn &&
                <Link to='/'>
                    <button
                        onClick={() => {
                            setIsLoggedIn(false);
                            setMobileMenu(false);
                            toast.success("Logged Out Successfully");
                        }}
                        className='text-xl text-gray-400 border border-gray-500 py-1 px-4 rounded-md font-medium transition-all duration-300 hover:bg-[#E60E83] hover:border-[#E60E83] hover:text-white'>
                        Log Out
                    </button>
                </Link>
            }
        </div>
    );
};

export default login;