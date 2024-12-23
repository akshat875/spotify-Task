import React from 'react';
import { useFavorites } from './FavoritesContext';

const FavoritesPage = () => {
  const { favoriteSongs } = useFavorites(); // Access the favorite songs from context

  return (
    <div className="favorites-page">
      <h2>Your Favorite Songs</h2>
      <div className="favorite-songs-list">
        {favoriteSongs.length === 0 ? (
          <p>No favorite songs yet</p>
        ) : (
          favoriteSongs.map((song) => (
            <div key={song.id} className="song-item">
              <p>{song.name} - {song.artist}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
