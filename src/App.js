import React, {useEffect, useState} from 'react'
// import {NavBar} from './components'
import {useFetch} from './fetch'

const App = () => {
  const {loading, error, fetchdata}=useFetch();
  const [keyword, setKeyword]=useState('Abuja');
  const [weatherData, setWeatherData]=useState([])

  const getWeatherData =async(e)=>{
    try {
      const data =await fetchdata(keyword)
      setWeatherData(data);
      console.log(weatherData);
    } catch (error) {}
  }

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    getWeatherData();
  }

  useEffect(()=>{
    getWeatherData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (loading) return <h1>loading...</h1>
  if (error) return <h1>{error}</h1>
  return (
    <>
    Weather Forecast
    <nav> 
      <form onSubmit={handleFormSubmit}>
      <input value={keyword} onChange={e =>setKeyword(e.target.value)}/>
      </form>
    </nav>
    <div>
      {weatherData && (
        <div>
          <h1>{weatherData.name}, {weatherData.sys.country}</h1>
          <h3>Temperature: {weatherData.main.temp}&deg;C</h3>
          <h3>Humidity: {weatherData.main.humidity}%</h3>
          <h3>Pressure: {weatherData.main.pressure}Pa</h3>
          <h4>Description: {weatherData.weather[0].description}</h4>
          <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} width='100pz' alt='icon'/>
        </div>
      )}
    </div>
    </>
  )
}

export default App