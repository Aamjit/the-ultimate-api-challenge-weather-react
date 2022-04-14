import React from 'react';

import styles from './UpcomingDaysForecastItem.module.css';

const IMG_URL = 'https://www.metaweather.com/static/img/weather';

const UpcomingDaysForecastItem = ({ weekday, imgUrl, temperature }) => (
    <li className={`${styles.weekday} d-flex flex-column justify-content-center align-items-center p-2`}>
        <img width="30" className="mb-2" src={`${IMG_URL}/${imgUrl}.svg`} alt="" />
        <span className="mb-2">{weekday}</span>
        <span className="font-weight-bold">{temperature}&deg;</span>
    </li>
);

export default UpcomingDaysForecastItem;
