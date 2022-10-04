import Head from "next/head";
import { NavAside, Icon } from "components";
import { useState, useRef } from "react";
import { useRequest } from "hooks";
import getConfig from "next/config";
import styles from "styles/main.module.scss";

export default () => {
  const [city, setCity] = useState("taipei");
  const [country, setCountry] = useState("tw");

  const inputCityRef = useRef();
  const inputCountryRef = useRef();

  // get API info from .env
  const { publicRuntimeConfig } = getConfig();

  const handleSearch = () => {
    setCity(inputCityRef.current.value);
    setCountry(inputCountryRef.current.value);
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  // To check description for icon display
  const categorize = (str) => {
    if (str == undefined) return "na";
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

  const { data, loading, error } = useRequest(`${publicRuntimeConfig.api_path}?units=metric&q=${city},${country}&APPID=${publicRuntimeConfig.api_key}`);

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
            <input type="text" id="city" defaultValue={city} ref={inputCityRef} onKeyPress={handleEnter} />
          </label>
          <label htmlFor="country" className={styles.label}>
            <span>Country: </span>
            <input type="text" id="country" defaultValue={country} ref={inputCountryRef} onKeyPress={handleEnter} />
          </label>
          <button onClick={handleSearch}>Search</button>
        </div>
        {/* loading */}
        {loading && (<Icon name="loading" />)}
        {/* render data */}
        {data.weather && (
          <div className={styles.weatherInfo}>
            <div className={styles.mainInfo}>
              <div className={styles.weatherImg}>
                <Icon name={categorize(data?.weather[0]?.description)} />
              </div>
              <div className={styles.description}>
                {data?.weather.length > 0 && (
                  <>
                    <h3 className={styles.weatherType}>{data?.weather[0]?.main || ""}</h3>
                    <p>{data?.weather[0]?.description}</p>
                  </>
                )}
              </div>
            </div>
            <p>Temperature: {data?.main.temp_min}°C ~ {data?.main.temp_max}°C</p>
            <p>Humidity: {data?.main.humidity}%</p>
          </div>
        )}
        {/* error message */}
        {error.response && (
          <div className={styles.error}>
            {error.response.data.message}
          </div>
        )}
      </main>
    </div>
  )
}