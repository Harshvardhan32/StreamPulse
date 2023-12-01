// import FreeToWatch from '../components/FreeToWatch';
import HeroBanner from '../components/HeroBanner';
import Trending from '../components/Trending';
import Upcoming from '../components/Upcoming';
import Popular from '../components/Popular';
import TopRated from '../components/TopRated';

const Home = () => {

    return (
        <div className='bg-[#0d1011] pt-20 pb-8 min-h-[80%]'>
            <div className='w-11/12 flex flex-col gap-y-10 mx-auto max-w-[1500px]'>
                <HeroBanner />
                <Trending />
                <Upcoming />
                <Popular />
                <TopRated />
                {/* <FreeToWatch /> */}
            </div>
        </div >
    );
};

export default Home;