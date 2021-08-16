const getFormattedDateNow = () => {
    let date = new Date();
    return date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear() + " - "
        + date.getHours() + ":"
        + date.getMinutes()
}

const dateUtility = {
    getFormattedDateNow
}

export default dateUtility;