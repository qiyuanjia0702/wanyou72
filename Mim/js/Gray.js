function checkDates(dates) {
    var currentDate = new Date();
    var isTargetDate = false;

    dates.forEach(function(date) {
        if (currentDate.getFullYear() === date.getFullYear() &&
            currentDate.getMonth() === date.getMonth() &&
            currentDate.getDate() === date.getDate()) {
            isTargetDate = true;
        }
    });

    if (isTargetDate) {
        document.querySelector('html').style.filter = "grayscale(100%)";
    } else {
        document.querySelector('html').style.filter = "none";
    }
}

// 调用函数并传递多个日期
var dates = [
    new Date("2024-09-30"),
    new Date("2024-12-13"),
    new Date("2025-04-04")
];
checkDates(dates);