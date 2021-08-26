const getFormattedDateNow = () => {
    let date = new Date();
    return date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear() + " - "
        + date.getHours() + ":"
        + date.getMinutes()
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

const dateUtility = {
    getFormattedDateNow,
    getFormattedDayNow
}

export default dateUtility;