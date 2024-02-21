import React, { useEffect, useContext, useState } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from './Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Genre from './Genre';
import Header from './Header';
import { Pagebtn } from './Pagebtn';
import { FaFilter } from 'react-icons/fa'; // Import filter icon

function Movies() {
    const { movies, loader, page, setPage, totalPage, setMovies, activegenre, filteredGenre } = useContext(Contextpage);
    const [sortBy, setSortBy] = useState('latest'); // State for handling sorting option
    const [showDropdown, setShowDropdown] = useState(false); // State for controlling dropdown visibility

    useEffect(() => {
        setPage(1); // Reset Page to 1 on initial render.
    }, []);

    useEffect(() => {
        setMovies([]); // Reset movies on genre change so that movies of other genres will not appear at the top.
        setPage(0);
    }, [activegenre]);

    useEffect(() => {
        if (page > 0) {
            filteredGenre(); // Fetch filtered genre when page changes and only if page is greater than 0.
        }
    }, [page]);

    // Function to handle sorting based on the selected option
    const handleSort = (option) => {
        setSortBy(option);
        // Implement sorting logic here
        // For simplicity, I'm assuming 'movies' is an array of objects with 'release_date' and 'ratings' properties
        let sortedMovies = [...movies];
        if (option === 'latest') {
            sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        } else if (option === 'oldest') {
            sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        } else if (option === 'mostRated') {
            sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
        } else if (option === 'leastRated') {
            sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
        }
        setMovies(sortedMovies);
    };

    return (
        <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
            <Genre />
            <Header />
            <div className="flex justify-end mb-4">
                {/* Filter button with logo */}
                <div className="relative inline-block text-left">
                    <div>
                        <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <FaFilter className="mr-2" /> Filter
                        </button>
                    </div>
                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button onClick={() => handleSort('latest')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Latest</button>
                                <button onClick={() => handleSort('oldest')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Oldest</button>
                                <button onClick={() => handleSort('mostRated')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Most Rated</button>
                                <button onClick={() => handleSort('leastRated')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Least Rated</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <motion.div layout className="flex flex-wrap relative justify-evenly md:justify-around">
                <AnimatePresence>
                    {loader ? <span className="loader m-10"></span> :
                        <>
                            {movies.map((movie) => (
                                <Moviecard key={movie.id} movie={movie} />
                            ))}
                        </>
                    }
                </AnimatePresence>
            </motion.div>
            <Pagebtn />
        </div>
    );
}

export default Movies;
