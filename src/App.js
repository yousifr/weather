import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "bb6946aee0a4f7f884e72d789e9755ff";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };
  const getCurrentDate = (separate = " / ") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separate}${
      month < 10 ? `0${month}` : `${month}`
    }${separate}${date}`;
  };
  return (
    <>
      <div className="hero">
        <main>
          <div>
            <input
              type="text"
              placeholder=" Search City..."
              className="searchbar"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              onKeyPress={getWeather}
            />
            {typeof weatherData.main === "undefined" ? (
              <div className="entcity">Please Enter The City!</div>
            ) : (
              <div>
                <p className="location">{weatherData.name}</p>
                <p className="date">{getCurrentDate()}</p>
                <p className="temp">
                  {Math.round(weatherData.main.temp)}&deg;C
                </p>
                <p className="desc">{weatherData.weather[0].main}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
export default App;
