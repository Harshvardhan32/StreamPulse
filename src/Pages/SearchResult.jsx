import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';

const SearchResult = () => {

    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    function fetchInitialData() {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            });
    }

    function fetchNextPageData() {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res?.results]
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            });
        setLoading(false);
    }

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className='bg-[#0d1011] pt-24 pb-8 min-h-screen'>
            <div className='flex w-full h-full justify-center items-center text-white'>
                {loading && <Spinner />}
            </div>
            <div className='w-11/12 max-w-[1500px] mx-auto'>
                {!loading &&
                    data?.results?.length > 0 ? (
                    <div className='flex flex-col gap-y-3'>
                        <div className='text-white text-2xl capitalize font-bold'>
                            {`Search ${data?.total_results?.length > 1 ? 'results' : 'result'} of '${query}'`}
                        </div>
                        <InfiniteScroll
                            className="flex gap-x-3 gap-y-6 flex-wrap justify-center pt-5"
                            dataLength={data?.results?.length || []}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                            loader={<Spinner />}
                        >
                            {data.results.map((item, index) => {
                                if (item?.media_type === 'person') return;
                                return <MovieCard data={item} key={index} fromSearch={true} />;
                            })}

                        </InfiniteScroll>
                    </div>
                ) :
                    <div className='w-full text-white text-2xl text-center font-bold pt-5'>
                        Sorry, Result Not Found!
                    </div>
                }
            </div>
        </div >
    );
};

export default SearchResult;