import React from 'react';


const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ forecastData }) => {

  if (!forecastData) return null;

  const dayInWeek = new Date().getDay();
  const forecastDay = weekDays.slice(dayInWeek, weekDays.length).concat(
    weekDays.slice(0, dayInWeek)
  );

  console.log(forecastDay)

  const { city, list } = forecastData;

  return (
    <div className="forecast">
      <h2>Daily Forecast </h2>
      <div className="forecast-cont">
      {forecastData.list.splice(0, 6).map((item, idx) => (
             
           <div class="card fore-card" key={idx}>
           <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weatherImg"  class="card-img-top fore-img" />
           <div class="card-body">
           <h4>{forecastDay[idx]} </h4>
             <p class="card-text fore-text">{item.weather[0].description}</p>
             <h6>{Math.round(item.main.temp_min)}°C/{Math.round(item.main.temp_max)}°C</h6>
           </div>
         </div>
      ))}
      </div>

       
  
       {/* */}
      
    </div>
  );
};

export default Forecast;
