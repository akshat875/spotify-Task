import React, { useState, useEffect } from 'react';
import CheckedIcon from '../../assets/Icons/checked.png';
import ShuffleIcon from '../../assets/Icons/shuffle.png';
import PreviousIcon from '../../assets/Icons/prev.png';
import NextIcon from '../../assets/Icons/next.png';
import RepeatIcon from '../../assets/Icons/repeat.png';
import ExpandIcon from '../../assets/Icons/full-screen.png';
import PlayIcon from '../../assets/Icons/play.png';
import PauseIcon from '../../assets/Icons/pause.png';
import FavoriteIcon from '../../assets/Icons/favorite.jpg'; // Your favorite icon
import FavoriteFilledIcon from '../../assets/Icons/favorite-filled.jpg'; // Your favorite filled icon
import ThreeDotsIcon from '../../assets/Icons/three-dots.jpg'; // Three-dot icon

function SongPlayer({ handlePlay, handlePause, handleNext, songDetails, currentTime }) {
    const [isPause, setIsPause] = useState(false);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [showFavorite, setShowFavorite] = useState(false); // New state for showing favorite button

    const { imguri = '', name = 'Unknown Song', artist = 'Unknown Artist', time = '00:00' } = songDetails || {};

    useEffect(() => {
        setIsPause(false);
    }, [songDetails]);

    const handleFavoriteToggle = () => {
        const isFavorite = favorites.some(song => song.name === name && song.artist === artist);

        if (isFavorite) {
            const updatedFavorites = favorites.filter(song => song.name !== name || song.artist !== artist);
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            const newFavorite = { imguri, name, artist, time };
            const updatedFavorites = [...favorites, newFavorite];
            setFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    const handleSpacebarPress = (event) => {
        if (event.code === 'Space') {
            setIsPause((prev) => {
                const newPauseState = !prev;
                if (newPauseState) {
                    handlePause();
                } else {
                    handlePlay();
                }
                return newPauseState;
            });
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSpacebarPress);
        return () => {
            window.removeEventListener('keydown', handleSpacebarPress);
        };
    }, []);

    const isCurrentSongFavorite = favorites.some(song => song.name === name && song.artist === artist);

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 w-[350px] bg-[#000000] flex flex-col items-center px-10 py-80 z-60">
            <div className="flex flex-col items-center gap-4 mb-4">
                <img src={imguri} alt={name} className="w-50 h-50 rounded-md object-cover mb-2" />
                <span className="text-[#fefefe] text-lg font-bold">{name}</span>
                <span className="text-[#a0a0a0] text-sm">{artist}</span>
            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="flex justify-center gap-6 items-center">
                    <img
                        src={ShuffleIcon}
                        alt="Shuffle"
                        className="w-5 h-5 cursor-pointer hover:opacity-75 transition"
                    />
                    <img
                        src={PreviousIcon}
                        alt="Previous"
                        className="w-5 h-5 cursor-pointer hover:opacity-75 transition"
                    />
                    <div
                        className="w-10 h-10 rounded-full bg-[#fefefe] flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            setIsPause((prev) => !prev);
                            isPause ? handlePlay() : handlePause();
                        }}
                    >
                        <img
                            src={isPause ? PlayIcon : PauseIcon}
                            alt={isPause ? 'Play' : 'Pause'}
                            className="w-6 h-6"
                        />
                    </div>
                    <img
                        src={NextIcon}
                        alt="Next"
                        className="w-5 h-5 cursor-pointer hover:opacity-75 transition"
                        onClick={handleNext}
                    />
                    <img
                        src={RepeatIcon}
                        alt="Repeat"
                        className="w-5 h-5 cursor-pointer hover:opacity-75 transition"
                    />
                </div>

                <div className="flex items-center gap-2 mt-4 w-full relative">
                    {/* Toggleable Button */}
                    {!showFavorite ? (
                        <img
                            src={ThreeDotsIcon}
                            alt="More Options"
                            className="w-8 h-8 cursor-pointer hover:opacity-75 transition absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowFavorite(true)}
                        />
                    ) : (
                        <img
                            src={isCurrentSongFavorite ? FavoriteFilledIcon : FavoriteIcon}
                            alt="Favorite"
                            className="w-8 h-8 cursor-pointer hover:opacity-75 transition absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2"
                            onClick={() => {
                                handleFavoriteToggle();
                                setShowFavorite(false);
                            }}
                        />
                    )}
                    <span className="text-[#fefefe] text-sm">
                        {currentTime === 0 ? '00:00' : formatTime(currentTime)}
                    </span>
                    <div className="flex-1 h-1 bg-[#4d4d4d] rounded-md relative">
                        <div
                            className="bg-[#fefefe] absolute top-0 left-0 h-1 rounded-md"
                            style={{ width: `${(currentTime / (parseTime(time) || 1)) * 100}%` }}
                        ></div>
                    </div>
                    <span className="text-[#a0a0a0] text-sm">{time}</span>
                </div>
            </div>

            <div className="flex justify-center items-center mt-4">
                {/* <img
                    src={ExpandIcon}
                    alt="Expand"
                    className="w-10 h-10 cursor-pointer hover:opacity-75 transition"
                /> */}
            </div>
        </div>
    );
}

export default SongPlayer;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function parseTime(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
}
