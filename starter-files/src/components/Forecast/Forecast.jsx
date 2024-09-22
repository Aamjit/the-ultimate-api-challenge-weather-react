import React from 'react';
import PropTypes from 'prop-types';

import CurrentDay from '../CurrentDay/CurrentDay';
import CurrentDayDescription from '../CurrentDayDescription/CurrentDayDescription';
import UpcomingDaysForecast from '../UpcomingDaysForecast';
import { Container, Row, Col } from 'react-bootstrap';

import styles from './Forecast.module.css';

const Forecast = ({ forecast }) => {

    return (
        <Container className={`${styles.box} w-full h-full`}>
            <Row className="gap-4">
                <Col xs={12}>
                    {forecast?.currentDay && <CurrentDay {...forecast?.currentDay} />}
                    <hr />
                </Col>
                <Col xs={12} className="py-8 px-8">
                    {/* <CurrentDayDescription {...forecast} /> */}
                    <UpcomingDaysForecast days={forecast.comingDays} />
                </Col>
            </Row>
        </Container>
    );
};

Forecast.propTypes = {
    forecast: PropTypes.shape({
        currentDay: PropTypes.object,
        currentDayDetails: PropTypes.array,
        comingDays: PropTypes.array,
    }),
};

export default Forecast;
