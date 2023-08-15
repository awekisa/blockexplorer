import * as moment from 'moment';

export function timestampToDate(timestamp) {
    let result;
    let date = new Date(timestamp * 1000);
    let dateString = createDateString(date);

    return moment().format('MMMM Do YYYY, h:mm:ss a');
}
export function formatTimestamp(timestamp) {
    let result;
    let date = new Date(timestamp * 1000);
    let now = new Date(Date.now());

    if (date.getFullYear < now.getFullYear) {
        let dateString = createDateString(date);
        result = moment(dateString, 'YYYYMMDD').fromNow();
    } else if (date.getMonth() < now.getMonth()) {
        result = moment().startOf('month').fromNow();
    } else if (date.getDate() < now.getDate()) {
        result = moment().startOf('day').fromNow();
    } else if (date.getHours() < now.getHours()) {
        result = moment().startOf('hour').fromNow();
    } else if (date.getMinutes() < now.getMinutes()) {
        result = moment().startOf('minute').fromNow();
    } else if (date.getSeconds() < now.getSeconds()) {
        result = moment().startOf('second').fromNow();
    }

    return result;
}

export function truncateString(str, n) {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}

function createDateString(date) {
    return `${date.getFullYear}${date.getMonth()}${date.getDate}`;
}