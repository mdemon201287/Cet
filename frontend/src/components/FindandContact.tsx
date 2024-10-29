// frontend/src/components/FindandContact.tsx


import React from 'react';

const FindandContact = () => {
    return (
        <section>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 py-10 lg:px-28 bg-[#EEEEEE]">
                {/* Find Text */}
                <div className="lg:w-2/3 mb-6 lg:mb-0">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 lg:leading-[4rem]">
                        Find and contact 17,814 top Dev agencies in one place
                    </h1>
                    <p className="mt-3 text-lg lg:text-xl lg:leading-[2rem] text-gray-700">
                        Verified client reviews help you decide on the best fit partner<br />
                        Reports, research and data that brings the marketing industry to life
                    </p>
                </div>

                {/* Find Button */}
                <div className="w-full lg:w-auto">
                    <button className="btn btn-outline px-6 py-2 rounded-md flex items-center shadow-lg justify-center w-full lg:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FindandContact;