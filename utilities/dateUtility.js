const getFormattedDateNow = () => {
    let date = new Date();
    return date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear() + " - "
        + date.getHours() + ":"
        + date.getMinutes()
}

const getFormattedDayNow = () => {
    let date = new Date();

    switch (date.getDay()) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
    }
}

const dateUtility = {
    getFormattedDateNow,
    getFormattedDayNow
}

export default dateUtility;