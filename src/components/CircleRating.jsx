import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleRating = ({ rating }) => {
    return (
        <div className='w-[50px] h-[50px] relative  bg-gray-300 rounded-full p-[2px]'>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    textSize: '40px',
                    textColor: 'black',
                    pathColor:
                        rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green'
                })}
            />
        </div>
    );
};

export default CircleRating;