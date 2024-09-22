import { useState } from 'react';
import axios from 'axios';

import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';

// const BASE_URL = 'https://www.metaweather.com/api/location';
const BASE_URL = 'http://dataservice.accuweather.com';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${BASE_URL}`;
// const RegionList = [];

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);
    const [regionList, setRegionList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const getRegionList = async () => {
        setLoading(true);
        regionList.length == 0 &&
            axios
                .get(
                    `${REQUEST_URL}/locations/v1/regions?apikey=${
                        import.meta.env.VITE_ACCUWEATHER_APIKEY
                    }&language=en-us`,
                    {
                        headers: {
                            withCredentials: false,
                            // 'Access-Control-Allow-Origin': '*',
                        },
                    }
                )
                .then(res => {
                    setRegionList([...res.data]);
                    // console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(setLoading(false));
    };

    const getCountryList = async regionKey => {
        setLoading(true);
        if (regionKey == '') setCountryList([]);

        countryList.length == 0 &&
            axios
                .get(
                    `${REQUEST_URL}/locations/v1/countries/${regionKey}?apikey=${
                        import.meta.env.VITE_ACCUWEATHER_APIKEY
                    }&language=en-us`,
                    {
                        headers: {
                            withCredentials: false,
                        },
                    }
                )
                .then(res => {
                    setCountryList([...res.data]);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(setLoading(false));
    };

    const getWoeid = async location => {
        const { data } = await axios(`${REQUEST_URL}/search`, { params: { query: location } });

        if (!data || data.length === 0) {
            // set error
            setError('Unable to fetch that location! 🙁');
            setLoading(false);
            return;
        }
        const woeid = data[0].woeid;

        return woeid;
    };

    const getWeatherData = async woeid => {
        const { data } = await axios(`${REQUEST_URL}/${woeid}`);
        if (!data || data.length === 0) {
            setError('There is no data on that location! 🙁');
            setLoading(false);
            return;
        }
        return data;
    };

    const gatherForecastData = async (location, upcomingDaysData) => {
        // console.log(data);

        const currentDay = getCurrentDayForecast(location?.EnglishName, upcomingDaysData);
        // const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const comingDays = getUpcomingDaysForecast(upcomingDaysData);

        setForecast({
            location: location,
            currentDay: { ...currentDay },
            comingDays: [...comingDays],
        });
        setLoading(false);
    };

    const getCityList = async (country, location) => {
        const cityData = await axios(
            `${REQUEST_URL}/locations/v1/cities/${country}/search?apikey=${
                import.meta.env.VITE_ACCUWEATHER_APIKEY
            }&q=${location}&language=en-us`
        );

        if (!cityData) {
            // set error
            setError('Unable to fetch that location! 🙁');
            setLoading(false);
            return;
        }

        setCityList(cityData.data);
    };

    const submitRequest = async location => {
        setLoading(true);
        setError(false);

        // const weatherData = await axios(
        //     `${REQUEST_URL}/forecasts/v1/daily/1day/${location?.Key | 189551}?apikey=${
        //         import.meta.env.VITE_ACCUWEATHER_APIKEY
        //     }&language=en-us&details=true&details=true&metric=true`
        // );

        const weather5daysForecast = await axios(
            `${REQUEST_URL}/forecasts/v1/daily/5day/${location?.Key}?apikey=${
                import.meta.env.VITE_ACCUWEATHER_APIKEY
            }&language=en-us&details=true&details=true&metric=true`
        );

        if (!weather5daysForecast?.data) {
            setError('There is no data on that location! 🙁');
            setLoading(false);
            return;
        }

        weather5daysForecast.data && gatherForecastData(location, weather5daysForecast.data);
    };

    return {
        isError,
        isLoading,
        forecast,
        regionList,
        getRegionList,
        submitRequest,
        countryList,
        getCountryList,
        cityList,
        getCityList,
    };
};

export default useForecast;
