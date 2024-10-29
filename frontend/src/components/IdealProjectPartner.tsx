// frontend/src/components/IdealProjectSection.tsx

import React from 'react';

const IdealProjectSection: React.FC = () => {
    return (
        <section>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-20 px-4 sm:px-6 lg:px-28">
                {/* Ideal Project Text */}
                <div className="lg:w-2/3">
                    <h1 className="text-3xl lg:leading-[4rem] font-bold text-gray-900 lg:text-4xl">
                        Your Ideal Project Partner
                    </h1>
                    <p className="mt-3 text-lg lg:leading-[2rem] text-gray-700">
                        No matter your business challenge, explore our top service categories to connect with leading companies
                        across 1,500+ specialized service lines. Find your perfect partner and achieve your goals with confidence.
                    </p>
                </div>
                {/* View All Button */}
                <div className="w-full lg:w-auto mt-6 lg:mt-0">
                    <button className="w-full btn btn-outline px-6 py-2 rounded-md flex items-center shadow-lg justify-center">
                        View All Categories
                    </button>
                </div>
            </div>

            {/* Grids */}
            <div className="grid grid-cols-1 mt-8 px-4 sm:px-6 lg:px-28 pr-4 sm:pr-20 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Development Card */}
                <div className="card bg-base-100 shadow-md">
                    <div className="rounded-lg bg-[#EEEEEE]">
                        <div className="bg-[#808080] text-white rounded-md p-4">
                            <h2 className="card-title text-lg font-bold flex items-center">
                                Development
                            </h2>
                        </div>
                        <ul className="list-disc list-inside leading-8 p-5">
                            <li>Web application</li>
                            <li>Mobile application</li>
                            <li>Web development</li>
                            <li>AR & VR Application</li>
                            <li>Artificial Intelligence</li>
                            <li>Blockchain</li>
                        </ul>
                    </div>
                </div>

                {/* Design & Production Card */}
                <div className="card bg-base-100 shadow-md">
                    <div className="rounded-lg bg-[#EEEEEE]">
                        <div className="bg-[#808080] text-white rounded-md p-4">
                            <h2 className="card-title text-lg font-bold flex items-center">
                                Design & Production
                            </h2>
                        </div>
                        <ul className="list-disc list-inside leading-8 p-5">
                            <li>Web Design</li>
                            <li>User Experience Design</li>
                            <li>Brand Design</li>
                            <li>User Interface Design</li>
                            <li>Social Media Design</li>
                            <li>Document Design</li>
                        </ul>
                    </div>
                </div>

                {/* Marketing Card */}
                <div className="card bg-base-100 shadow-md">
                    <div className="rounded-lg bg-[#EEEEEE]">
                        <div className="bg-[#808080] text-white rounded-md p-4">
                            <h2 className="card-title text-lg font-bold flex items-center">
                                Marketing
                            </h2>
                        </div>
                        <ul className="list-disc list-inside leading-8 p-5">
                            <li>Digital Marketing</li>
                            <li>SEO</li>
                            <li>Social Media Marketing</li>
                            <li>Mobile Marketing</li>
                            <li>Content Marketing</li>
                            <li>Search Marketing</li>
                        </ul>
                    </div>
                </div>

                {/* Advertising Card */}
                <div className="card bg-base-100 shadow-md">
                    <div className="rounded-lg bg-[#EEEEEE]">
                        <div className="bg-[#808080] text-white rounded-md p-4">
                            <h2 className="card-title text-lg font-bold flex items-center">
                                Advertising
                            </h2>
                        </div>
                        <ul className="list-disc list-inside leading-8 p-5">
                            <li>Advertising</li>
                            <li>Branding</li>
                            <li>Creative</li>
                            <li>Video Production</li>
                            <li>Public Relations</li>
                            <li>Media Planning & Buying</li>
                        </ul>
                    </div>
                </div>

                {/* Business Services Card */}
                <div className="card bg-base-100 shadow-md">
                    <div className="rounded-lg bg-[#EEEEEE]">
                        <div className="bg-[#808080] text-white rounded-md p-4">
                            <h2 className="card-title text-lg font-bold flex items-center">
                                Business Services
                            </h2>
                        </div>
                        <ul className="list-disc list-inside leading-8 p-5">
                            <li>Web application</li>
                            <li>Mobile application</li>
                            <li>Web development</li>
                            <li>AR & VR Application</li>
                            <li>Artificial Intelligence</li>
                            <li>Blockchain</li>
                        </ul>
                    </div>
                </div>

                {/* IT Services Card */}
                <div className="card bg-base-100 shadow-md">
                    <div className="rounded-lg bg-[#EEEEEE]">
                        <div className="bg-[#808080] text-white rounded-md p-4">
                            <h2 className="card-title text-lg font-bold flex items-center">
                                IT Services
                            </h2>
                        </div>
                        <ul className="list-disc list-inside leading-8 p-5">
                            <li>Web application</li>
                            <li>Mobile application</li>
                            <li>Web development</li>
                            <li>AR & VR Application</li>
                            <li>Artificial Intelligence</li>
                            <li>Blockchain</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IdealProjectSection;
