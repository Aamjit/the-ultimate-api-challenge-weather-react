import React from 'react';
import UpcomingDaysForecastItem from '../UpcomingDaysForecastItem/UpcomingDaysForecastItem';

import styles from './UpcomingDaysForecast.module.css';

const UpcomingDaysForecast = props => {
    // const { day, night, maxTemperature, minTemperature, weekday } = props;

    const { days } = props;

    return (
        <ul className={`${styles.weekList} d-flex justify-content-between gap-4 flex-wrap p-0 w-full`}>
            {days.map(item => (
                <UpcomingDaysForecastItem {...item} key={item.weekday} />
            ))}
        </ul>
    );
};

export default UpcomingDaysForecast;
