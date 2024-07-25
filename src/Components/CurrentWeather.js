import React from 'react';

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) return null;

  const { city, main, weather, wind, sys, visibility } = weatherData;
  const { temp, humidity, pressure } = main;
  const { description, icon } = weather[0];
  const { speed } = wind;
  const { sunrise, sunset } = sys;

  const formatTime = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="current-weather">
     <div className="top">
     <div className="city">
        <h2>{weatherData.city}</h2>
        <p>{weatherData.weather[0].description}</p>
      </div>
      <div className="weather">
        <h2>{Math.round(weatherData.main.temp)}°C</h2>
      </div>
     </div>
    <div className="bottom">
    <div className="details">
        <div className='detail-cont'>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind: {Math.round(weatherData.wind.speed)} km/h</p>
        
          <p>Visibility: {visibility / 1000} km</p>
          <p>Wind Speed: {speed} m/s</p>
          </div>
      </div>
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
    </div>
    </div>
  );
};

export default CurrentWeather;

