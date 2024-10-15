import React from 'react'

export default function NewsLoading() {
  return (
    <div id='newsOuterBorder' className='w-[40rem] h-[32rem] bg-zinc-100 rounded-xl bg-opacity-55 flex flex-col gap-2 justify-center items-center mb-4 animate-pulse'>
        <h1 className='text-xl font-bold animate-bounce'>Fetching News Data...</h1> 
        <p className='text-lg font-semibold text-center'>(This can take a while if the server was offline)</p>
    </div>
  )
}
