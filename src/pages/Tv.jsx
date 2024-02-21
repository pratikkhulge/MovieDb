import React, { useState, useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { Pagebtn } from '../components/Pagebtn';
import { Helmet } from 'react-helmet';
import { HiChevronLeft } from "react-icons/hi";
import { FaFilter } from 'react-icons/fa';
import Navbar from '../components/Navbar';

function Tv() {
    const { loader, page, setPage, fetchTv, tv, totalPage } = useContext(Contextpage);
    const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [filteredTv, setfilteredTv] = useState([]);

    useEffect(() => {
        setPage(1); // Reset Page to 1 on initial render.
    }, []);

    useEffect(() => {
        if (page > 0) {
            fetchTv();
        }
    }, [page]);

    useEffect(() => {
        // Apply filter when selectedFilter changes
        applyFilter();
    }, [selectedFilter, tv]);

    const handleFilterClick = () => {
        setFilterOptionsVisible(!filterOptionsVisible);
    };

    const handleFilterOptionClick = (filterOption) => {
        setSelectedFilter(filterOption);
        setFilterOptionsVisible(false);
    };

    const applyFilter = () => {
        let filteredList = [...tv];
        switch (selectedFilter) {
            case 'latest':
                filteredList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'oldest':
                filteredList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
            case 'mostRated':
                filteredList.sort((a, b) => b.vote_average - a.vote_average);
                break;
            case 'leastRated':
                filteredList.sort((a, b) => a.vote_average - b.vote_average);
                break;
            default:
                break;
        }
        setfilteredTv(filteredList);
    };

    return (
        <>
            <Helmet>
                <title>Tv Series</title>
            </Helmet>
            <Navbar/>
            <br/>
          <br/>
            <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
            <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
                <Header />
                <div className="flex justify-end pr-5">
                    <div className="relative">
                        <button onClick={handleFilterClick} className="text-white text-lg flex items-center"><FaFilter className="mr-1"/>Filter</button>
                        {filterOptionsVisible && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                                <ul>
                                    <li onClick={() => handleFilterOptionClick('latest')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Latest</li>
                                    <li onClick={() => handleFilterOptionClick('oldest')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Oldest</li>
                                    <li onClick={() => handleFilterOptionClick('mostRated')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Most Rated</li>
                                    <li onClick={() => handleFilterOptionClick('leastRated')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Least Rated</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <motion.div
                    layout
                    className="flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {loader ? (
                            <span className="loader m-10"></span>
                        ) : (
                            <>
                                <div className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                                    {filteredTv.map((tv) => (
                                        <Moviecard key={tv.id} movie={tv} />
                                    ))}
                                </div>
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
                <Pagebtn />
            </div>
        </>
    );
}

export default Tv;
