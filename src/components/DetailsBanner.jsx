import React, { useState } from "react";
import PosterFallback from '../Image/no-poster.png';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UseFatch from "../hooks/useFetch";
import dayjs from "dayjs";
import Img from "./LazyLoad/Img";
import Genres from "./Genres";
import CircleRating from "./CircleRating";
import { PlayIcon } from "./PlayIcon";
import VideoPopup from "./VideoPopup";

const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = UseFatch(`/${mediaType}/${id}`);
    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f?.job === 'Director');
    const writer = crew?.filter((f) => f?.job === "Screenplay" || f?.job === "Stroy" || f?.job === "Writer");

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const background = url?.backdrop + data?.backdrop_path;

    console.log(background);

    // style={`background-image:url('${background}')`

    return (
        <div>
            {!loading ? (
                <div className={`h-fit w-full min-[1100px]:p-10 p-2 rounded-lg overflow-hidden`} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 1.5)),url(${background})`}}>
                    <div className='flex gap-x-8 max-[1100px]:flex-col max-[1100px]:gap-y-4'>
                        <div className="max-w-[360px] min-w-[300px] max-[1100px]:max-w-[260px] max-[327px]:min-w-[150px]">
                            {data?.poster_path ? (<Img src={url?.backdrop + data?.poster_path} />)
                                : (<Img src={PosterFallback} />)}
                        </div>

                        <div className="flex flex-col gap-y-4 pb-5">
                            <div className="text-white text-2xl font-bold">
                                {`${data?.title || data?.name} (${dayjs(data?.release_date).format('YYYY')})`}
                            </div>

                            <div className="text-gray-500">{data?.tagline}</div>

                            <div className="mb-2">
                                <Genres data={_genres} />
                            </div>

                            <div className="flex gap-x-6 gap-y-3 max-[325px]:flex-col">
                                <div className="mt-[8px]">
                                    <CircleRating rating={data?.vote_average?.toFixed(1)} />
                                </div>
                                <div className="text-white flex items-center gap-x-[20px] cursor-pointer transition-all duration-500 ease-in-out hover:text-pink-700"
                                    onClick={() => {
                                        setShow(true);
                                        setVideoId(video?.key);
                                    }}
                                >
                                    <PlayIcon />
                                    <span className="text-xl font-semibold">Watch Trailer</span>
                                </div>
                            </div>

                            <div className="text-white">
                                <div className="text-2xl font-semibold mb-2">
                                    Overview
                                </div>
                                <div className="text-lg text-justify">
                                    {data?.overview}
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between gap-3">
                                {data?.status && (
                                    <div className="flex flex-col gap-y-1">
                                        <span className="text-white text-xl font-semibold">
                                            Status: {" "}
                                        </span>
                                        <span className="text-gray-500 font-semibold text-md">
                                            {data?.status}
                                        </span>
                                    </div>
                                )}

                                {data?.release_date && (
                                    <div className="flex flex-col gap-y-1">
                                        <span className="text-white text-xl font-semibold">
                                            Release Date: {" "}
                                        </span>
                                        <span className="text-gray-500 font-semibold text-md">
                                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                )}
                                {data?.runtime && (
                                    <div className="flex flex-col gap-y-1">
                                        <span className="text-white text-xl font-semibold">
                                            Runtime: {" "}
                                        </span>
                                        <span className="text-gray-500 font-semibold text-md">
                                            {toHoursAndMinutes(data?.runtime)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-[.2px] bg-slate-500"></div>

                            <div className="flex flex-col gap-y-2">
                                {director?.length > 0 && (
                                    <div className="flex gap-x-3 items-center">
                                        <span className="text-white text-xl font-semibold">Director:{" "}</span>
                                        <span className="text-gray-500 font-semibold text-md">
                                            {director?.map((d, i) => (
                                                <span key={i}>
                                                    {d?.name}
                                                    {director?.length - 1 !== i && ', '}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {director?.length > 0 && (
                                    <div className="w-full h-[.2px] bg-slate-500"></div>
                                )}

                                {writer?.length > 0 && (
                                    <div className="flex gap-x-3 items-center">
                                        <span className="text-white text-xl font-semibold">Writer:{" "}</span>
                                        <span className="text-gray-500 font-semibold text-md">
                                            {writer?.map((w, i) => (
                                                <span key={i}>
                                                    {w?.name}
                                                    {writer?.length - 1 !== i && ', '}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {writer?.length > 0 && (
                                    <div className="w-full h-[.2px] bg-slate-500"></div>
                                )}

                                {data?.created_by?.length > 0 && (
                                    <div className="flex gap-x-3 items-center">
                                        <span className="text-white text-xl font-semibold">Writer:{" "}</span>
                                        <span className="text-gray-500 font-semibold text-md">
                                            {data?.created_by?.map((c, i) => (
                                                <span key={i}>
                                                    {c?.name}
                                                    {data?.created_by?.length - 1 !== i && ', '}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {data?.created_by?.length > 0 && (
                                    <div className="w-full h-[.2px] bg-slate-500"></div>
                                )}

                            </div>

                        </div>
                    </div>
                    <VideoPopup
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}
                    />
                </div>
            ) : (
                <div className="">
                    <div className="skeleton"></div>
                    <div className="">
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                        <div className="skeleton"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;