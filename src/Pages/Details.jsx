import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import DetailsBanner from '../components/DetailsBanner';
import Cast from '../components/Cast';
import VideosSection from '../components/VideoSection';
import Similar from '../components/Similar';
import Recommendation from '../components/Recommendation';

const Details = () => {

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    return (
        <div className='bg-[#0d1011] pt-20 min-h-screen pb-8'>
            <div className='w-11/12 flex flex-col gap-y-10 mx-auto max-w-[1500px]'>
                <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
                <Cast data={credits?.cast} loading={creditsLoading} />
                <VideosSection data={data} loading={loading} />
                <Similar mediaType={mediaType} id={id} />
                <Recommendation mediaType={mediaType} id={id} />
            </div>
        </div>
    );
};

export default Details;