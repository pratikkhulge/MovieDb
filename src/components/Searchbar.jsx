import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import Contextpage from '../Contextpage';
import slugify from 'react-slugify';
import { useEffect } from 'react';
import logo from '../assets/images/LOGO.png'

const Navdata = [
  {
    id: 1,
    headername: 'Genres',
    Name: 'Genres',
    link: '/',
  },
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

function Searchbar() {
  const { user, setUser } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const searchbarRef = useRef(null); // Ref for the Searchbar component

  const { fetchSearch } = useContext(Contextpage);
  const [movies, setMovies] = useState([]); 
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const fetchFamousMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d6278b3dc3e6f8f8376a89851c3f8c8f&sort_by=popularity.desc&include_adult=false`);
        const data = await response.json();
        const famousMovies = data.results;
        setMovies(famousMovies);
      } catch (error) {
        console.error("Error fetching famous movies:", error);
      }
    };

    fetchFamousMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval);
  }, [movies]);

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
    // try {
    //   await auth.signOut();
    //   setUser(null);
    //   toast.success('Logout successfully');
    // } catch (error) {
    //   console.error('Error signing out:', error);
    //   toast.error('Error signing out');
    // }
      await auth.signOut();
      setUser(null);
      toast.success('Logout successfully');
  };

  const scrollToBottom = () => {
    // Calculate the offset based on the navbar height (adjust this value as needed)
    const navbarHeight = -10; // Assuming the navbar height is 64 pixels
    const offset = searchbarRef.current.offsetTop - navbarHeight;
    
    // Scroll to the bottom of the Searchbar component with an offset
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  return (
    <>
      <nav className="bg-gray-900 fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={logo}
                    alt="logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={logo}
                    alt="logo"
                  />
                  <span className="text-white font-bold text-lg">MovieDb</span>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link to="/">
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={scrollToTop}>
                      Home
                    </button>
                  </Link>
                  {Navdata.map((data) => (
                    <Link key={data.id} to={data.link}>
                      <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={data.headername === 'Genres' ? scrollToBottom : null}>
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
                      className="p-2 pl-10 rounded-xl outline-none w-64"
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
                      src={User}
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
      <div className="slideshow-container relative mt-16" style={{ zIndex: 1 }}> {/* Adjust the zIndex here */}
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`slide ${index === currentMovieIndex ? 'active' : ''}`}
            style={{
              backgroundImage: movie.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` : 'linear-gradient(to right, #fuchsia, #cyan)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center',
              width: '100%',
              height: '500px',
              display: index === currentMovieIndex ? 'block' : 'none',
              position: 'relative',
            }}
          >
            <h1 className='text-white text-2xl md:text-6xl font-bold text-center absolute bottom-0 left-0 right-0 mb-4'>{movie.title}</h1>
          </div>
        ))}
        <div ref={searchbarRef}></div>
      </div>
    </>
  );
}

export default Searchbar;
