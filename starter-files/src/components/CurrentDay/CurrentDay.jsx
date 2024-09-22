import React from 'react';
import PropTypes from 'prop-types';

import locationIcon from './assets/location-pin.png';
import styles from './CurrentDay.module.css';
import getWeatherIcon from '../../helpers/getWeatherIcon';
import { Col, Row } from 'react-bootstrap';

const getDaysTemperature = dailyForecasts => {
    return (
        <div className="d-flex gap-4 flex-wrap bg-slate-700 px-4 py-8 rounded-lg w-fit">
            <h2 className="block w-full my-auto font-bold">Temperature</h2>
            <div className="inline-flex flex-col">
                <h4 className="block w-full">Minimum</h4>
                <span className="inline-flex">
                    <p className="mb-0">{dailyForecasts.Temperature.Minimum.Value}</p>
                    <p className="mb-0">°{dailyForecasts.Temperature.Minimum.Unit}</p>
                </span>
            </div>
            <div className="inline-flex flex-col">
                <h4 className="block w-full">Maximum</h4>
                <span className="inline-flex">
                    <p className="mb-0">{dailyForecasts.Temperature.Maximum.Value}</p>
                    <p className="mb-0">° {dailyForecasts.Temperature.Maximum.Unit}</p>
                </span>
            </div>
        </div>
    );
};

const getDaysWind = dailyForecasts => {
    return (
        <div className="d-flex gap-4 flex-wrap bg-slate-500 p-2 rounded-lg">
            <h2 className="block w-full my-auto font-bold">Wind</h2>
            <div className="inline-flex flex-col">
                <h4 className="block w-full">Speed</h4>
                <span className="inline-flex">
                    <p className="mb-0">{dailyForecasts.Wind.Speed.Value}</p>
                    <p className="mb-0">{dailyForecasts.Wind.Speed.Unit}</p>
                </span>
            </div>
            <div className="inline-flex flex-col">
                <h4 className="block w-full">Direction</h4>
                <span className="inline-flex">
                    <p className="mb-0">{dailyForecasts.Wind.Direction.Degrees}</p>
                    <p className="mb-0">°{dailyForecasts.Wind.Direction.Localized}</p>
                </span>
            </div>
        </div>
    );
};
const getDaysRain = dailyForecasts => {
    return (
        <div className="d-flex gap-4 flex-wrap bg-slate-500 p-2 rounded-lg">
            <h2 className="block w-full my-auto font-bold">Rain</h2>
            <div className="inline-flex flex-col">
                <h4 className="block w-full">Quantity</h4>
                <span className="inline-flex">
                    <p className="mb-0">{dailyForecasts.Rain.Value | '0.0'}</p>
                    <p className="mb-0">{dailyForecasts.Rain.Unit}</p>
                </span>
            </div>
        </div>
    );
};

const CurrentDay = props => {
    // console.log(props);

    const { weekday, date, dailyForecasts, headline, location, weatherDescription } = props;

    return (
        <div className="h-full w-full py-8 px-8">
            <Row>
                <Col className="grid gap-2 content-start">
                    <div className="grid gap-2">
                        <h2 className="font-weight-bold mb-2">{weekday}</h2>
                        <p className="mb-2 text-4xl">{date}</p>
                        <p className="d-flex gap-2 align-items-baseline font-weight-lighter mb-1">
                            <img width="10" height="15" src={locationIcon} alt="location pin" />
                            {/* <span>{location}</span> */}
                            <span>{'Imphal'}</span>
                        </p>
                        {/* Temperature */}
                        {getDaysTemperature(dailyForecasts)}
                    </div>
                    <div className="w-full text-xl font-sans">{headline.Text}</div>
                </Col>
                <Col>
                    <div className="w-full d-flex justify-evenly gap-4 
                    bg-slate-700 flex-wrap px-4 py-8 rounded-lg min-w-96">
                        {/* Day */}
                        <div className="inline-flex gap-3 flex-col flex-1">
                            <h1 className="block w-full font-bold">Day Time</h1>
                            <img
                                className="w-52"
                                src={getWeatherIcon(dailyForecasts.Day.Icon)}
                                alt={`${dailyForecasts.Day.IconPhrase}`}
                            />
                            <h5 className="font-semibold">{dailyForecasts.Day.ShortPhrase}</h5>
                            <p className="font-weight-lighter font-sans">{dailyForecasts.Day.LongPhrase}</p>
                            {getDaysWind(dailyForecasts.Day)}
                            {getDaysRain(dailyForecasts.Day)}
                        </div>

                        <div className="h-full w-1 border-l"></div>

                        {/* Night */}
                        <div className="inline-flex gap-3 flex-col flex-1">
                            <h1 className="block w-full font-bold">Night Time</h1>
                            <img
                                className="w-52"
                                src={getWeatherIcon(dailyForecasts.Night.Icon)}
                                alt={`${dailyForecasts.Night.IconPhrase}`}
                            />
                            <h5 className="font-semibold">{dailyForecasts.Night.ShortPhrase}</h5>
                            <p className="font-weight-lighter font-sans">{dailyForecasts.Night.LongPhrase}</p>
                            {getDaysWind(dailyForecasts.Night)}
                            {getDaysRain(dailyForecasts.Night)}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

CurrentDay.propTypes = {
    weekday: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    weatherDescription: PropTypes.string.isRequired,
};

export default CurrentDay;
