import { useContext, useEffect, useState, useRef } from "react";
import { WeatherProvider } from "../context/weatherData";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const {
    getWeather,
    setLocation,
    weatherIsFetched,
    weather,
    windSpeed,
    getDays,
    forecast,
    fiveDayForecast,
    dailyWeather,
    getLocation,
    temp,
    offlineMode,
    offlineData,
  } = useContext(WeatherProvider);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    offlineData();
  }, []);

  const show = useRef();

  const [units, setUnits] = useState("");
  const [btnIsClicked, setIsClicked] = useState(false);
  function convertToF() {
    const f = (temp * 9) / 5 + 32;
    setUnits(Math.round(f, 1));
    setIsClicked(true);
  }

  function convertToC() {
    const c = temp;
    setUnits(c);
    setIsClicked(false);
  }

  return (
    <main style={{ paddingInlineStart: "10rem" }}>
      <div>
        <section className="d-flex justify-center">
          <div className="container text-white">
            <div className="row">
              <div className="col-12 col-lg-6 row current-weather border border-secondary">
                <div className="gap-10 row">
                  <div className={weatherIsFetched ? "col-4 " : "col-10"}>
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control bg-dark border border-secondary my-2 text-white"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            getWeather();
                            getDays();
                            fiveDayForecast();
                          }
                        }}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="enter location"
                      />
                      <button className="btn btn-primary" onClick={convertToF}>
                        F
                      </button>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={convertToC}
                      >
                        C
                      </button>
                    </div>
                    {!weatherIsFetched ? (
                      <div className="py-10 fs-3">
                        please enter location in the input above
                      </div>
                    ) : (
                      <div className="animate__animated animate__fadeInLeft mt-10">
                        <div className="fs-1">{weather.name}</div>
                        <div>
                          <p>{weather.weather[0].description}</p>
                        </div>
                        <div className="display-5">
                          {units.length === 0 ? (
                            <span>{weather.main.temp}</span>
                          ) : (
                            units
                          )}

                          {btnIsClicked ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              color={"#ffffff"}
                              fill={"none"}
                            >
                              <circle
                                cx="5"
                                cy="6"
                                r="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M21 4H18C15.1716 4 13.7574 4 12.8787 4.87868C12 5.75736 12 7.17157 12 10V20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 12H19"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              color={"#ffffff"}
                              fill={"none"}
                            >
                              <circle
                                cx="5"
                                cy="6"
                                r="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M21 7C20.9557 6.3469 20.8561 5.88667 20.6321 5.5C20.3679 5.04394 19.9878 4.66523 19.5301 4.40192C18.8315 4 17.8936 4 16.0177 4C14.1419 4 13.2039 4 12.5053 4.40192C12.0476 4.66523 11.6676 5.04394 11.4033 5.5C11 6.19615 11 7.13077 11 9V15C11 16.8692 11 17.8038 11.4033 18.5C11.6676 18.9561 12.0476 19.3348 12.5053 19.5981C13.2039 20 14.1419 20 16.0177 20C17.8936 20 18.8315 20 19.5301 19.5981C19.9878 19.3348 20.3679 18.9561 20.6321 18.5C20.8561 18.1133 20.9557 17.6531 21 17"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {weatherIsFetched && (
                    <div className="col-4 animate__animated animate__fadeIn">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt=""
                        style={{ height: "30dvh", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="mt-3 ">
                  {forecast.length === 0 ? (
                    <div className=" d-flex justify-content-center mt-20">
                      Daily data will display here...
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "30dvh",
                        overflowY: "scroll",
                      }}
                    >
                      {dailyWeather.map((day, i) => (
                        <div
                          className="d-flex justify-content-between bg-dark py-2 px-3 mx-2 border rounded border-secondary"
                          key={i}
                        >
                          <div className="my-3 fs-10">
                            {new Date(day.date).toLocaleDateString("en", {
                              weekday: "short",
                            })}
                          </div>
                          <div>
                            <div className="col-4 animate__animated animate__fadeIn d-flex">
                              <div className="pt-3 d-flex gap-2">
                                <div>{day.tempMax}°C</div>
                                <div>/</div>
                                <div>{day.tempMin}°C</div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`col-6 my-2 border ms-4 rounded border-secondary ${
                  weatherIsFetched && "animate__animated animate__fadeIn"
                }`}
              >
                <p>conditions</p>
                <div className="row justify-content-between">
                  <div className="col-1">
                    <div className="d-flex gap-1">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#fffff"}
                          fill={"none"}
                        >
                          <path
                            d="M3.5 13.678C3.5 9.49387 7.08079 5.35907 9.59413 2.97222C10.9591 1.67593 13.0409 1.67593 14.4059 2.97222C16.9192 5.35907 20.5 9.49387 20.5 13.678C20.5 17.7804 17.2812 22 12 22C6.71878 22 3.5 17.7804 3.5 13.678Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M4 12.284C5.46463 11.8303 8.39159 11.6836 11.9842 13.7016C15.57 15.7157 18.516 14.9984 20 14.1354"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div>Humidity</div>
                    </div>
                    <div className="text-center fs-1 ml-4 ms-7">
                      {!windSpeed ? (
                        0
                      ) : (
                        <span className="animate__animated animate__fadeIn">
                          {weather.main.humidity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-5">
                    <div className="d-flex gap-1">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color={"#ffffff"}
                          fill={"none"}
                        >
                          <path
                            d="M2 5.94145C5.5 9.37313 10.5755 7.90241 11.7324 5.94145C11.9026 5.65301 12 5.31814 12 4.96096C12 3.87795 11.1046 3 10 3C8.89543 3 8 3.87795 8 4.96096"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M17 8.92814C17 7.31097 18.1193 6 19.5 6C20.8807 6 22 7.31097 22 8.92814C22 9.6452 21.7799 10.3021 21.4146 10.8111C19.3463 14.1915 9.2764 12.9164 4 11.8563"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M13.0854 19.8873C13.2913 20.5356 13.8469 21 14.5 21C15.3284 21 16 20.2528 16 19.331C16 19.0176 15.9224 18.7244 15.7873 18.4738C14.4999 15.9925 7.99996 14.3239 2 18.7746"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M19 15.5H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div>Wind speed</div>
                    </div>
                    <div className="d-flex me-20 justify-content-center">
                      <div className="text-center fs-1 ">
                        {!windSpeed ? (
                          0
                        ) : (
                          <span className="animate__animated animate__fadeIn">
                            {windSpeed}
                          </span>
                        )}
                      </div>
                      <div>km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container text-white">
            <div className="row my-2">
              {forecast.length === 0 ? (
                <div className="ms-20 ps-20 mt-5">
                  Hourly data will show here...
                </div>
              ) : (
                forecast.map((hourly) => (
                  <div
                    className="col-2 animate__animated animate__fadeInDown"
                    key={hourly.dt}
                  >
                    <div className="border border-secondary text-center rounded d-block">
                      <div>{hourly.dt_txt.slice(11, 16)}</div>
                      <img
                        src={`https://openweathermap.org/img/wn/${hourly.weather[0].icon}.png`}
                        alt=""
                      />
                      <div className="fs-3">{hourly.main.temp}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <p className="the-text">Your privacy is important to us. We only collect location data with your consent to provide accurate weather updates. No personal information is stored or shared. <span className="text-primary cursor" onClick={() => {
            show.current.classList.toggle("show-container")
          }}>Read more...</span></p>
        </section>
      </div>
      <div className="container the-container p-4 rounded" ref={show}>
        <p>
          The Weather App is designed with privacy and security in mind,
          ensuring that no personally identifiable information (PII) is
          collected or shared. It only accesses the user's geolocation data with
          explicit consent, which is used temporarily to provide accurate
          weather information. All data exchanged between the app and external
          APIs is encrypted using HTTPS to protect it during transmission. The
          app stores weather data locally in the browser’s localStorage for
          offline access, ensuring that no sensitive information is retained or
          transmitted. User data is minimized, and the app follows best
          practices to ensure user privacy and data security at all times.
        </p>
        <Toaster/>
        <button onClick={() => {
            show.current.classList.toggle("show-container")
          }} className="px-10">Okay</button>
      </div>
    </main>
  );
}
