import React, { useState, useEffect } from 'react';

function FavoritesPage() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    // Get the favorite songs from localStorage or some global state
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    setFavoriteSongs(savedFavorites);
  }, []);

  return (
    <div className="bg-[#1c1c1c] min-h-screen p-5">
      <h2 className="text-[#fefefe] text-2xl font-bold mb-5">Your Favourite Songs</h2>

      {favoriteSongs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteSongs.map((song, index) => (
            <div key={index} className="bg-[#272727] rounded-md overflow-hidden p-3">
              <img
                src={song.imguri}
                alt={song.name}
                className="w-full h-auto object-cover rounded-md"
              />
              <h3 className="text-[#ffffff] font-bold text-lg mt-3">{song.name}</h3>
              <p className="text-[#a0a0a0] text-sm">{song.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#a0a0a0] text-lg">You don't have any favorite songs yet!</p>
      )}
    </div>
  );
}

export default FavoritesPage;
