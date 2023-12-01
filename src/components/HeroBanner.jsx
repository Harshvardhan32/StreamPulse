import React from 'react';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../components/LazyLoad/Img';


const HeroBanner = () => {

    const [banner, setBanner] = useState("");
    const { data, loading } = useFetch('/movie/upcoming');
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        const image = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBanner(image);
    }, [data]);

    return (
        <div>
            {!loading &&
                <div>
                    <Img src={banner} />
                    {/* <span className='max-w-300px text-gray-800 text-4xl text-center absolute right-[30%] top-64'>
                            Millions of movies, TV shows <br /> and people to discover
                        </span> */}
                </div>
            }
        </div>
    );
};

export default HeroBanner;