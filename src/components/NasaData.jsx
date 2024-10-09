import React from 'react'
import { useState, useEffect } from 'react'

export default function NasaData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNasaData = async ()=> {
            try {
                const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=f7FTofoI1xdPdV0f17ttZHhrcXey0eaidlcRO6hw') 
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    const data = await response.json()
                    setData(data)
                    console.log(data);
                    
                }
            } catch (error) {
                console.log(error.message);
                
                
            }finally {
                setLoading(false)
            }

        }
       fetchNasaData()
    }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-3">
        <div id='nasaOuterBorder' className="relative flex justify-center items-center gap-3 w-[40rem] h-[19rem] bg-zinc-100 bg-opacity-35 rounded-xl">
        <h1 className='absolute top-2 text-center font-semibold'>NASA PCITURE OF THE DAY</h1>
            <div id='nasaLeftDiv' className="left w-[20rem] h-[15rem] hover:scale-105 duration-300 mt-4 rounded-xl overflow-hidden">
                <a href={data.hdurl} target="_blank">
                    
                    <img src={data.url}   alt="Image description" 
                    className="w-full h-full object-cover "  />
                </a>
            </div>
            
            <div id='nasaRightDiv' className="scrollable right w-[15rem] h-[15rem] mt-4 bg-opacity-60 bg-zinc-100 rounded-xl overflow-hidden p-3 overflow-y-scroll">
                <h1 className='font-bold pb-2'>{data.title}</h1>
                <p className='text-sm'>{data.explanation}</p>
            </div>
        </div>

        
    </div>
  )
}
