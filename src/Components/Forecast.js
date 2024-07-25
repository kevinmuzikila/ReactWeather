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
      <div class="accordion accordion-flush" id="accordionFlushExample">
        {forecastData.list.splice(0, 7).map((item, idx) => (
             <div class="accordion-item" key={idx} >
             <h2 class="accordion-header" id="flush-headingOne">
               <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                
                 <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weatherImg" />
                 <h4>{forecastDay[idx]} </h4>
                 <p>{item.weather[0].description} </p>
                 <h6>{Math.round(item.main.temp_min)} C/{Math.round(item.main.temp_min)} C</h6>
                 
               </button>
             </h2>
             <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
               <div class="accordion-body">
                 <p></p>
                 Placeholder content for this accordion, which is intended to demonstrate the 
                 <code>.accordion-flush</code>
                  class. This is the first item's accordion body.
                 </div>
             </div>
           </div>
        ))}
       

      </div>
    </div>
  );
};

export default Forecast;
