// import React, { useEffect, useContext } from 'react'
// import Contextpage from '../Contextpage';
// import Moviecard from '../components/Moviecard';
// import { motion, AnimatePresence } from 'framer-motion';
// import Header from '../components/Header';
// // import { Pagebtn } from '../components/Pagebtn';
// import { Link, useParams } from 'react-router-dom'
// import { HiChevronLeft } from "react-icons/hi";


// function Search() {

//     const { searchedMovies, loader, page, setPage, totalPage, setMovies, activegenre, filteredGenre, fetchSearch } = useContext(Contextpage);
//     const { query } = useParams()

//     useEffect(() => {
//         // Call fetchSearch(query) only once when the component mounts
//         fetchSearch(query);
//     }, [query]);

//     return (
//         <section>
//             <Link to="/" className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></Link>
//             <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
//                 <Header />
//                 <motion.div
//                     layout
//                     className="flex flex-wrap relative justify-evenly md:justify-around">
//                     <AnimatePresence>
//                         {
//                             loader ? <span className="loader m-10"></span> :
//                                 <>
//                                         {searchedMovies.map((movie) => (
//                                             <Moviecard key={movie.id} movie={movie} />
//                                         ))}
//                                 </>
//                         }
//                     </AnimatePresence>
//                 </motion.div>
//                 {/* <Pagebtn /> */}

//             </div>
//         </section>

//     )
// }

// export default Search


//   `https://api.themoviedb.org/3/trending/all/day?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&page=${page}`


// import React, { useEffect, useContext } from 'react';
// import Contextpage from '../Contextpage';
// import Moviecard from '../components/Moviecard';
// import { motion, AnimatePresence } from 'framer-motion';
// import Header from '../components/Header';
// import { Link, useParams } from 'react-router-dom';
// import { HiChevronLeft } from "react-icons/hi";
// import { Pagebtn } from '../components/Pagebtn'; // Import Pagebtn component

// function Search() {
//     const { searchedMovies, loader, totalPage, fetchSearch, setPage, page } = useContext(Contextpage);
//     const { query } = useParams();

//     useEffect(() => {
//         // Call fetchSearch with query and page number
//         fetchSearch(query, page);
//     }, [query, page]);

//     return (
//         <section>
// <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
//             <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
//                 <Header />
//                 <motion.div layout className="flex flex-wrap relative justify-evenly md:justify-around">
//                     <AnimatePresence>
//                         {loader ? <span className="loader m-10"></span> :
//                             searchedMovies.map((movie) => (
//                                 <Moviecard key={movie.id} movie={movie} />
//                             ))}
//                     </AnimatePresence>
//                 </motion.div>
//                 <Pagebtn />
//             </div>
//         </section>
//     );
// }

// export default Search;



// import React, { useEffect, useContext, useState } from 'react';
// import Contextpage from '../Contextpage';
// import Moviecard from '../components/Moviecard';
// import { motion, AnimatePresence } from 'framer-motion';
// import Header from '../components/Header';
// import { Link, useParams } from 'react-router-dom';
// import { HiChevronLeft } from "react-icons/hi";
// import { Pagebtn } from '../components/Pagebtn';
// import { FaFilter } from 'react-icons/fa'; // Import filter icon


// function Search() {
//     const { searchedMovies, loader, totalPage, fetchSearch, setPage, page } = useContext(Contextpage);
//     const { query } = useParams();
//     const [sortBy, setSortBy] = useState('latest'); // State for handling sorting option
//     const [showDropdown, setShowDropdown] = useState(false); // State for controlling dropdown visibility

//     useEffect(() => {
//         // Call fetchSearch with query and page number
//         fetchSearch(query, page);
//     }, [query, page]);

//     // Function to handle sorting based on the selected option
//     const handleSort = (option) => {
//         setSortBy(option);
//         let sortedMovies = [...searchedMovies];
//         if (option === 'latest') {
//             sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
//         } else if (option === 'oldest') {
//             sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
//         } else if (option === 'mostRated') {
//             sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
//         } else if (option === 'leastRated') {
//             sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
//         }
//         // Update the context with the sorted movies
//         setSearchedMovies(sortedMovies);
//     };
    

//     return (
//         <section>
//             <button onClick={() => history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
//             <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
//                 <Header />
//                 <div className="flex justify-end mb-4">
//                     <div className="relative inline-block text-left">
//                         <div>
//                         <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                             <FaFilter className="mr-2" /> Filter
//                         </button>
//                         </div>
//                         {showDropdown && (
//                             <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//                                 <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                                     <button onClick={() => handleSort('latest')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Latest</button>
//                                     <button onClick={() => handleSort('oldest')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Oldest</button>
//                                     <button onClick={() => handleSort('mostRated')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Most Rated</button>
//                                     <button onClick={() => handleSort('leastRated')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Least Rated</button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <motion.div layout className="flex flex-wrap relative justify-evenly md:justify-around">
//                     <AnimatePresence>
//                         {loader ? <span className="loader m-10"></span> :
//                             searchedMovies.map((movie) => (
//                                 <Moviecard key={movie.id} movie={movie} />
//                             ))}
//                     </AnimatePresence>
//                 </motion.div>
//                 <Pagebtn />
//             </div>
//         </section>
//     );
// }

// export default Search;



import React, { useEffect, useContext, useState } from 'react';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import { HiChevronLeft } from "react-icons/hi";
import { Pagebtn } from '../components/Pagebtn';
import { FaFilter } from 'react-icons/fa';
import Navbar from '../components/Navbar';

function Search() {
    const { searchedMovies, loader, totalPage, fetchSearch, setPage, page } = useContext(Contextpage);
    const { query } = useParams();
    const [sortBy, setSortBy] = useState('latest'); // State for handling sorting option
    const [showDropdown, setShowDropdown] = useState(false); // State for controlling dropdown visibility
    const [sortedMovies, setSortedMovies] = useState([]); // State for storing sorted movies

    useEffect(() => {
        // Call fetchSearch with query and page number
        fetchSearch(query, page);
    }, [query, page]);

    useEffect(() => {
        // Sort the movies whenever sortBy or searchedMovies changes
        sortMovies();
    }, [sortBy, searchedMovies]);

    // Function to handle sorting based on the selected option
    const handleSort = (option) => {
        setSortBy(option);
    };

    // Function to sort the movies based on the selected option
    const sortMovies = () => {
        let sortedMoviesList = [...searchedMovies];
        switch (sortBy) {
            case 'latest':
                sortedMoviesList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'oldest':
                sortedMoviesList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
            case 'mostRated':
                sortedMoviesList.sort((a, b) => b.vote_average - a.vote_average);
                break;
            case 'leastRated':
                sortedMoviesList.sort((a, b) => a.vote_average - b.vote_average);
                break;
            default:
                break;
        }
        // Update the state with sorted movies
        setSortedMovies(sortedMoviesList);
    };

    return (
        <section>
            <Navbar/>
            <br/>
          <br/>
            <button onClick={() => history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>
            <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
                <Header />
                <div className="flex justify-end mb-4">
                    <div className="relative inline-block text-left">
                        <div>
                            <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <FaFilter className="mr-2" /> Filter
                            </button>
                        </div>
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
                            sortedMovies.map((movie) => (
                                <Moviecard key={movie.id} movie={movie} />
                            ))}
                    </AnimatePresence>
                </motion.div>
                <Pagebtn />
            </div>
        </section>
    );
}

export default Search;
