import axios from "axios";
import { createContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { format } from "date-fns";


export const WeatherProvider = createContext();

const WeatherData = ({ children }) => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherIsFetched, setWeatherIsFetched] = useState(false);
  const [windSpeed, setWindSpeed] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [todayDate, setTodayDate] = useState('');
  const [geoLocation, setGeoLocation] = useState([]);
  const [openweathername, setOpenweathername] = useState('');
  const [dailyWeather, setDailyWeather] = useState([]);
  const [temp, setTemp] = useState('');

  const [offlineMode, setOfflinemode] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const geoData = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };

          async function detectCurrent() {
            try {
              if (!navigator.onLine) {
                offlineData();
                setOfflinemode(true);
                alert("You are offline. Using offline data.");
                return; // Avoid API call if offline
              }
          
              const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric`
              );
              const data = res.data;
          
              if (res.status === 200) {
                setWeather(data);
                setWeatherIsFetched(true);
                setWindSpeed(data.wind.speed);
                setOpenweathername(data.name);
                setTemp(data.main.temp);
                localStorage.setItem("weatherData", JSON.stringify(data));
          
                // Add weather alerts
                const weatherDescription = data.weather[0].description.toLowerCase();
                if (weatherDescription.includes("rain")) {
                  
                } else if (weatherDescription.includes("snow")) {
                  alert("Snowfall detected. Stay warm!");
                } else if (weatherDescription.includes("storm")) {
                  alert("Stormy weather ahead. Be cautious!");
                } else if (data.main.temp > 35) {
                  alert("It's very hot outside. Stay hydrated!");
                } else if (data.main.temp < 5) {
                  alert("It's quite cold outside. Dress warmly!");
                } else {
                  alert(`The current weather is ${weatherDescription}.`);
                }
              }
            } catch (error) {
              if (!navigator.onLine) {
                offlineData();
                setOfflinemode(true);
                alert("You are offline. Unable to fetch live weather data.");
              } else {
                alert("Failed to fetch weather data. Please try again later.");
              }
            }
          }
          

          detectCurrent();

          async function detectHourly() {
            try {
              if (!navigator.onLine) {
                offlineData();
                setOfflinemode(true);
                return; // Avoid API call if offline
              }

              const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric`
              );
              const data = res.data;
              if (res.status === 200) {
                setForecast(data.list.slice(0, 5));
                localStorage.setItem("forecastData", JSON.stringify(data));
              }
            } catch (error) {
              console.log(error);
            }
          }
          detectHourly();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      alert("Your browser does not support geolocation.");
    }
  };

  useEffect(() => {
    if (openweathername) {
      detectFiveDays();
    }
  }, [openweathername]);

  async function detectFiveDays() {
    try {
      if (!navigator.onLine) {
        offlineData();
        setOfflinemode(true);
        return; // Avoid API call if offline
      }

      const area = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${openweathername}&count=10&language=en&format=json`
      );
      const areaData = area.data;

      if (areaData.results && areaData.results.length > 0) {
        const geo = areaData.results[0];
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&timezone=${geo.timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );

        const data = res.data.daily;
        const dailyData = data.time.map((time, index) => ({
          date: time,
          weatherCode: data.weathercode[index],
          tempMax: data.temperature_2m_max[index],
          tempMin: data.temperature_2m_min[index],
        }));

        setDailyWeather(dailyData);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      if (!navigator.onLine) {
        offlineData();
        setOfflinemode(true);
      }
      console.log(error);
    }
  }

  function offlineData() {
    const weatherData = JSON.parse(localStorage.getItem("weatherData"));
    const forecastData = JSON.parse(localStorage.getItem("forecastData"));

    if (weatherData) {
      setWeather(weatherData);
      setWeatherIsFetched(true);
      setWindSpeed(weatherData.wind.speed);
      setTemp(weatherData.main.temp);
    } else {
      console.log("No offline data available");
    }

    if (forecastData) {
      setForecast(forecastData.list.slice(0, 5));
    } else {
      console.log("No offline forecast data available");
    }
  }

  async function getWeather() {
    try {
      if (!navigator.onLine) {
        offlineData();
        setOfflinemode(true);
        return; // Avoid API call if offline
      }

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric`
      );
      const data = res.data;
      if (res.status === 200) {
        setWeather(data);
        setWeatherIsFetched(true);
        setWindSpeed(data.wind.speed);
        setTemp(data.main.temp);
        localStorage.setItem("weatherData", JSON.stringify(data));
      }
    } catch (error) {
      if (!navigator.onLine) {
        offlineData();
        
      }
    }
  }

  async function getDays() {
    try {
      if (!navigator.onLine) {
        offlineData();
        setOfflinemode(true);
        return; // Avoid API call if offline
      }

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=6fcaddaefdf79e82f2dd23bb74194ed6&units=metric`
      );
      const data = res.data;
      if (res.status === 200) {
        setForecast(data.list.slice(0, 5));
        localStorage.setItem("forecastData", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fiveDayForecast() {
    try {
      if (!navigator.onLine) {
        offlineData();
        setOfflinemode(true);
        return; // Avoid API call if offline
      }

      const area = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`
      );
      const areaData = area.data;
      const geo = areaData.results.at(0);
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&timezone=${geo.timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );

      const data = res.data.daily;
      const dailyData = data.time.map((time, index) => ({
        date: time,
        weatherCode: data.weathercode[index],
        tempMax: data.temperature_2m_max[index],
        tempMin: data.temperature_2m_min[index],
      }));

      setDailyWeather(dailyData);
    } catch (error) {
      if (!navigator.onLine) {
        offlineData();
        setOfflinemode(true);
      }
      console.log(error);
    }
  }

  return (
    <WeatherProvider.Provider
      value={{
        weather,
        setLocation,
        weatherIsFetched,
        getWeather,
        windSpeed,
        forecast,
        getDays,
        fiveDayForecast,
        dailyWeather,
        getLocation,
        temp,
        offlineData,
        offlineMode
        
      }}
    >
      {children}
    </WeatherProvider.Provider>
  );
};

export default WeatherData;
