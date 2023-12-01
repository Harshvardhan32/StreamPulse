import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {

    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };

    return (
        <div className={`flex w-full h-full justify-center fixed items-center top-0 left-0 z-[10] ${show ? "block opacity-100" : "hidden opacity-0"}`} onClick={hidePopup}>
            <div className="flex absolute top-0 left-0 w-11/12 mx-auto h-full max-w-[1500px] bg-gray-800 opacity-50 blur-2xl z-[20]" onClick={hidePopup}></div>
            <div className="w-8/12 items-center aspect-video z-[30] transition-all duration-300 ease-linear">
                <span className="text-white text-2xl cursor-pointer" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;