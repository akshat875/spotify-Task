import React from 'react'

function Artist({ imgURL, name, occ = 'Artist' }) {
    return (
        <div>
            {/* image */}
            <div>
                <img src={imgURL} alt='img' className='w-20 h-20 rounded-full' />
            </div>
            {/* details */}
            <div className='px-3 py-4'>
                {/* <p className='text-sm text-[#fefefe] font-bold'>{name}</p> */}
                <span className='text-[#a0a0a0] text-sm'>{occ}</span>
            </div>
        </div>
    )
}

export default Artist