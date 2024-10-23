import React from 'react'
import { useState, useEffect } from 'react';
import { FaCloud } from "react-icons/fa";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { MdOutlineSwitchAccessShortcutAdd } from "react-icons/md";

import { FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";




export default function WeatherData({temperature, precipitation, precipitationChance, time, rain, humidity, wind}) {
    const [unit, setUnit] = useState(false);
    const [displayTemp, setDisplayTemp] = useState(temperature);  // local state to track the display temperature

    const switchTempUnit = () => {
        setUnit(prevUnit => !prevUnit);  

        if (!unit) {
            // Celsius to Fahrenheit
            setDisplayTemp((temperature * 1.8) + 32);
         
        } else {
            // Fahrenheit to Celsius
            setDisplayTemp((displayTemp - 32) / 1.8);

        }
    };

    
    

    return (
    <div className="relative w-[18rem] h-[12rem] rounded-xl bg-slate-200 bg-opacity-45">
        <div className="flex items-center justify-between p-2 w-full h-[8rem]   rounded-t-xl ">
            <div className="left flex w-1/2 h-full  justify-center items-center">
                <div className="w-[6.5rem] h-[6rem]  overflow-hidden bg-zinc-100 bg-opacity-15 rounded-2xl flex justify-center items-center">
                    {
                    precipitation > 0 ?
                    <div className="rainy-cloud loader">
                        <div className="snow">
                        <span style={{ '--i': 11 }}></span>
                        <span style={{ '--i': 12 }}></span>
                        <span style={{ '--i': 15 }}></span>
                        <span style={{ '--i': 17 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        <span style={{ '--i': 18 }}></span>
                        <span style={{ '--i': 13 }}></span>
                        <span style={{ '--i': 14 }}></span>
                        <span style={{ '--i': 19 }}></span>
                        <span style={{ '--i': 20 }}></span>
                        <span style={{ '--i': 10 }}></span>
                        </div>
                    </div>
                    :
                    
                    <FaCloud className='text-[3rem] text-gray-200 overflow-hidden'/>
                    
                    }
                </div> 
            </div>

            <div className="right  pb-5 flex flex-col w-1/2 h-full   justify-center items-center">
                <span className="flex">
                    <button onClick={switchTempUnit} className='bg-zinc-200 bg-opacity-30 rounded-lg px-1 text-sm flex gap-1 justify-center items-center  text-white font-semibold hover:ring-[1px] duration-200 ease-linear hover:ring-white'><MdOutlineSwitchAccessShortcutAdd className='text-[12px]' />
                    {unit ? 'Celsius' : 'Farenheit' }</button>
                    
                </span>
                <span className='font-bold text-[2.5rem]'>{unit ? displayTemp.toFixed(1) + 'F' : displayTemp.toFixed(1) + '°C' }</span>
                <span className='bg-zinc-200 pl-1 pr-2 rounded-lg bg-opacity-20 font-semibold pt-1 text-sm flex justify-center items-center gap-1 mb-[-10px]'><FaLocationDot className='mb-1 text-[13px]' />
                50.85° N, 4.84° E</span>
            </div>
        </div>

        <div className="absolute w-[95%] h-[1px] bg-slate-100 left-2 bg-opacity-25 bottom-[70px]">
        </div>            

        <div className="flex items-center rounded-b-xl  w-full h-[4rem] overflow-hidden p-1">

            <div className="flex w-1/3 h-full flex-col  items-center justify-center">
            <MdOutlineOnlinePrediction className='' />

                <span className='font-bold text-sm '>{precipitationChance}%</span>
                <p className='text-sm'>Precipitation</p>
            </div>

            <div className="flex w-1/3 h-full flex-col items-center justify-center">
                <FaWind className=''/>
                <span className='font-bold text-sm '>{wind} km/h</span>
                <p className='text-sm'>Wind</p>
               
            </div>

            <div className="flex w-1/3 h-full flex-col  items-center justify-center">
                <FaDroplet className=''/>
                <span className='font-bold text-sm pt-1 '>{humidity}%</span>
                <p className='text-sm'>Humidity</p>
            </div>

            <div className="flex gap-2 justify-center items-center">
                
            </div>
        </div>
   
    </div>
    )
}
