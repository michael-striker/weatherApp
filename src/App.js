import React, {useState, useEffect} from 'react';
import './App.css';
import Loader from './Loader.jsx';


function App() {
const [weatherData, setWeatherData] = useState(null);
const [response, setResponse] = useState('');
const updateResponse = (event) => {
    setResponse(event.target.value)
}; // input update

useEffect(() => {
  navigator.geolocation.getCurrentPosition(function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`; 
  // Not using https://www.metaweather.com/api/ because access to fetch has been blocked by CORS policy. Besides 'openweathermap' has better geolocation options and more locations to find.

  fetch(url)
  .then(res => res.json())
  .then(data => setWeatherData(data))
})}, []); // get current weather

const returnToStart = () => {
  setWeatherData(
    () => {
      navigator.geolocation.getCurrentPosition(function showPosition(position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;
  
      fetch(url)
      .then(res => res.json())
      .then(data => setWeatherData(data))
  })}
  )
};// get back to start

const weatherCheck = (event) => {
  if (event.key === 'Enter') {
    setTimeout(() => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${response}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;
  
    fetch(url)
    .then(res => res.json())
    .then(data => setWeatherData(data))
      }, 1000); // Set timeout for better UI
      
}};// get select weather

if (!weatherData ) {
  return (
  <div className='root'>
     <div className='container'>
         <Loader />
      </div>
    </div>
  )
}; // Render when we haven't any data from server
if (weatherData.cod === '404') {
  return (
      <div className='root'>
        <div className='container'>
             <p><b>
             Населённый пункт не найдет!
             </b></p>
             Возможна ошибка при вводе.<br></br>
             Вернитесь к началу и повторите попытку.
                 <button id='button' onClick={returnToStart}>
                  Вернуться к началу
                  </button>
         </div>
      </div>
  )
}; // Render when we get cod 404
if (weatherData.cod === '400') {
  return (
      <div className='root'>
        <div className='container'>
             <p><b>
             Вы ничего не ввели!
             </b></p>
             Вернитесь к началу и введите населённый пункт для поиска.
                 <button id='button' onClick={returnToStart}>
                  Вернуться к началу
                  </button>
         </div>
      </div>
  )
}; // Render when we get cod 400
  return (
  <div className='root'>
    <div className='container'>
      <>
        <div className='header'>
          <input type='text' id='input' onKeyPress={weatherCheck} onChange={updateResponse} defaultValue={weatherData.name}  /> 
        </div>
              <div className='description'>
                    Сейчас {weatherData.weather[0].description}
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={'иконка погоды'} />
              </div>
                    <p>Текущая температура {Math.round(weatherData.main.temp)} C°</p>
                    <p>Скорость ветра {Math.round(weatherData.wind.speed)} м/с</p>
                    <p>Влажность {weatherData.main.humidity} %</p>
       </>
    </div>
  </div>
  ); // Initial render
}

export default App;
