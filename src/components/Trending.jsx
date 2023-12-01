import React, { useState } from 'react';
import SwitchTab from './SwitchTab';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const Trending = () => {

    const [endPoint, setEndPoint] = useState('day');
    const { data, loading } = useFetch(`/trending/all/${endPoint}`);

    function onTabChange(tab, index) {
        setEndPoint(tab === 'Day' ? 'day' : 'week');
        // console.log(data);
    }
    // console.log(data);
    return (
        <div className='flex flex-col gap-y-5'>
            {
                data?.results?.length > 0 &&
                <>
                    <div className='flex justify-between items-center'>
                        <p className='text-white text-2xl font-bold'>Trending</p>
                        <SwitchTab data={['Day', 'Week']}
                            onTabChange={onTabChange}
                        />
                    </div>
                    <Carousel data={data?.results} loading={loading} />
                </>
            }
        </div>
    );
};

export default Trending;