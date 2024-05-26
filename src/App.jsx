import React, { useState,useEffect } from 'react'
import { FaReact } from "react-icons/fa";
import Inputs from './Components/Inputs.jsx';
import TopButtons from './Components/TopButtons.jsx';
import TimeAndLocation from './Components/TimeAndLocation.jsx';
import TempAndDetails from './Components/TempAndDetails.jsx';
import Forecast from './Components/Forecast.jsx';
import getWeatherData from './services/WeatherService.js';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [query, setQuery] = useState({ q: 'Delhi' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);


  const getWeather = async () => {
    const message = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${message}`)
    await getWeatherData({ ...query,units }).then(data => {
      setWeather(data);
      toast.success(`Fetched weather data for ${data.name},${data.country}`);
    });
   
  }
  useEffect(() => {
    getWeather();
  },[query,units]);
  const formatBackground = () => {
    if (!weather) return "";
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700"
  }
  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      
      <TopButtons setQuery={ setQuery} />
      <Inputs setQuery={ setQuery} setUnits={setUnits} />
      {weather && (<>
        <TimeAndLocation weather={ weather} />
        <TempAndDetails weather={ weather } units={units} />
        <Forecast title='3 hour step forecast' data={weather.hourly } />
        <Forecast title="Daily forecast" data={weather.daily } />
      </>)
      }
      <ToastContainer autoClose={ 2500} hideProgressBar={true} theme="colored" />
    </div>
  )
}

export default App