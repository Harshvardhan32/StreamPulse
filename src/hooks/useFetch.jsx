import { useState, useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api';
import toast from 'react-hot-toast';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading('Loading...');
        setData(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            }).catch(() => {
                setLoading(false);
                toast.error("Something went wrong!");
            });
    }, [url]);

    return { data, loading };
};

export default useFetch;