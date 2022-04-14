import { useState } from 'react';
import axios from 'axios';

import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';

const BASE_URL = 'https://www.metaweather.com/api/location';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

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

    const gatherForecastData = data => {
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const comingDays = getUpcomingDaysForecast(data.consolidated_weather);
        setForecast({ currentDay, currentDayDetails, comingDays });
        setLoading(false);
    };

    const submitRequest = async location => {
        // woe ID
        // get weather
        setLoading(true);
        setError(false);
        const woeid = await getWoeid(location);
        if (!woeid) return;
        const returnedWeatherData = await getWeatherData(woeid);
        gatherForecastData(returnedWeatherData);
    };

    return {
        isError,
        isLoading,
        forecast,
        submitRequest,
    };
};

export default useForecast;
