import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import Contextpage from '../Contextpage';
import slugify from 'react-slugify';
import { useEffect } from 'react';
import logo from "../assets/images/LOGO.png";

const Navdata = [
    // {
    //   id: 1,
    //   headername: 'Genres',
    //   Name: 'Genres',
    //   link: '/',
    // },
    {
      id: 2,
      headername: 'Trending Movies',
      Name: 'Trending',
      link: '/trending',
    },
    {
      id: 3,
      headername: 'Upcoming Movies',
      Name: 'Upcoming',
      link: '/upcoming',
    },
    {
      id: 4,
      headername: 'Favorite Movies',
      Name: 'Favorites',
      link: '/favorite',
    },
    {
      id: 5,
      headername: 'Tv Series',
      Name: 'Tv',
      link: '/Tv',
    },
  ];

function Navbar() {
const { user, setUser } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const searchbarRef = useRef(null); // Ref for the Searchbar component

  const { fetchSearch } = useContext(Contextpage);
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    const handleSearch = () => {
        if (value.trim() !== '') {
          navigate(`/search/${slugify(value)}`);
          setValue('');
        } else {
          navigate('/');
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
    
      const handleLogout = async () => {
        try {
          await auth.signOut();
          setUser(null);
          toast.success('Logout successfully');
        } catch (error) {
          console.error('Error signing out:', error);
          toast.error('Error signing out');
        }
      };

    return (
        <nav className="bg-gray-900 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-6 w-auto mr-2"
                    src={logo}
                    alt="Logo"
                  />
                  <img
                    className="hidden lg:block h-10 w-auto mr-2"
                    src={logo}
                    alt="Logo"
                  />
                    <span className="text-white font-bold text-lg">MovieDb</span>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link to="/">
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Home
                    </button>
                  </Link>
                  {Navdata.map((data) => (
                    <Link key={data.id} to={data.link}>
                      <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        {data.Name}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex space-x-4">
                  <div className="search-bar flex items-center">
                    <input
                      type="search"
                      name="searchpanel"
                      id="searchpanel"
                      placeholder="Search Movie"
                      className="p-2 pl-2 rounded-xl outline-none w-64"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  {user ? (
                    <>
                      <div className="w-full flex items-center">
                      {user.photoURL ? (
                    // Display user photo if available
                    <img
                      src={user.photoURL}
                      alt="user"
                      className="h-10 rounded-full"
                    />
                  ) : (
                    // Display fallback image if user photo is not available
                    <img
                      src={logo}
                      alt="default user"
                      className="h-10 rounded-full"
                    />
                  )}
                        <h1 className="ml-2 text-white">{user.displayName}</h1>
                        <button
                          className="ml-4 text-white hover:text-gray-400"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="w-full text-white bg-gray-900 flex items-center justify-center font-semibold"
                        onClick={() => setActivemobile(!activemobile)}
                      >
                        <h1>Log in</h1>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;

