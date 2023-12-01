import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import Img from './LazyLoad/Img';
import PosterFallBack from '../Image/no-poster.png';
import dayjs from 'dayjs';
import CircleRating from './CircleRating';
import Genres from './Genres';
import '../index.css';

const Carousel = ({ data, loading, endPoint, title }) => {

    const carouselContainer = useRef();
    const { url } = useSelector((state) => (state.home));
    const navigate = useNavigate();

    function navigation(dir) {
        const container = carouselContainer.current;

        const scrollAmount = dir === 'left' ?
            (container.scrollLeft + (container.offsetWidth + 9)) :
            (container.scrollRight - (container.offsetWidth + 9));

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    const skItem = () => {
        return (
            <div className='flex flex-col h-[200px]'>
                <div className='w-[195px] skeleton'></div>
                <div>
                    <div className=' mb-4 skeleton'></div>
                    <div className='skeleton'></div>
                </div>
            </div>
        );
    };

    return (
        <div className='flex flex-col gap-y-5'>
            {data &&
                <div>
                    {title && <div className='text-white text-2xl font-bold mb-5'>{title}</div>}
                    <div className='flex justify-between relative items-center'>
                        <BsFillArrowLeftCircleFill
                            onClick={() => navigation('right')}
                            className={`${data?.length > 6 ? 'block' : 'hidden'} text-gray-500 text-2xl -translate-y-12 cursor-pointer absolute left-6 max-[1100px]:hidden z-10`}
                        />
                        {!loading ?
                            <div className="flex gap-x-3 overflow-x-scroll scroll-smooth overflow-hidden py-5" ref={carouselContainer}>
                                {data?.map((item) => {
                                    const posterUrl = item?.poster_path ?
                                        url?.poster + item?.poster_path : PosterFallBack;
                                    const title = item?.title?.length > 17 ? item?.title?.substring(0, 17) + '...' : item?.title;
                                    const name = item?.name?.length > 13 ? item?.name?.substring(0, 13) + '...' : item?.name;
                                    return (
                                        <div key={item?.id} className='flex flex-col gap-y-10 cursor-pointer hover:scale-110 transition-transform duration-300' onClick={() => navigate(`/${item?.media_type || endPoint}/${item?.id}`)}>
                                            <div className='relative w-[195px]'>
                                                <Img src={posterUrl} />
                                                <div className='flex absolute -bottom-6 w-full px-1 gap-x-2 justify-between'>
                                                    <div className=''>
                                                        <CircleRating rating={item?.vote_average?.toFixed(1)} />
                                                    </div>
                                                    <div>
                                                        <Genres data={item?.genre_ids?.slice(0, 1)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='font-bold text-lg text-gray-100'>
                                                    {title || name}
                                                </span>
                                                <span className='text-xl text-white opacity-30'>
                                                    {dayjs(item.first_air_date || item.release_date).format("MMM D, YYYY")}
                                                </span>
                                            </div>
                                        </div>);
                                })}
                            </div> :
                            <div>
                                {skItem()}
                                {skItem()}
                                {skItem()}
                                {skItem()}
                                {skItem()}
                            </div>
                        }
                        <BsFillArrowRightCircleFill
                            onClick={() => navigation('left')}
                            className={`${data?.length > 6 ? 'block' : 'hidden'} text-gray-500 text-2xl cursor-pointer -translate-y-12 cursor-pointe absolute right-6 max-[1100px]:hidden`}
                        />

                    </div>
                </div>
            }

        </div>
    );
};

export default Carousel;;;