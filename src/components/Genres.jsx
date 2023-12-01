import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data }) => {

    const { genres } = useSelector((state) => state.home);

    return (
        <div className='flex flex-wrap gap-2 max-[1100px]:hidden'>
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return <div key={g} className='text-white bg-[#E60E83] text-[12px] px-[5px] py-[3px] h-fit rounded-sm whitespace-nowrap'>
                    {genres[g]?.name}
                </div>;
            })}
        </div>
    );
};

export default Genres;