import React from 'react';
import UpcomingDaysForecastItem from '../UpcomingDaysForecastItem/UpcomingDaysForecastItem';

import styles from './UpcomingDaysForecast.module.css';

const UpcomingDaysForecast = ({ days }) => (
    <ul className={`${styles.weekList} d-flex justify-content-between p-0`}>
        {days.map(item => (
            <UpcomingDaysForecastItem {...item} key={item.weekday} />
        ))}
    </ul>
);

export default UpcomingDaysForecast;
