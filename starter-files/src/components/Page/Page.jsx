import React, { Fragment, useEffect } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';

import useForecast from '../../Hooks/useForecast';

import styles from './Page.module.css';

const Page = () => {
    const { isError, isLoading, forecast, submitRequest } = useForecast();

    const onSubmit = location => {
        submitRequest(location);
    };

    return (
        <Fragment>
            <Header />
            {!forecast && (
                <div className={`${styles.box}`}>
                    {/* form */}
                    {!isLoading && <Form submitSearch={onSubmit} />}

                    {/* error */}
                    {isError && <Error message={isError} />}

                    {/* loader */}
                    {isLoading && <Loader />}
                </div>
            )}
            {/* forecast */}
            {forecast && <Forecast forecast={forecast} />}
        </Fragment>
    );
};

export default Page;
