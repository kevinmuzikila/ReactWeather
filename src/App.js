import './App.css';
import CurrentWeather from './Components/CurrentWeather';
import Search from './Components/Search';
import Forecast from './Components/Forecast';
import { WEATHER_URL, Api_key, Weather_onecall } from './Api';
import { useState, useEffect } from 'react';

function App() {
  const [foreData, setForeData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultLat = "-26.2048"; // Example: New York City latitude
  const defaultLon = "28.0369"; // Example: New York City longitude
  


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

  useEffect(() => {
    handleOnSearchChange({ value: `${defaultLat},${defaultLon}`, label: 'Johannesburg, Gauteng' });
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SimWeather</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Contact</a>
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
