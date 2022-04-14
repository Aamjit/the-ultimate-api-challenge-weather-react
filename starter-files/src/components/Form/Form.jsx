import React, { useState } from 'react';
import PropTypes from 'prop-types';

// proptype checks the components for props and define a type of the prop
// its is used to prevent breking of application incase of error return a default function

import styles from './Form.module.css';

const Form = ({ submitSearch }) => {
    const [location, setLocation] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (!location || location === '') return;
        submitSearch(location);
        /* location value is passed back to Page.jsx as parameter for onSubmit func ?? */
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Search for location"
                value={location}
                required
                onChange={e => setLocation(e.target.value)}
            />

            <button type="submit" className={styles.button} onClick={onSubmit}>
                SEARCH
            </button>
        </form>
    );
};

Form.prototype = {
    submitSearch: PropTypes.func.isRequired,
};

export default Form;
