import React, { useState } from "react";
import VideoPopup from "./VideoPopup";
import Img from "./LazyLoad/Img";
import { PlayIcon } from "./PlayIcon";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="">
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-y-4">
            {
                data?.results?.length > 0 &&
                <>
                    <div className="text-2xl font-semibold text-white mb-5">Official Videos</div>
                </>
            }
            {!loading ? (
                <div className="flex gap-x-3 overflow-x-scroll scroll-smooth overflow-hidden">
                    {data?.results?.map((video) => (
                        <div key={video.id}
                            onClick={() => {
                                setVideoId(video.key);
                                setShow(true);
                            }}
                        >
                            <div className="h-[168px] aspect-video cursor-pointer relative">
                                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                <div className="absolute top-[54px] w-full h-full left-[120px] text-gray-100 transition-all duration-500 ease-in-out hover:text-pink-700">
                                    <PlayIcon />
                                </div>
                            </div>
                            <div className="font-semibold max-w-[300px] text-white mt-4 leading-6">
                                {video.name}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="videoSkeleton">
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                    {loadingSkeleton()}
                </div>
            )}
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />

        </div>
    );
};

export default VideosSection;
