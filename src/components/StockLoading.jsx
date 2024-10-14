import React from 'react'

export default function StockLoading() {
  return (
    <div className="w-[38rem] h-[30rem] flex flex-col justify-center items-center bg-zinc-100 rounded-xl bg-opacity-70 animate-pulse">
        <h1 className='text-xl font-bold animate-bounce'>Fetching stock Data...</h1> 
        <p className='text-lg font-semibold text-center'>(This can take a while if the server was offline)</p>
    </div>
  )
}
