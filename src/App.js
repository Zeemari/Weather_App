import React, {useEffect, useState} from 'react'

import {NavBar} from './components'
import {useFetch} from './fetch'

const App = () => {
  const {loading, error, fetchdata}=useFetch();
  const [keyword, setKeyword]=useState('');
  const [weatherData, setWeatherData]=useState([])

  const getWeatherData =async(e)=>{
    e.preventDefault();
    try {
      const data =await fetchdata(keyword)
      setWeatherData(data);
      console.log(weatherData);
    } catch (error) {}
  }
  // useEffect(()=>{
  //   getWeatherData();
  // })
  if (loading) return <h1>loading...</h1>
  if (error) return <h1>{error}</h1>
  return (
    <>
    Weather Forecast
    <nav> 
      <form onSubmit={getWeatherData}>
      <input value={keyword} onChange={e =>setKeyword(e.target.value)}/>
      </form>
    </nav>

    </>

  )
}

export default App