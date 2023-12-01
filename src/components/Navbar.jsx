import React, { useState } from 'react';
import Logo from '../Image/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardVoice } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Login from './login';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    // const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' }, true);
    // const stopListening = () => SpeechRecognition.stopListening(false);
    // const { transcript } = useSpeechRecognition();

    // transcript && setQuary(transcript) || 

    const [input, setInput] = useState({
        inputValue: ''
    });

    // if (!browserSupportSpeechRecognition) {

    // }

    const [mobileMenu, setMobileMenu] = useState(false);
    const [quary, setQuary] = useState('');
    const navigate = useNavigate();

    function searchQuaryHandler(event) {
        if (event.key === 'Enter' && quary?.length > 0) {
            navigate(`/search/${quary}`);
            setMobileMenu(false);
        }
    }

    function navigationHandler(type) {
        if (type === 'home') {
            navigate('/');
        }
        else if (type === 'movie') {
            navigate('/explore/movie');
        }
        else if (type === 'tv') {
            navigate('/explore/tv');
        }
        setMobileMenu(false);
    }

    return (
        <div className='bg-black py-1 w-full fixed flex z-[100]'>
            <div className='w-11/12 max-w-[1500px] mx-auto flex gap-x-5 justify-between items-center'>
                <div>
                    <Link to='/'>
                        <img src={Logo} alt="" className='w-[230px]' />
                    </Link>
                </div>

                <div className='max-[1150px]:hidden'>
                    <div className='text-white flex gap-x-8'>
                        <p onClick={() => navigationHandler('home')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>Home</p>
                        {/* <p onClick={() => navigationHandler('movie')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>Web Series</p> */}
                        <p onClick={() => navigationHandler('movie')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>Movies</p>
                        <p onClick={() => navigationHandler('tv')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>TV Shows</p>
                    </div>
                </div>

                <div className='flex gap-x-8 items-center max-[1150px]:hidden'>
                    <label className='relative z-50'>
                        <input type="text"
                            onChange={(e) => setQuary(e.target.value)}
                            value={input.value}
                            onKeyUp={searchQuaryHandler}
                            placeholder='Search'
                            className='max-w-[240px] text-white rounded-full py-[7px] pl-6 pr-14 bg-black border border-gray-400 text-xl font-semibold outline-none focus:border-gray-100' />
                        <button className='absolute right-4 top-1 p-1'><MdKeyboardVoice fill='#fff' fontSize='1.7rem' /></button>
                    </label>
                    <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMobileMenu={setMobileMenu} />
                </div>
                <button className='hidden max-[1150px]:block'>
                    {mobileMenu
                        ? <ImCross className='text-white transition-all duration-200' fontSize='1.6rem' onClick={() => setMobileMenu(false)} />
                        : <GiHamburgerMenu fill='#fff' fontSize='2.2rem' onClick={() => setMobileMenu(true)} />
                    }
                </button>
            </div>
            <div className='hidden max-[1150px]:block'>
                <div className='absolute right-0 top-[65px] max-[300px]:top-[52px] max-[300px]:w-[300px] pl-20'>
                    {
                        mobileMenu &&
                        <div className='bg-black flex flex-col gap-y-5 h-screen pl-10 pr-10 pt-5'>
                            <label className='relative z-50 pl-0'>
                                <input type="text"
                                    onChange={(e) => setQuary(e.target.value)}
                                    onKeyUp={searchQuaryHandler}
                                    placeholder='Search'
                                    className='max-w-[240px] max-[300px]:w-[160px] text-white rounded-full py-[7px] pl-6 pr-14 bg-black border border-gray-400 text-xl font-semibold outline-none focus:border-gray-100' />
                                <button className='absolute max-[300px]:-right-1 right-4 top-1 p-1'><MdKeyboardVoice fill='#fff' fontSize='1.7rem' /></button>
                            </label>
                            <div className='text-white flex flex-col gap-y-4'>
                                <p onClick={() => navigationHandler('home')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>Home</p>
                                {/* <p onClick={() => navigationHandler('movie')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>Web Series</p> */}
                                <p onClick={() => navigationHandler('movie')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>Movies</p>
                                <p onClick={() => navigationHandler('tv')} className='text-lg cursor-pointer font-semibold transition-all duration-200 hover:text-[#E60E83]'>TV Shows</p>
                            </div>

                            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMobileMenu={setMobileMenu} />

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;;