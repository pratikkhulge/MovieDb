import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Detail } from './components/Detail';
import Login from './auth/Login';
import Navbar from './components/Navbar'
import Container from './pages/Container'
import Trending from './pages/Trending';
import Tv from './pages/Tv';
import Upcoming from './pages/Upcoming';
import Favorite from './pages/Favoritepage';
import Error from './pages/Error';
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Player from './pages/Player';
import Search from './pages/Search';
import { Helmet } from "react-helmet";
import logo from "./assets/images/logo.png"

function App() {

  return (
    <MovieProvider>
      <Helmet>
       <meta property="og:image" content={logo}/>
      </Helmet>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <div >
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/login' element={<Login />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/Tv' element={<Tv />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/moviedetail/:id' element={<Detail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/player/:id/:title" element={<Player />} />
          <Route path="/player/:id" element={<Player />} /> 
          <Route path="/search/:query" element={<Search/>}/>
          <Route path="/search/" element={<Search/>}/>
          <Route path="/Error" element={<Error />} />

        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
