import Head from "next/head";
import { NavAside, Icon } from "components";
import { useEffect, useState, useRef, useMemo } from "react";
import { fetcher } from "utils";
import getConfig from "next/config";
import styles from "./main.module.scss";

export default () => {
  const [weatherData, setWeatherData] = useState(null);
  const [statusCode, setStatusCode] = useState();
  const [city, setCity] = useState("london");
  const [country, setCountry] = useState("GB");

  const inputCityRef = useRef();
  const inputCountryRef = useRef();

  const { publicRuntimeConfig } = getConfig();

  const search = () => {
    setCity(inputCityRef.current.value);
    setCountry(inputCountryRef.current.value);
  }

  // To check description for icon display
  const categorize = (str) => {
    if (str.includes("clear")) {
      return "clear";
    } else if (str.includes("rain")) {
      return "rain";
    } else if (str.includes("cloud")) {
      return "cloud";
    } else {
      return "na";
    }
  }

  useEffect(() => {
    let query = "";
    if (city || country) {
      query = `${city},${country}`;
    }
    fetcher(`${publicRuntimeConfig.api_path}?units=metric&q=${query}&APPID=${publicRuntimeConfig.api_key}`, { setState: setWeatherData });
  }, [city, country]);

  useEffect(() => {
    if (weatherData?.cod) {
      setStatusCode(weatherData.cod);
    }
  }, [weatherData])

  // console.log(weatherData);
  // console.log(statusCode)
  return (
    <div className="flex">
      <Head>
        <title>Today weather</title>
      </Head>
      <NavAside />
      <main>
        <h1>Today weather</h1>
        <div className={styles.filter}>
          <label htmlFor="city" className={styles.label}>
            <span>City: </span>
            <input type="text" id="city" defaultValue={city} ref={inputCityRef} />
          </label>
          <label htmlFor="country" className={styles.label}>
            <span>Country: </span>
            <input type="text" id="country" defaultValue={country} ref={inputCountryRef} />
          </label>
          <button onClick={search}>Search</button>
        </div>
        {(statusCode === 200 && weatherData?.weather) ? (
          <div className={styles.weatherInfo}>
            <div className={styles.mainInfo}>
              <div className={styles.weatherImg}>
                <Icon name={categorize(weatherData.weather[0].description)} />
              </div>
              <div className={styles.description}>
                {weatherData.weather && (
                  <>
                    <h3 className={styles.weatherType}>{weatherData.weather[0].main || ""}</h3>
                    <p>{weatherData.weather[0].description}</p>
                  </>
                )}
              </div>
            </div>
            <p>Temperature: {weatherData.main.temp_min}°C ~ {weatherData.main.temp_max}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        ) : (<div>Loading</div>)}
        {weatherData?.message && (
          <div>
            {weatherData.message}
          </div>
        )}
      </main>
    </div>
  )
}