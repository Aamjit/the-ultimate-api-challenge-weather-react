import moment from 'moment';

const getCurrentDayForecast = (location, data) => {

    return {
        // weekday: moment(data.applicable_date).format('dddd'),
        // date: moment(data.applicable_date).format('MMMM Do'),
        // location: title,
        // temperature: Math.round(data.the_temp),
        // weatherIcon: `https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`,
        // weatherDescription: data.weather_state_name,
        weekday: moment().format('dddd'),
        date: moment().format('MMMM Do'),
        location: location,
        // temperature: Math.round(data.the_temp),
        dailyForecasts: data.DailyForecasts[0],
        headline: data.Headline,
        weatherDescription: data.Headline.Category,
    };
};

export default getCurrentDayForecast;
