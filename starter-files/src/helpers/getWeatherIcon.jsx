const getWeatherIcon = Icon => {
    return `https://developer.accuweather.com/sites/default/files/${Icon < 10 ? `0${Icon}` : Icon}-s.png`;
};

export default getWeatherIcon;
