
import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import Loader from './components/Loader'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isCelsius, setIsCelsius] = useState(true)

  let newTemp = {}

  const success = ({coords}) => {
    const newCoords = {
      lat: coords.latitude,
      lon:coords.longitude
    }
    setCoords(newCoords)
  }

    const newCallAPISerch = (cityName) => {
      const apiKey = "3273d72da8c0bb68c0f7f0fd9c98f3e3"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    axios.get(URL)
      .then(({data}) => {
        allTemp(data)
        setTemp(newTemp)
        setWeather(data)})
      .catch(err => alert(err))
  }

  const changeUnitTemp = () => {
    setIsCelsius(!isCelsius)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  const allTemp = (data) => {
    const tempKelvin = data.main.temp
    const tempCelsius = (tempKelvin - 273.15).toFixed(1)
      const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(1) 
      newTemp = {
        celsius: `${tempCelsius}°`,
        fahrenheit: `${tempFahrenheit}F`
      }
  }

  useEffect(() => {
    const apiKey = "3273d72da8c0bb68c0f7f0fd9c98f3e3"
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`
    axios.get(URL)
    .then(({data}) => {
      allTemp(data)
      setTemp(newTemp)
      setWeather(data)
    })
    .catch(err => console.log(err))
  }, [coords])

  
  
  return (
    <div className="App">
      {weather? 
        <WeatherCard 
        weather={weather} 
        temp={temp}
        isCelsius={isCelsius}
        changeUnitTemp={changeUnitTemp}
        newCallAPISerch={newCallAPISerch}
        /> :
        <Loader/>
      }
    </div>
  )
}

export default App
