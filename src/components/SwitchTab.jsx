import React, { useState } from 'react';

const SwitchTab = ({ data, onTabChange }) => {

    const [selectedTab, setSelectedTab] = useState(0);

    function activeTab(tab, index) {
        setSelectedTab(index);
        onTabChange(tab, index);
    }


    return (
        <div>
            <div className='flex gap-x-3 cursor-pointer bg-gray-900 rounded-full font-semibold'>
                {
                    data.map((tab, index) => (
                        <button key={index}
                            className={`${selectedTab === index ? 'bg-[#E60E83] py-3 px-6 rounded-full text-slate-100' : 'py-3 px-6 rounded-full text-slate-400'}`}
                            onClick={() => activeTab(tab, index)}
                        >{tab}</button>
                    ))
                }
            </div>
        </div>
    );
};

export default SwitchTab;