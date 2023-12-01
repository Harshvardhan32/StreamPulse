import React, { useState } from 'react';
import SwitchTab from './SwitchTab';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const TopRated = () => {

    const [endPoint, setEndPoint] = useState('movie');
    const { data, loading } = useFetch(`/${endPoint}/top_rated`);

    function onTabChange(tab, index) {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
        // console.log(data);
    }
    // console.log(data);
    return (
        <div className='flex flex-col gap-y-5'>
            {
                data?.results?.length > 0 &&
                <>
                    <div className='flex justify-between items-center'>
                        <p className='text-white text-2xl font-bold'>Top Rated</p>
                        <SwitchTab data={['Movies', 'TV Shows']}
                            onTabChange={onTabChange}
                        />
                    </div>
                    <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
                </>
            }
        </div>
    );
};

export default TopRated;