import React from "react";

const WeatherCard = ({}) => {
  return (
    <div className="d-flex text-centerc justify-content-around pt-4 rounded ">
      <div className="d-flex flex-column text-center text-dark fw-bold">
        <span>Fri</span>
        <span>29 ^C</span>
        <img src='http://openweathermap.org/img/wn/10d@2x.png' alt="icon" />
        <span>Sunny</span>
      </div>
    </div>
  );
};

export default WeatherCard;
