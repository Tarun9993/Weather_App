import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { TailSpin } from 'react-loader-spinner'

const App = () => {
  const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

  const [search, setSearch] = useState("");
  const [name, setName] = useState()
  const [cloudiness, setCloudiness] = useState("");
  const [flag, setFlag] = useState()
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [humidity, setHumidity] = useState()
  const [clouds, setClouds] = useState()
  const [showWeather, setShowWeather] = useState(false)
  const [loading, setLoading] = useState(false)

  const searchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`);
      const data = await response.json();
      setName(data.name);
      setCloudiness(data.weather[0].description);
      setFlag(data.sys?.country);
      setTemp((data.main.temp - 273.15).toFixed(2));
      setWind(data.wind.speed)
      setHumidity(data.main.humidity)
      setClouds(data.clouds.all)
      console.log(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
    finally {
      setLoading(false); // Stop loading
    }
  }
  const handleButton = () => {
    if (search.trim() === "") {
      alert("Please enter a city name to search.");
      return;
    }
    setLoading(true);
    searchWeather();
    setShowWeather(true)
  }

  return (
    <div className='min-h-screen bg-custom-gradient '>
      <div className='flex justify-center'>
        <h1 className='font-bold text-white text-4xl uppercase font-sans my-16 tracking-wide'>Weather App</h1>
      </div>
      <div className='mt- flex justify-center gap-3  md:mx-36 mx-12'>
        <input type="text" placeholder='Search for city,location.'
          className='p-1 sm:p-2 w-full rounded-lg text-white  bg-[#7D91AC] font-semibold tracking-wide font-sans text-lg border-none focus:outline-none md:w-6/12 w-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='text-2xl py-1 px-1 sm:text-4xl sm:px-2 sm:py-2 font-bold rounded-lg text-white bg-[#7D91AC] cursor-pointer'
          onClick={handleButton}>
          <CiSearch />
        </button>
      </div>
      {loading ?
        <div className="flex justify-center mt-10">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#ffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div> :
        <div>
          {showWeather && (
            <div>
              <div className='mt-10 text-center text-white  font-sans '>
                <div className='flex justify-center gap-3'>
                  <h1 className='mt-3 font-bold pb-4 text-4xl tracking-wide'>{name}</h1>
                  {flag && (
                    <img
                      src={`https://flagcdn.com/144x108/${flag.toLowerCase()}.png`}
                      alt={`Flag of ${flag}`}
                      className="mt-4 h-7 inline-block text-center"

                    />
                  )}
                </div>
                <h1 className='pb-4 text-2xl'>{cloudiness}</h1>
                <h1 className='pb-5 font-bold text-4xl tracking-wide'>{temp} °C</h1>
              </div>
              <div className='flex gap-10 justify-center mt-5 flex-wrap'>
                <div className='text-center bg-[#849BBB] w-48 rounded-lg'>
                  <img src="https://github.com/Manikantaanyam/weather/blob/main/images/wind.png?raw=true" alt="wind image"
                    className='h-20 ml-14' />
                  <h3 className='font-semibold text-white uppercase text-xl '>Wind Speed</h3>
                  <h1 className='font-sans font-semibold text-[#33052] text-base'>{wind}m/s</h1>
                </div>
                <div className='text-center bg-[#849BBB] w-48 rounded-lg'>
                  <img src="https://github.com/Manikantaanyam/weather/blob/main/images/humidity.png?raw=true" alt="humidity image"
                    className='h-14 ml-16 mt-3' />
                  <h3 className='font-semibold text-white uppercase text-xl mt-4 '>Humidity</h3>
                  <h1 className='font-sans font-semibold text-[#33052]'>{humidity}%</h1>
                </div>
                <div className='text-center bg-[#849BBB] w-48 rounded-lg'>
                  <img src="https://github.com/Manikantaanyam/weather/blob/main/images/cloud.png?raw=true" alt="cloud image"
                    className='h-20 ml-14' />
                  <h3 className='font-semibold text-white uppercase text-xl '>Clouds</h3>
                  <h1 className='mb-3 font-sans font-semibold text-[#33052]'>{clouds}</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default App
