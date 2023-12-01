import React, { useState } from 'react';
import SwitchTab from './SwitchTab';
import useFetch from '../hooks/useFetch';
import Carousel from './Carousel';

const Upcoming = () => {

    const [endPoint, setEndPoint] = useState('movie');
    const { data, loading } = useFetch(`/${endPoint}/upcoming`);

    function onTabChange() {
        setEndPoint('movie');
        console.log(data);
        // console.log(data);
    }
    // console.log(data);
    return (
        <div className='flex flex-col gap-y-5'>
            {
                data?.results?.length > 0 &&
                <>
                    <div className='flex justify-between items-center'>
                        <p className='text-white text-2xl font-bold'>Upcoming Movies</p>
                        <SwitchTab data={['Movies']}
                            onTabChange={onTabChange}
                        />
                    </div>
                    <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
                </>
            }
        </div>
    );
};

export default Upcoming;