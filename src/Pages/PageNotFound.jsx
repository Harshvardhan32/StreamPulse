import React from 'react';
import Img from '../components/LazyLoad/Img';
import pageNotFoundImg from '../Image/no-results.png';

const pageNotFound = () => {
    return (
        <div className='w-full min-h-[80%] bg-[#0D1011]'>
            <div className='w-11/12 max-w-[470px] mx-auto pt-36 pb-20 flex flex-col gap-y-2 justify-center items-center'>
                <div className='text-white text-2xl mb-2 text-center'><span className='text-5xl font-bold'>404</span><br />Page Not Found!</div>
                <Img src={pageNotFoundImg} />
            </div>
        </div>
    );
};

export default pageNotFound;