import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className="w-full rounded-lg z-0"
            alt=""
            effect="blur"
            src={src}
        />
    );
};

export default Img;