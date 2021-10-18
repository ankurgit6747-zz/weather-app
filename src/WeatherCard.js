import React,{useState, useEffect} from "react";
import Loading from './Loading'

const WeatherCard = () => {

    const [loading, setLoding] = useState(true)
    const [allData, setAllData] = useState([])
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    let urlForcast = 'https://api.openweathermap.org/data/2.5/onecall?lat=28.2791&lon=77.7684&exclude=hourly,minutely&units=metric&appid=19e66b5d28a7058c656d6585b66c39fd'
    // let urlForcast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=19e66b5d28a7058c656d6585b66c39fd`

    const dailyForcast = async () => {
        setLoding(true)
        try {
            const response = await fetch(urlForcast)
            const data = await response.json()
            setLoding(false)
            setAllData(data.daily)
            console.log('DAILY',data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dailyForcast()
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          });
    }, [])

    if (loading) {
        return <Loading />;
      }

  return (
    <div className="d-flex text-centerc justify-content-around pt-4 rounded ">
      
        {
            allData.map((item) => {
                let {dt, temp, weather } = item
                return (
                    <div className="d-flex flex-column text-center text-dark fw-bold" key={dt}>
                        <span>{new Date(dt).toLocaleString("en-IN", {timeStyle: "short"})}</span>
                        <span>{new Date(dt).toLocaleString("en-IN", {weekday: "long" })}</span>
                        <span>{temp.day} ^C</span>
                        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="icon" />
                        <span>{weather[0].main}</span>
                     </div>   
                )
            })
        }
     
    </div>
  );
};

export default WeatherCard;
