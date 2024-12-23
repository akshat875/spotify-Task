import React, { useEffect, useMemo, useState } from 'react'
import SongResult from '../../Components/SongResult';

import PlayIcon from '../../assets/Icons/play-green.png'

import { SongsList } from '../../assets/Data/data'

function SearchResults({ searchText, handleGetSongDetails }) {

    const [isHover, setIsHover] = useState(false);

    let FilteredSongList = useMemo(() => {

        if (searchText !== '') {
            return SongsList.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
        }

        return []

    }, [searchText])

    if (FilteredSongList.length === 0) {
        return <h1>No Data</h1>
    }

    return (
        <div className='py-10 px-4 bg-[#121212]'>
            <div className='flex gap-4 items-center'>
                <span className='bg-[#fefefe] text-[#2a2a2a] px-5 py-1 rounded-full text-md'>All songs</span>
                 <span className='bg-[#2a2a2a] text-[#fefefe] px-5 py-1 rounded-full text-md'>Songs</span>
                <span className='bg-[#2a2a2a] text-[#fefefe] px-5 py-1 rounded-full text-md'>Albums</span>
                {/*<span className='bg-[#2a2a2a] text-[#fefefe] px-5 py-1 rounded-full text-md'>Profiles</span>
                <span className='bg-[#2a2a2a] text-[#fefefe] px-5 py-1 rounded-full text-md'>Playlists</span>
                <span className='bg-[#2a2a2a] text-[#fefefe] px-5 py-1 rounded-full text-md'>Artists</span>
                <span className='bg-[#2a2a2a] text-[#fefefe] px-5 py-1 rounded-full text-md'>Podcasts & shows</span> */}
            </div>
            <div className='py-5 flex gap-10'>
                {/* results */}
                <div className='w-[700px] py-5'>
                    <div className='mb-3'>
                        <span className='text-2xl text-[#fefefe] font-bold'>Songs</span>
                    </div>
                    <div>
                        {
                            FilteredSongList.slice(0, 5).map((item, index) => {
                                return (
                                    <SongResult
                                        key={index}
                                        imgURI={item.imguri}
                                        songName={item.name}
                                        artist={item.artist}
                                        time={item.time}
                                        details={item}
                                        handleGetSongDetails={handleGetSongDetails}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults;
