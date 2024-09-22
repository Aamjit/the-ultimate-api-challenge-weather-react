import moment from 'moment';

const getWeekday = date => moment(new Date(0).setUTCSeconds(date)).format('dddd').substring(0, 3);

const getUpcomingDaysForecast = DailyData =>
    DailyData.DailyForecasts.slice(1).map(data => {
        return {
            day: {
                icon: data.Day.Icon,
                iconPhrase: data.Day.IconPhrase,
                shortPhrase: data.Day.ShortPhrase,
                wind: data.Day.Wind,
                rain: data.Day.Rain,
            },
            night: {
                icon: data.Night.Icon,
                shortPhrase: data.Night.ShortPhrase,
                wind: data.Night.Wind,
                rain: data.Night.Rain,
            },
            // temperature: Math.round(day.max_temp),
            maxTemperature: data.Temperature.Maximum.Value + '°' + data.Temperature.Maximum.Unit,
            minTemperature: data.Temperature.Minimum.Value + '°' + data.Temperature.Minimum.Unit,
            weekday: getWeekday(data.EpochDate),
        };
    });

export default getUpcomingDaysForecast;
