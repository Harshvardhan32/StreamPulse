import React from 'react';
import Logo from '../Image/Logo.svg';
import { Link } from 'react-router-dom';
import { RiTwitterXLine, RiInstagramLine, RiLinkedinFill } from 'react-icons/ri';
import { FiFacebook } from 'react-icons/fi';

const Footer = () => {
    return (
        <div className='bg-[#0d1011] text-white pb-5 pt-10'>
            <div className='w-11/12 max-w-[1500px] mx-auto gap-x-5 flex justify-between items-center max-[414px]:flex-col max-[414px]:gap-y-5 max-[414px]:mx-5'>
                <div className='max-[414px]:w-[80%]'>
                    <Link to='/'>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className='flex gap-x-4'>
                    <div className='bg-gray-900 p-2 rounded-full'>
                        <Link target='_blank'>
                            <RiTwitterXLine fontSize='1.4rem' fill='#afacac' />
                        </Link>
                    </div>
                    <div className='bg-gray-900 p-2 rounded-full'>
                        <Link to='https://www.instagram.com/harsh88408/?igshid=MzMyNGUyNmU2YQ%3D%3D' target='_blank'>
                            <RiInstagramLine fontSize='1.4rem' fill='#afacac' />
                        </Link>
                    </div>
                    <div className='bg-gray-900 p-2 rounded-full'>
                        <Link target='_blank'>
                            <FiFacebook fontSize='1.4rem' fill='#afacac' />
                        </Link>
                    </div>
                    <div className='bg-gray-900 p-2 rounded-full'>
                        <Link to='https://harshvardhan-dev-portfolio.netlify.app/' target='_blank'>
                            <RiLinkedinFill fontSize='1.4rem' fill='#afacac' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='text-center mt-5 mx-10'>
                <p className='text-lg font-semibold'>All right reserved | &copy; Copyright 2023</p>
            </div>
        </div>
    );
};

export default Footer;