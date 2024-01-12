import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from '../src/components/Navbar';
import Footer from './components/Footer';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import PageNotFound from './Pages/PageNotFound';
import SearchResult from './Pages/SearchResult';
import { useEffect, useState } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAPiConfiguration, getGenres } from './store/homeSlice';
import Details from './Pages/Details';
import Explore from './Pages/Explore';
import { IoCloudOfflineOutline } from "react-icons/io5";
import Logo from './Image/Logo.svg';
import { Offline, Online } from "react-detect-offline";

function App() {

    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchApiConfig();
        genres();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi('/configuration').then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + 'original',
                profile: res.images.secure_base_url + 'original',
            };

            dispatch(getAPiConfiguration(url));
        });
    };

    const genres = async () => {
        let promises = [];
        let endPoints = ['tv', 'movie'];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);

        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <div className='h-screen'>

            <Online>
                <div className='h-full'>
                    <div>
                        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    </div>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/signup' element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path='/search/:query' element={<SearchResult />} />
                        <Route path='/explore/:mediaType' element={<Explore />} />
                        <Route path='/:mediaType/:id' element={<Details />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                    <div>
                        <Footer />
                    </div>
                </div>
            </Online>

            <Offline >
                <div className='h-full bg-[#0d1011] text-white flex flex-col gap-4 items-center justify-center w-full'>
                    <div className='max-w-[400px]'>
                        <img src={Logo} alt="" className='full' />
                    </div>
                    <p className='text-3xl flex flex-row items-center gap-4'><IoCloudOfflineOutline /> You're offline</p>

                </div>
            </Offline>

        </div>
    );
}

export default App;