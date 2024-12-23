import React, { useState } from 'react';
import Artist from '../../Components/Artist';
import { popularArtists as ArtistsData, popularAlbums } from '../../assets/Data/data';

function Home() {
  const [showAllArtists, setShowAllArtists] = useState(false);

  const toggleArtists = () => setShowAllArtists(!showAllArtists);

  return (
    <div className="bg-[#1c1c1c] min-h-screen">

      {/* Artists Section */}
      <div className="px-3 md:px-5 py-8 md:py-10">
        {/* Artists Header */}
        <div className="flex flex-col md:flex-row justify-between items-center px-3 md:px-5 pb-4 md:pb-6">
          <h2 className="text-[#fefefe] text-xl md:text-2xl font-bold">Popular Artists</h2>
          <button
            onClick={toggleArtists}
            className="text-[#a0a0a0] text-sm md:text-md font-semibold hover:underline hover:text-white transition mt-2 md:mt-0"
          >
            {showAllArtists ? 'Show Less' : 'Show All'}
          </button>
        </div>

        {/* Artists Content */}
        <div className="flex flex-wrap justify-center md:justify-evenly gap-3 md:gap-5">
          {ArtistsData.slice(0, showAllArtists ? ArtistsData.length : 6).map((artist) => (
            <Artist imgURL={artist.imguri} name={artist.name} key={artist.id} />
          ))}
        </div>
      </div>

      {/* Albums Section */}
      <div className="px-3 md:px-5 py-8 md:py-10">
        {/* Albums Header */}
        <div className="px-2 md:px-2 pb-2">
          <h2 className="text-[#fefefe] text-xl md:text-2xl font-bold">Popular Albums</h2>
        </div>

        {/* Albums Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {popularAlbums.map((album, index) => (
            <div
              key={index}
              className="bg-[#272727] hover:bg-[#1f1f1f] cursor-pointer rounded-md overflow-hidden transition duration-200"
            >
              {/* Album Image */}
              <div className="w-full">
                <img
                  src={album.imguri}
                  alt={album.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Album Details */}
              <div className="px-3 md:px-4 py-2 md:py-3">
                <h3 className="text-[#ffffff] font-bold text-sm md:text-lg truncate">
                  {album.name}
                </h3>
                <p className="text-[#a0a0a0] font-medium text-xs md:text-sm truncate">
                  {album.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;
