import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { HiChevronLeft } from "react-icons/hi";
import Navbar from '../components/Navbar';


function Favoritepage() {

    const { loader, GetFavorite } = useContext(Contextpage);
    const [localStorageData, setLocalStorageData] = useState([]);

    useEffect(() => {
        GetFavorite();

        const data = localStorage;
        setLocalStorageData(data);
    }, []);

    return (
        <>
          <Helmet>
            <title>Favorite Movies</title>
          </Helmet>
          <Navbar/>
          <br/>
          <br/>
            <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
            <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>

                <Header />
                <motion.div
                    layout
                    className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {
                                        Object.keys(localStorageData).filter(key => !isNaN(key)).length == 0
                                            ?
                                            <p className="text-xl text-white">No Bookmark Yet!</p>
                                            :
                                            Object.keys(localStorageData).filter(key => !isNaN(key)).map((key, index) => (<Moviecard key={index} movie={{ ...JSON.parse(localStorageData[key]) }} />))
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default Favoritepage


// import React, { useEffect, useContext, useState } from 'react';
// import Header from '../components/Header';
// import Contextpage from '../Contextpage';
// import Moviecard from '../components/Moviecard';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// import { HiChevronLeft } from "react-icons/hi";
// import { FaFilter } from 'react-icons/fa'; // Import filter icon


// function Favoritepage() {
//     const { loader, GetFavorite } = useContext(Contextpage);
//     const [localStorageData, setLocalStorageData] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false); // State for controlling dropdown visibility
//     const [sortBy, setSortBy] = useState('latest'); // State for handling sorting option

//     useEffect(() => {
//         GetFavorite();

//         const data = localStorage;
//         setLocalStorageData(data);
//     }, []);

//     // Function to handle sorting based on the selected option
//     const handleSort = (option) => {
//         setSortBy(option);
//         // Implement sorting logic here
//         let sortedMovies = Object.keys(localStorageData).filter(key => !isNaN(key)).map(key => JSON.parse(localStorageData[key]));

//         if (option === 'latest') {
//             sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
//         } else if (option === 'oldest') {
//             sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
//         } else if (option === 'mostRated') {
//             sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
//         } else if (option === 'leastRated') {
//             sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
//         }

//         setLocalStorageData(sortedMovies);
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Favorite Movies</title>
//             </Helmet>
//             <button onClick={() => history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>

//             <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
//                 <Header />
//                 <div className="flex justify-end mb-4">
//                     {/* Filter button with logo */}
//                     <div className="relative inline-block text-left">
//                         <div>
//                         <button onClick={() => setShowDropdown(!showDropdown)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                             <FaFilter className="mr-2" /> Filter
//                         </button>
//                         </div>
//                         {/* Dropdown menu */}
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
//                 <motion.div layout className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
//                     <AnimatePresence>
//                         {loader ? <span className="loader m-10"></span> :
//                             <>
//                                 {Object.keys(localStorageData).filter(key => !isNaN(key)).length === 0 ? (
//                                     <p className="text-xl text-white">No Bookmark Yet!</p>
//                                 ) : (
//                                     Object.keys(localStorageData).filter(key => !isNaN(key)).map((key, index) => (<Moviecard key={index} movie={{ ...JSON.parse(localStorageData[key]) }} />))
//                                 )}
//                             </>
//                         }
//                     </AnimatePresence>
//                 </motion.div>
//             </div>
//         </>
//     );
// }

// export default Favoritepage;




// import React, { useEffect, useContext, useState } from 'react';
// import Header from '../components/Header';
// import Contextpage from '../Contextpage';
// import Moviecard from '../components/Moviecard';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// import { HiChevronLeft } from "react-icons/hi";
// import { FaFilter } from 'react-icons/fa'; // Import filter icon

// function Favoritepage() {
//     const { loader, GetFavorite } = useContext(Contextpage);
//     const [localStorageData, setLocalStorageData] = useState([]);
//     const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
//     const [selectedFilter, setSelectedFilter] = useState(null);
//     const [filteredFavoriteMovies, setFilteredFavoriteMovies] = useState([]);

//     useEffect(() => {
//         GetFavorite();

//         const data = localStorage;
//         setLocalStorageData(data);
//     }, []);

//     useEffect(() => {
//         // Apply filter when selectedFilter or localStorageData changes
//         applyFilter();
//     }, [selectedFilter, localStorageData]);

//     const handleFilterClick = () => {
//         setFilterOptionsVisible(!filterOptionsVisible);
//     };

//     const handleFilterOptionClick = (filterOption) => {
//         setSelectedFilter(filterOption);
//         setFilterOptionsVisible(false);
//     };

//     const applyFilter = () => {
//         // Convert localStorageData to an array of movie objects
//         const moviesArray = Object.keys(localStorageData)
//             .filter(key => !isNaN(key))
//             .map(key => JSON.parse(localStorageData[key]));

//         // Apply filter if selected
//         let filteredList = [...moviesArray];
//         switch (selectedFilter) {
//             case 'latest':
//                 filteredList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
//                 break;
//             case 'oldest':
//                 filteredList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
//                 break;
//             case 'mostRated':
//                 filteredList.sort((a, b) => b.vote_average - a.vote_average);
//                 break;
//             case 'leastRated':
//                 filteredList.sort((a, b) => a.vote_average - b.vote_average);
//                 break;
//             default:
//                 break;
//         }
//         setFilteredFavoriteMovies(filteredList);
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Favorite Movies</title>
//             </Helmet>
//             <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>

//             <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
//                 <Header />
//                 <div className="flex justify-end pr-5">
//                     <div className="relative">
//                         <button onClick={handleFilterClick} className="text-white text-lg flex items-center"><FaFilter className="mr-1"/>Filter</button>
//                         {filterOptionsVisible && (
//                             <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
//                                 <ul>
//                                     <li onClick={() => handleFilterOptionClick('latest')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Latest</li>
//                                     <li onClick={() => handleFilterOptionClick('oldest')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Oldest</li>
//                                     <li onClick={() => handleFilterOptionClick('mostRated')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Most Rated</li>
//                                     <li onClick={() => handleFilterOptionClick('leastRated')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Least Rated</li>
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//                 <motion.div
//                     layout
//                     className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
//                     <AnimatePresence>
//                         {
//                             loader ? <span className="loader m-10"></span> :
//                                 <>
//                                     {filteredFavoriteMovies.length === 0 ? (
//                                         <p className="text-xl text-white">No Bookmark Yet!</p>
//                                     ) : (
//                                         filteredFavoriteMovies.map((movie, index) => (
//                                             <Moviecard key={index} movie={movie} />
//                                         ))
//                                     )}
//                                 </>
//                         }
//                     </AnimatePresence>
//                 </motion.div>
//             </div>
//         </>
//     )
// }

// export default Favoritepage;



// import React, { useEffect, useContext, useState } from 'react';
// import Header from '../components/Header';
// import Contextpage from '../Contextpage';
// import Moviecard from '../components/Moviecard';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Helmet } from 'react-helmet';
// import { HiChevronLeft } from "react-icons/hi";
// import { FaFilter } from 'react-icons/fa'; // Import filter icon

// function Favoritepage() {
//     const { loader, GetFavorite } = useContext(Contextpage);
//     const [localStorageData, setLocalStorageData] = useState([]);
//     const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
//     const [selectedFilter, setSelectedFilter] = useState(null);
//     const [filteredFavoriteMovies, setFilteredFavoriteMovies] = useState([]);

//     useEffect(() => {
//         GetFavorite();

//         const data = localStorage;
//         setLocalStorageData(data);
//     }, []);

//     useEffect(() => {
//         // Apply filter when selectedFilter or localStorageData changes
//         applyFilter();
//     }, [selectedFilter, localStorageData]);

//     const handleFilterClick = () => {
//         setFilterOptionsVisible(!filterOptionsVisible);
//     };

//     const handleFilterOptionClick = (filterOption) => {
//         setSelectedFilter(filterOption);
//         setFilterOptionsVisible(false);
//     };

//     const applyFilter = () => {
//         // Convert localStorageData to an array of movie objects
//         const moviesArray = Object.keys(localStorageData)
//             .filter(key => !isNaN(key))
//             .map(key => JSON.parse(localStorageData[key]));

//         // Apply filter if selected
//         let filteredList = [...moviesArray];
//         switch (selectedFilter) {
//             case 'latest':
//                 filteredList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
//                 break;
//             case 'oldest':
//                 filteredList.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
//                 break;
//             case 'mostRated':
//                 filteredList.sort((a, b) => b.vote_average - a.vote_average);
//                 break;
//             case 'leastRated':
//                 filteredList.sort((a, b) => a.vote_average - b.vote_average);
//                 break;
//             default:
//                 break;
//         }
//         setFilteredFavoriteMovies(filteredList);
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Favorite Movies</title>
//             </Helmet>
//             <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button>

//             <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
//                 <Header />
//                 <div className="flex justify-end pr-5">
//                     <div className="relative">
//                         <button onClick={handleFilterClick} className="text-white text-lg flex items-center"><FaFilter className="mr-1"/>Filter</button>
//                         {filterOptionsVisible && (
//                             <motion.div
//                                 layout
//                                 initial={{ opacity: 0, y: -10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
//                                 <ul>
//                                     <li onClick={() => handleFilterOptionClick('latest')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Latest</li>
//                                     <li onClick={() => handleFilterOptionClick('oldest')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Oldest</li>
//                                     <li onClick={() => handleFilterOptionClick('mostRated')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Most Rated</li>
//                                     <li onClick={() => handleFilterOptionClick('leastRated')} className="py-2 px-4 hover:bg-gray-100 cursor-pointer">Least Rated</li>
//                                 </ul>
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>
//                 <motion.div
//                     layout
//                     className="flex flex-wrap relative justify-evenly md:justify-around">
//                     <AnimatePresence>
//                         {
//                             loader ? (<span key="loader" className="loader m-10"></span>) :(
//                                 <>
//                                 <div className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
//                                     {filteredFavoriteMovies.length === 0 ? (
//                                         <p key="noBookmark" className="text-xl text-white">No Bookmark Yet!</p>
//                                     ) : (
//                                         filteredFavoriteMovies.map((movie, index) => (
//                                                 <Moviecard movie={movie} />
//                                         ))
//                                     )}
//                                  </div>

//                                 </>
//                             )
//                         }
//                     </AnimatePresence>
//                </motion.div>

//             </div>
//         </>
//     )
// }

// export default Favoritepage;
