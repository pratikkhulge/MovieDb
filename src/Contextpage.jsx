import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from 'react-toastify';
import Error from './pages/Error'; // Import Error component

const Contextpage = createContext();

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [tv, setTv] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const [user, setUser] = useAuthState(auth);
  const navigate = useNavigate();

  const APIKEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
  }, [page]);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/error"); 
    }
  };

  const filteredGenre = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&with_origin_country=IN&page=${page}`;
    const filteredGenre = await fetchData(url);
    if (filteredGenre) {
      setMovies(filteredGenre.results);
      setTotalPage(filteredGenre.total_pages);
      // console.log("Total Pages : ", filteredGenre.total_pages)
      setLoader(false);
      setHeader("Genres");
    }
  };

  const fetchSearch = async (query, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&with_origin_country=IN&language=en-US&query=${query}&include_adult=false&page=${page}`;
    const searchmovies = await fetchData(url);
    if (searchmovies) {
      setSearchedMovies(searchmovies.results);
      setLoader(false);
      setHeader(`Results for "${query}"`);
    }
  };

  const fetchGenre = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&with_origin_country=IN&language=en-US&page=${page}`;
    const gen = await fetchData(url);
    if (gen) {
      setGenres(gen.genres);
    }
  };

  const fetchTrending = async () => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&with_origin_country=IN&page=${page}`;
    const trend = await fetchData(url);
    if (trend) {
      setTrending(trend.results);
      setTotalPage(trend.total_pages);
      // console.log("Total Pages : ", trend.total_pages)
      setLoader(false);
      setHeader("Trending Movies");
    }
  };

  const fetchTv = async () => {
    const url = `https://api.themoviedb.org/3//tv/top_rated?api_key=${APIKEY}&with_origin_country=IN&page=${page}`;
    const tv = await fetchData(url);
    if (tv) {
      setTv(tv.results);
      setTotalPage(tv.total_pages);
      // console.log("Total Pages : ", tv.total_pages)
      setLoader(false);
      setHeader("Tv Series");
    }
  };

  const fetchUpcoming = async () => {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&with_origin_country=IN&language=en-US&page=${page}`;
    const upc = await fetchData(url);
    if (upc) {
      setUpcoming(upc.results);
      setTotalPage(upc.total_pages);
      setLoader(false);
      setHeader("Upcoming Movies");
    }
  };

  const GetFavorite = () => {
    setLoader(false);
    setHeader("Favorite Movies");
  };

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/")
      toast.success("Login successfully");
    } catch (err) {
      console.log(err)
      navigate("/")
    }
  };

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchTv,
        tv,
        fetchUpcoming,
        upcoming,
        GetFavorite,
        totalPage,
        searchedMovies,
        GoogleLogin,
        user
      }}
    >
      {children}
    </Contextpage.Provider>
  );
}

export default Contextpage;
