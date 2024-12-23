import React, { useState } from 'react';
import SearchCategoryDispaly from '../../Components/SearchCategoryDisplay';
import { SearchData } from '../../assets/Data/data';

function SearchCategory() {
    const [currentSong, setCurrentSong] = useState(null);  // To track the currently playing song

    const handlePlaySong = (uri) => {
        setCurrentSong(uri);  // Set the current song URI to play
    };

    return (
        <div className='py-10 px-4 bg-[#121212] '>
            <div className='mt-10 mb-5'>
                <span className='text-2xl text-[#fefefe] font-bold'>For Browse all Songs You Have To Search First</span>
            </div>
            <div className='grid gap-5 px-2 py-2'>
                {
                    SearchData.map((item, index) => {
                        return (
                            <SearchCategoryDispaly
                                key={index}
                                imgURI={item.uri}  // Assuming 'uri' is the image URL
                                title={item.title}  // Assuming 'title' is the song's title
                                bgColor={item.color} // Assuming 'color' is the background color for the item
                                onClick={() => handlePlaySong(item.uri)} // Trigger play on click
                            />
                        );
                    })
                }
            </div>

            {/* Audio player */}
            {currentSong && (
                <div className='mt-10'>
                    <audio controls autoPlay>
                        <source src={currentSong} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default SearchCategory;
