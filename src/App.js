import React, {useState, useEffect} from 'react';
import './App.css';
import Loader from './Loader.jsx';
import Time from './Time.jsx';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState('');
  const [response, setResponse] = useState('');
  const updateResponse = (event) => {
    setResponse(event.target.value)
};
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        setWeatherData(data);
        setIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    })
})}, []); // get current weather

const answerCheck = (event) => {
  if (event.key === "Enter") {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${response}&appid=7c8e042c09a447200763fa7fff3a0e64&units=metric&lang=ru`;
      

  fetch(url)
  .then(response => response.json())
  .then(data => {
      setWeatherData(data);
      setIcon(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
  })
}};// get select weather

  
  return (
  <div className='root'>
    <div className='container'>
      {!weatherData ? <Loader /> :
      (
      <>
        <div className='header'>
          <input id="input" onKeyPress={answerCheck} onChange={updateResponse} defaultValue={weatherData.name}  />
          <img src={icon} alt={weatherData.description} />
        </div>
          <p>Текущая температура {Math.round(weatherData.main.temp)} C°</p>
          <p>Скорость ветра {Math.round(weatherData.wind.speed)} м/с</p>
          <p>Влажность {weatherData.main.humidity} %</p>
        <Time />
    </>
    )}
    </div>
  </div>
  )
}

export default App;
