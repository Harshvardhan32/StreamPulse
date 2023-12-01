import React from "react";
import Carousel from "./Carousel";
import useFetch from "../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <div>
            {
                data?.results?.length > 0 &&
                <Carousel
                    title={title}
                    data={data?.results}
                    loading={loading}
                    endPoint={mediaType}
                />
            }
        </div>
    );
};

export default Similar;