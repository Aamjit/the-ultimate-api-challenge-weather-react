import React from 'react';

import styles from './UpcomingDaysForecastItem.module.css';
import getWeatherIcon from '../../helpers/getWeatherIcon';

const IMG_URL = 'https://www.metaweather.com/static/img/weather';

const UpcomingDaysForecastItem = ({ day, night, maxTemperature, minTemperature, weekday }) => (
    <li className={`${styles.weekday} d-flex flex-wrap flex-column p-2 border`}>
        <span className="mb-2 text-lg font-bold">{weekday}</span>
        <div className="flex flex-col">
            <div className="">Max: {maxTemperature}&deg;</div>
            <div className="">Min: {minTemperature}&deg;</div>
        </div>
        <div className='mt-4'>
            <p>Day Time</p>
            <img width="100" className="mb-2" src={getWeatherIcon(day.icon)} alt={day.iconPhrase} />
        </div>
        <div>
            <p>Night Time</p>
            <img width="100" className="mb-2" src={getWeatherIcon(night.icon)} alt={night.iconPhrase} />
        </div>
    </li>
);

export default UpcomingDaysForecastItem;
