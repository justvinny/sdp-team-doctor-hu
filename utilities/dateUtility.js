const getFormattedDateNow = (date = new Date()) => `${getFormattedDateNoTime(date)} - ${getFormattedTime(date)}`;
const getFormattedDateNoTime = (date) =>  `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const getFormattedTime = (date) => {
    let hours = date.getHours() === 0 ? 12 : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    if (date.getHours() < 12) {
        return `${hours}:${minutes} AM`;
    }
    return `${hours === 12 ? hours : hours % 12}:${minutes} PM`;
}


const getFormattedDayNow = (date = new Date()) => {
    switch (date.getDay()) {
        case 0:
            return "Sun"
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thur"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
    }
}
const getDateDifferenceInDays = (date1, date2) => {
    // Formula below converts the difference of the two dates from timestamp format to
    // number of days format.
    return (date1 - date2) / (1000 * 60 * 60 * 24);
}

const dateUtility = {
    getFormattedDateNow,
    getFormattedDateNoTime,
    getFormattedTime,
    getFormattedDayNow,
    getDateDifferenceInDays
}



export default dateUtility;