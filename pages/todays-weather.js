import Head from "next/head";
import { NavAside, Icon } from "components";
import { useEffect, useState, useRef, useMemo } from "react";
import { fetcher, useRequest } from "utils";
import getConfig from "next/config";
import styles from "./main.module.scss";

export default () => {
  const [city, setCity] = useState("taipei");
  const [country, setCountry] = useState("tw");
  const [query, setQuery] = useState("");

  const inputCityRef = useRef();
  const inputCountryRef = useRef();

  const { publicRuntimeConfig } = getConfig();

  const search = () => {
    setCity(inputCityRef.current.value);
    setCountry(inputCountryRef.current.value);
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

  const {data, loading, error} = useRequest(`${publicRuntimeConfig.api_path}?units=metric&q=${city},${country}&APPID=${publicRuntimeConfig.api_key}`);

  // useEffect(()=>{
  //   setQuery(`${city},${country}`);
  // },[city, country])

  // console.log(data, loading, error);
  console.log(data, error);
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
        {/* loading */}
        {loading && (<Icon name="loading"/>)}
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
          <div>
            {error.response.data.message}
          </div>
        )}
      </main>
    </div>
  )
}