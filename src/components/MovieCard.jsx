import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from '../components/LazyLoad/Img';
import Genres from '../components/Genres';
import CircleRating from '../components/CircleRating';
import PosterFallback from '../Image/no-poster.png';

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    const title = data?.title?.length > 13 ? data?.title.substring(0, 13) + "..." : data?.title;
    const name = data?.name?.length > 13 ? data?.name.substring(0, 13) + "..." : data?.name;

    return (
        <div className="flex flex-col gap-y-10 w-[195px] max-[480px]:w-[140px] cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() =>
                navigate(`/${data?.media_type || mediaType}/${data?.id}`)
            }
        >
            <div className="relative">
                <Img src={posterUrl} />
                {!fromSearch && (
                    <div className="flex absolute w-full -bottom-6 px-1 gap-x-2 justify-between">
                        <CircleRating rating={data?.vote_average.toFixed(1)} />
                        <Genres data={data?.genre_ids.slice(0, 1)} />
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-100">{title || name}</span>
                <span className="text-xl text-white opacity-30">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;