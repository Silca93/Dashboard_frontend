import { useState, useEffect } from 'react';
import WeatherLoading from './components/WeatherLoading';
import './App.css';
import StockData from './components/StockData';
import WeatherData from './components/WeatherData';
import NewsData from './components/NewsData';
import NasaData from './components/NasaData';
import { FaClock } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

function Weather() {
  const [time, setTime] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [precipitationChance, setPrecipitationChance] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [rain, setRain] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setLoading] = useState(true);
  const [whatTime, setWhatTime] = useState('');
  const [date, setDate] = useState('');
  const [pmTime, setPMTime] = useState('');
  const [timeFormat, setTimeFormat] = useState(false);

  const stockSymbols = [
    "AAPL", "GOOGL", "TSLA", "MSFT", 
    "AMZN", "META", "NVDA", "BRK.A", 
    "JPM", "JNJ", "XOM", "INTC"
  ];

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.85&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,snowfall,wind_speed_10m&timezone=Europe%2FBerlin');
        const data = await response.json();

        const currentDate = new Date();
        currentDate.setMinutes(0, 0, 0);
        const timezoneOffset = 2; // CEST is UTC+2
        currentDate.setHours(currentDate.getHours() + timezoneOffset);
        const currentTime = currentDate.toISOString().slice(0, 16);

        setTime(currentTime);

        const timeIndex = data.hourly.time.indexOf(currentTime);

        if (timeIndex !== -1) {
          const precipitationChance = data.hourly.precipitation_probability ? data.hourly.precipitation_probability[timeIndex] : "no data available";
          const currentTemp = data.hourly.temperature_2m[timeIndex];
          const precipitation = data.hourly.precipitation[timeIndex];
          const rain = data.hourly.rain[timeIndex];
          const currentHumidity = data.hourly.relative_humidity_2m[timeIndex];
          const currentWind = data.hourly.wind_speed_10m[timeIndex];

          setTemperature(currentTemp);
          setPrecipitationChance(precipitationChance);
          setPrecipitation(precipitation);
          setRain(rain);
          setHumidity(currentHumidity);
          setWind(currentWind);
        } else {
          console.error('Current time not found in the data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    setInterval(() => {
      getWeather();
    }, 1800000);

    getWeather();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const theTime = new Date();
      const date = theTime.toLocaleDateString();
      const localTime = theTime.toLocaleTimeString([], { hour12: false });
      const pmTime = theTime.toLocaleTimeString([], { hour12: true });

      setWhatTime(localTime);
      setPMTime(pmTime);
      setDate(date);
    };

    updateTime(); // Update immediately on mount
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className='background w-dvw h-dvh'>
      <div id="topSection" className='w-full h-[40%] flex'>
        <div id="weatherDiv" className="relative topLeft w-[50%] h-full flex justify-end items-center pr-[6.5rem]">
          <div id='dashboardDiv' className="absolute left-6 top-6 font-bold text-3xl text-white max-[950px]:top-2 max-[950px]:relative max-[950px]:mr-[3rem] flex flex-col w-[15rem] h-[4rem] bg-opacity-25 rounded-md bg-zinc-400">
            <div className="flex w-full h-[2.2rem] justify-between items-center gap-2 px-2">
              <h1 className='text-[1.3rem] font-bold'>Dashboard</h1>
              <div className="flex gap-1 w-[5rem] h-[1.6rem] rounded-md bg-zinc-100 justify-center items-center bg-opacity-30">
                <FaClock className='text-sm'/>
                <p className='text-[18px] font-medium'>
                  {timeFormat ? whatTime.slice(0, 2) + ' : ' + whatTime.slice(3, 5) : pmTime.slice(0, 1) + ' : ' + pmTime.slice(2, 4) }
                </p>
              </div>
              <div className="flex w-[1.9rem] h-[1.6rem] rounded-md bg-green-400 justify-center items-center bg-opacity-50 hover:border-[1px] duration-200 ease-linear hover:border-white">
                <button className='text-[10px] ' onClick={() => setTimeFormat(!timeFormat)}>
                  {timeFormat ? '24 H' : pmTime.slice(-2)}
                </button>
              </div>
            </div>
            <div className="flex w-full h-[1.8rem] bg-zinc-100 bg-opacity-35 justify-center items-center rounded-b-lg gap-7">
              <p className='text-[18px] font-thin flex justify-center items-center gap-1'>
                <FaCalendarAlt className='text-sm'/> {date}
              </p>
            </div>
          </div>
          {loading ? <WeatherLoading/> :
            <WeatherData
              temperature={temperature} 
              precipitation={precipitation} 
              precipitationChance={precipitationChance}
              time={time} 
              rain={rain} 
              humidity={humidity} 
              wind={wind}
            />
          }
        </div>

        <div className="topRight w-[50%] h-full flex justify-center items-center">
          <NasaData/>
        </div>
      </div>

      <div id="botSection" className="w-full h-[60%] flex">
        <div className="botLeft flex flex-col w-[50%] h-full justify-center items-center pl-[4rem] pb-[2rem]">
          <StockData symbols={stockSymbols} /> {/* Pass array of symbols here */}
        </div>
        <div className="botRight w-[50%] h-full flex justify-center items-center">
          <NewsData/>
        </div>
      </div>
    </div>
  );
}

export default Weather;
