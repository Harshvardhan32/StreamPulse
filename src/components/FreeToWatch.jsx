import React, { useState } from 'react';
import SwitchTab from './SwitchTab';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const FreeToWatch = () => {

    const [endPoint, setEndPoint] = useState('movie');
    const { data, loading } = useFetch(`/${endPoint}/upcoming`);

    function onTabChange(tab, index) {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
        // console.log(data);
    }
    console.log(data);
    return (
        <div className='flex flex-col gap-y-5'>
            <div className='flex justify-between'>
                <p className='text-white text-2xl font-bold'>Free To Watch</p>
                <SwitchTab data={['Movies', 'TV Shows']}
                    onTabChange={onTabChange}
                />
            </div>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    );
};

export default FreeToWatch;