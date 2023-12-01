import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import useFetch from '../hooks/useFetch';
import { fetchDataFromApi } from "../utils/api";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        setLoading(true);
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res?.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
        setLoading(false);
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: '#04152f', width: '200px', minWidth: '80px', borderRadius: '40px', paddingLeft:'8px', paddingRight:'5px' }),
        multiValue: (styles) => ({ ...styles, backgroundColor: '#020c1b', borderRadius: '40px' }),
        multiValueLabel: (styles) => ({ ...styles, color: '#d9d9d9' }),
        multiValueRemove: (styles) => ({
            ...styles, color: '#d9d9d9', ":hover": { color: '#b3b3b3', backgroundColor: "#020c1b" }
        })
    };

    return (
        <div className="bg-[#0d1011] pt-24 pb-8 min-h-screen">
            <div className="w-11/12 flex flex-col gap-y-5 mx-auto max-w-[1500px]">
                <div className="flex justify-between gap-3 max-[520px]:flex-col max-[520px]:flex-wrap max-[520px]:mx-auto">
                    <div className="text-white text-2xl text-center font-bold">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            styles={colorStyles}
                            placeholder="Select genres"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            styles={colorStyles}
                            isClearable={true}
                            placeholder="Sort by"
                        />
                    </div>
                </div>
                {loading && <Spinner />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="flex gap-x-3 gap-y-6 flex-wrap justify-center pt-5"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="w-full text-white text-2xl text-center font-bold pt-5">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Explore;