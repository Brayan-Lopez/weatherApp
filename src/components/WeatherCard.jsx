import React, { useState } from 'react'

const WeatherCard = ({weather, temp, isCelsius, changeUnitTemp, newCallAPISerch}) => {

  const [place, setPlace] = useState("")

  const URLIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`

  const handleChangePlace = (event) => {
    setPlace(event.target.value)
  }

  console.log(weather)

  return (
    <article>
      <div className='weatherHeader'>
        <h2 className='weatherApp'>Weather App</h2>
        <div className='serchForm'>
          <input className='form input' type="text" placeholder='Serch a City' value={place} onChange={handleChangePlace} />
          <button className='form button' onClick={() => newCallAPISerch(place)}>Serch</button>
        </div>
      </div>
      

      
      <section className='weather-section'>
        <div className='weather-tarjet'>

          <div className='data temp'>
            <p>{isCelsius? temp.celsius : temp.fahrenheit}</p>
            <img src={URLIcon}/>

            <div className='data city'>
              <p>{weather?.name}, {weather?.sys.country}</p>
              <p>{`Sky ${weather.weather[0].main}`}</p>
            </div>

          </div>

          <div className='data oter'>
            <p>Wind speed:   {weather.wind.speed}m/s</p>
            <p>Clouds:   {weather.clouds.all}%</p>
            <p>Pressure:   {weather.main.pressure} hPa</p>
          </div> 

        </div>
        <button className='buttonTemp' onClick={changeUnitTemp}>Degrees °F / °C</button>
      </section>
      
    </article>
  )
}

export default WeatherCard