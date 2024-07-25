import './App.css';
import CurrentWeather from './Components/CurrentWeather';
import Search from './Components/Search';
import Forecast from './Components/Forecast';
import { WEATHER_URL, Api_key,Weather_onecall } from './Api';
import { useState } from 'react';

function App() {
  const [foreData, setForeData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(',');

    setLoading(true);
    setError(null);

    const currWeathFetch = fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${Api_key}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Api_key}&units=metric`);

    Promise.all([currWeathFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
      

        console.log('Weather Response:', weatherResponse);
        console.log('Forecast Response:', forecastResponse);
  

        setWeatherData({ city: searchData.label, ...weatherResponse });
        setForeData({ city: searchData.label, ...forecastResponse });
      
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        handleOnSearchChange({ value: `${latitude},${longitude}`, label: 'Current Location' });
      }, (error) => {
        setError('Unable to retrieve your location');
      });
    } else {
      setError('Geolocation is not supported by this browser');
    }
  };

  return (
    <div className="App">
  
    
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">SimWeather</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      

      <div className="search-cont">
        <Search onSearchChange={handleOnSearchChange} />
        {/* <button onClick={getCurrentLocation}>Use Current Location</button> */}
      </div>
      <div className="home-cont">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && weatherData && <CurrentWeather weatherData={weatherData} />}  
      </div>
      {!loading && !error && foreData && <Forecast forecastData={foreData} />}
    </div>
  );
}

export default App;
