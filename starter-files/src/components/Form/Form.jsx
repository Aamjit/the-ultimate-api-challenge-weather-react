import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// proptype checks the components for props and define a type of the prop
// its is used to prevent breking of application incase of error return a default function

import styles from './Form.module.css';
import DropDown from './DropDown';
import useForecast from '../../Hooks/useForecast';
import { Button } from 'react-bootstrap';

const Form = ({ submitSearch }) => {
    const { getRegionList, getCountryList, regionList, countryList, cityList, getCityList } = useForecast();
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        regionList.length == 0 && getRegionList();
    }, []);

    const handleRegionSelected = item => {
        getCountryList(item.ID);
    };

    const handleCountrySelected = item => {
        setCountry(item.ID);
    };

    const handleCitySelected = item => {
        setCity(item);
    };

    const onSubmit = e => {
        e.preventDefault();
        submitSearch(city);
    };

    return (
        <form onSubmit={onSubmit} className="max-w-screen-xl p-4 m-4 d-flex flex-col gap-4 justify-evenly">
            {regionList.length != 0 && (
                <DropDown label={'Region'} list={regionList} handleSelected={handleRegionSelected} keyField={'ID'} />
            )}
            {countryList.length != 0 && (
                <DropDown label={'Country'} list={countryList} handleSelected={handleCountrySelected} keyField={'ID'} />
            )}

            {/* <label id="label-city">Type a city Name</label> */}
            <div className="inline-flex gap-4 flex-auto flex-grow">
                <input
                    aria-label="#label-city"
                    aria-labelledby="#label-city"
                    type="text"
                    // className={`${styles.input} form-control`}
                    className="my-2 form-control"
                    placeholder="Search for cities"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <Button
                    className="w-1/2"
                    type="success"
                    onClick={e => {
                        e.preventDefault();
                        getCityList(country, location);
                    }}
                >
                    Search city
                </Button>
            </div>

            {cityList.length != 0 && (
                <DropDown label={'City'} list={cityList} handleSelected={handleCitySelected} keyField={'Key'} />
            )}

            <button type="submit" className={styles.button} onClick={onSubmit}>
                Fetch Weather
            </button>
        </form>
    );
};

Form.prototype = {
    submitSearch: PropTypes.func.isRequired,
};

export default Form;
