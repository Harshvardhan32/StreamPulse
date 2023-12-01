import React from "react";
import { useSelector } from "react-redux";
import avatar from '../Image/avatar.png';
import Img from "./LazyLoad/Img";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
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
            <div>
                <div className="text-2xl font-semibold text-white mb-5">Top Cast</div>
                {!loading ? (
                    <div className="flex gap-x-8 overflow-x-scroll overflow-hidden scroll-smooth">
                        {data?.map((item) => {

                            let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;

                            return (
                                <div key={item.id} className="flex flex-col gap-y-2 text-center">
                                    <div className="w-[155px] h-[155px] relative object-fill rounded-full overflow-hidden z-[0.2]">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="font-semibold w-[155px] text-white">{item.name}</div>
                                    <div className="font-medium w-[155px] text-gray-600">{item.character}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cast;