import React from 'react';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../components/LazyLoad/Img';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import Genres from './Genres';
import CircleRating from './CircleRating';
import ReactStars from 'react-stars';
import dayjs from "dayjs";

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
                <Img src={banner} />
            }
        </div >
    );
};

export default HeroBanner;