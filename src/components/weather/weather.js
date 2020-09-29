import React, { useState, useEffect } from "react";
import axios from "axios";
import './weather.css'
import Forcast from './forcast'
import Hourly from './hourly'
// import Skycons from 'react-skycons';
import { transforTemp, transforTime, transforIcon } from "./transfor";

const Weather = ({ latitude, longitude }) => {
    const [weather, setWeather] = useState(null);
    const [forcast, setForcast] = useState([])
    const [hourly, setHourly] = useState([])
    const [backgroundPic, setBackgroundPic] = useState("")
    const [showId, setShowId] = useState(true)

    useEffect(() => {
        getWeather();
    }, [latitude]);

    const getWeather = async () => {
        try {
            //   const proxy = "https://cors-anywhere.herokuapp.com/";
            //   let res = await axios
            //     // .get(
            //     //   `${WeatherApi}/${newLat}/${newLong}`
            //     // )
            //     .get(
            //       `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`
            //     );
            let res = await axios.get(
                `https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERO_API_KEY}&product=observation&latitude=${latitude}&longitude=${longitude}`
            );

            let res_seven_days = await axios.get(
                `https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERO_API_KEY}&product=forecast_7days_simple&latitude=${latitude}&longitude=${longitude}`
            );

            let hourly = await axios.get(
                `https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=${process.env.REACT_APP_HERO_API_KEY}&product=forecast_hourly&latitude=${latitude}&longitude=${longitude}`
            );

            setForcast(res_seven_days.data.dailyForecasts.forecastLocation.forecast)
            setHourly(hourly.data.hourlyForecasts.forecastLocation.forecast)
            setWeather(res.data.observations?.location[0]);
            getCityPic(res.data.observations?.location[0]?.city)
            // covidResult(res.data.observations?.location[0]?.country)
            // console.log(res.data.observations?.location[0]);
        } catch (e) {
            console.error(e);
        }
    };

    // const covidResult = async (countryName) => {
    //     try {
    //         let res = await axios.get(`https://covid-193.p.rapidapi.com/statistics`, {
    //             params: {
    //                 search: countryName,

    //             },
    //             "headers": {
    //                 "x-rapidapi-host": "covid-193.p.rapidapi.com",
    //                 "x-rapidapi-key": "c4aecc0010msh5df4faa484eb9a0p17c290jsn73d09489ef94"
    //             }
    //         })

    //     } catch (err) {
    //         console.error(err);
    //     }

    // }

    const getCityPic = async (cityName) => {
        try {
            let res = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query: cityName,
                    orientation: 'portrait'
                },
                headers: {
                    Authorization: 'Client-ID DGc62apQ1xE4VOLQ8tqfK1Z6Q14h5dT0KNJS6b8wNaw',
                },
            })
            // console.log(res.data);
            let random_no = Math.floor(Math.random() * res.data.results.length + 1)
            // console.log(random_no);
            setBackgroundPic(res.data.results[random_no].urls.regular)
        } catch (err) {
            setBackgroundPic("./images/background.jpg")
            console.error(err);
        }
    }
    // const iconDisplay = weather?.observation[0]?.iconName ? transforIcon(weather?.observation[0]?.iconName) : ""
    const icons = weather?.observation[0]?.iconLink.replace('ls.hereapi', 'api.here')
    const daliyStyle = showId ? { height: "30px" } : { border: "none" }
    const hourlyStyle = showId ? { border: "none" } : { height: "30px" }
    if (!weather) return <div>Loading...</div>
    return <div className="weather-area" style={{ background: `url(${backgroundPic}) no-repeat center` }}>
        <div className="weather-info">
            <h1>{weather?.city}</h1>
            <div>{weather?.observation[0]?.state}, {weather?.country}</div>
            <div className="temp-area">
                <div className="iocn-area">
                    <span className="icon-icon"><img src={icons} alt="icons" /></span>

                </div>
                <div className="display-temp">
                    <span className="real-temp">{transforTemp(weather?.observation[0]?.temperature)}℃</span>
                    <span className="feels-temp">Feels like {transforTemp(weather?.observation[0]?.comfort)}℃</span>
                    <span>{weather?.observation[0]?.description}</span>
                    <span>{transforTemp(weather?.observation[0]?.highTemperature)}℃ / {transforTemp(weather?.observation[0]?.lowTemperature)}℃</span>
                </div>

            </div>
            <div className="display-daily"><span className="controler-daily" style={daliyStyle} onClick={() => setShowId(true)}>Daily</span><span className="controler-daily" style={hourlyStyle} onClick={() => setShowId(false)}>Hourly</span></div>
            {showId ? <Forcast forcast={forcast} /> : <Hourly hourly={hourly} />}

            <div style={{ height: "10px" }}></div>
        </div>


    </div>

};

export default Weather;
