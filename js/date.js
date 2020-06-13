function nigthsNumber(checkInDate, checkOutDate){
    const date1 = new Date(checkInDate);
    const date2 = new Date(checkOutDate);
    
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

function getCheckinDate(){
    var date = new Date();
    var newDate = date;

    newDate.setDate(date.getDate() + 1);

    day  = newDate.getDate().toString();

    formattedDay = (day.length == 1) ? '0' + day : day;

    month  = (newDate.getMonth() + 1).toString();
    formattedMonth = (month.length == 1) ? '0' + month : month;

    year = newDate.getFullYear();

    return year + "-" + formattedMonth + "-" + formattedDay;
};

function getDeparture(checkin, num){
    var date = new Date(checkin);
    var newDate = date;

    newDate.setDate(date.getDate() + num);

    day  = newDate.getDate().toString();

    formattedDay = (day.length == 1) ? '0' + day : day;

    month  = (newDate.getMonth() + 1).toString();
    formattedMonth = (month.length == 1) ? '0' + month : month;

    year = newDate.getFullYear();

    return year + "-" + formattedMonth + "-" + formattedDay;
};

function getCheckoutDate(checkInDate){
    var date = new Date(checkInDate);
    var newDate = date;

    newDate.setDate(date.getDate() + 3);

    day  = newDate.getDate().toString();

    formattedDay = (day.length == 1) ? '0' + day : day;

    month  = (newDate.getMonth() + 1).toString();
    formattedMonth = (month.length == 1) ? '0' + month : month;

    year = newDate.getFullYear();

    return year + "-" + formattedMonth + "-" + formattedDay;
};

function formatDefault(date) {
    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
}
