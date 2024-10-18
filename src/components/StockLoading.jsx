import React from 'react'

export default function StockLoading() {
  return (
    
    <div id='' className="stockOuterDiv w-[43rem] h-[32rem] flex flex-col bg-zinc-100 rounded-xl justify-center items-center bg-opacity-30">
      <div id="stockMidDivLoading" className="w-[40rem] h-[30rem] flex flex-col justify-center items-center bg-zinc-100 rounded-xl bg-opacity-70 animate-pulse">
          <h1 className='text-xl font-bold animate-bounce'>Fetching stock Data...</h1> 
          <p className='text-lg font-semibold text-center'>(This can take a while if the server was offline)</p>
      </div>
   </div>


  )
}
