import React, { useRef, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Screens
import Home from './Screens/Home';
import Search from './Screens/Search';
import FavoritesPage from './Components/Favorites/favorites';

// Layout
import HeaderLayout from './Layouts/HeaderLayout';
import SongPlayer from './Screens/SongPlayer';

// Data
import { SongsList } from './assets/Data/data';

// Context
import { FavoritesProvider, FavoritesContext } from './context/FavoritesContext';

function App() {
  const audioRef = useRef(null);

  const [searchText, setSearchText] = useState('');
  const [isPlay, setIsPlay] = useState(false);
  const [songDetails, setSongDetails] = useState({
    id: null,
    name: '',
    artist: '',
    time: '',
    album: '',
    imguri: '',
    songpath: '',
  });

  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleGetSongDetails = (details) => {
    setSongDetails(details);
    setIsPlay(true);
    setTimeout(() => {
      handlePlay();
    }, 500);
  };

  const handlePlay = () => {
    audioRef.current.play();
    audioRef.current.volume = 0.1;
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleNext = () => {
    let randomValue = Math.floor(Math.random() * SongsList.length);
    let newSong = SongsList[randomValue];
    handleGetSongDetails(newSong);
  };

  return (
    <FavoritesProvider>
      <React.Fragment>
        <Routes>
          <Route
            element={<HeaderLayout setSearchText={setSearchText} searchText={searchText} />}
          >
            <Route
              path='/'
              element={<Home handleGetSongDetails={handleGetSongDetails} />}
            />
            <Route
              path='/search'
              element={
                <Search searchText={searchText} handleGetSongDetails={handleGetSongDetails} />
              }
            />
            <Route path='/favourites' element={<FavoritesPage />} />
          </Route>
        </Routes>

        {isPlay && (
          <SongPlayer
            handlePlay={handlePlay}
            handlePause={handlePause}
            handleNext={handleNext}
            songDetails={songDetails}
            currentTime={currentTime}
          />
        )}

        {songDetails.songpath !== '' && (
          <audio
            ref={audioRef}
            src={songDetails.songpath}
            style={{ position: 'fixed', top: '-200px' }}
            onLoadedData={() => {
              setDuration(Math.floor(audioRef.current.duration));
            }}
            onTimeUpdate={() => {
              let time = Math.floor(audioRef.current.currentTime);
              let total = Math.floor((time / duration) * 100);
              setCurrentTime(total);
            }}
          />
        )}
      </React.Fragment>
    </FavoritesProvider>
  );
}

export default App;
