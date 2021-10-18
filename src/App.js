import "./App.css";
import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import Loading from "./Loading";
// var moment = require('moment')

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [weathers, setWeathers] = useState([]);
  const [city, setCity] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [allData, setAllData] = useState([]);

  // console.log(moment,'MOMENT');

  let url2 = `http://api.openweathermap.org/data/2.5/weather?q=dhanbad&units=metric&appid=19e66b5d28a7058c656d6585b66c39fd`;
  let iconUrl = "http://openweathermap.org/img/wn/10d@2x.png";

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(url2);
      const data = await response.json();
      setLoading(false);
      setAllData(data.weather[0]);
      setWeathers(data.main);
      setCity(data.sys);
      // console.log("WEATHER", weather.main.temp);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } 
  };

  let { temp, pressure, humidity } = weathers;
  let { sunrise, sunset } = city;
  
  console.log(allData, 'ALL DATA');
  
  // let {temp, pressure, humidity, sunrise, sunset} = weathers.current

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchWeather();
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });



    // console.log("Latitude is:", lat)
    // console.log("Longitude is:", long)
  }, [lat, long]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-sm">
      <section className="text-light py-2">
        <div className="container bg-danger rounded pb-2">
          <div className="d-flex flex-column text-center">
            <div>
              <h1>Weather App</h1>
            </div>
            <div className="mt-3">
              <input
                type="text"
                onChange={handleOnChange}
                value={search}
                placeholder="Search city"
              />
              {/* <button className="bg-light" onClick={} >Search</button> */}
            </div>
          </div>
        </div>
        <div className="container boarder-3 ">
          <WeatherCard weatherData={weathers.daily} />
        </div>

        <div className="container">
          <div className="text-dark d-flex justify-content-around pt-1 ">
            <div>
            <p className="fs-1 fw-bold   ">{temp} ^C</p>
            <p className='text-center fs-3 fw-bold' >
                {allData.main}
              </p>
            </div>
            
              <img
                className=""
                src={`http://openweathermap.org/img/wn/${allData.icon}@4x.png`}
                // src='http://openweathermap.org/img/wn/01d@4x.png'
                alt="img"
              />
              
            
            <p className="fs-1 fw-bold">
              {new Date(allData.timezone * 1000).toLocaleTimeString("en-IN", {timeStyle: "short"})}
            </p>
          </div>
        </div>

        <div className="container text-dark d-flex pt-2 justify-content-around ">
          <div className="bg-info px-4 rounded ">
            <p className="fs-2 fw-bold ">Pressure</p>
            <p className="fs-5 text-center">{pressure} hpa</p>
          </div>
          <div className="bg-info px-4 rounded ">
            <p className="fs-2 fw-bold ">Humedity</p>
            <p className="fs-5 text-center ">{humidity} %</p>
          </div>
        </div>

        <div className="d-flex text-dark justify-content-between pt-2">
          <div>
            <p className="fs-4 fw-bold">Sunrise</p>
            <p>{new Date(sunrise * 1000).toLocaleTimeString("en-IN", {timeStyle: "short"})}</p>
          </div>
          <div>
            <p className="fs-4 fw-bold">Sunset</p>
            <p>{new Date(sunset * 1000).toLocaleTimeString("en-IN", {timeStyle: "short"})} </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
