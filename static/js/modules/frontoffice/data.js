window.PMS_DATA = window.PMS_DATA || {};

/* LOAD DATA FROM HTML */
const rawData = document.getElementById("pms-data");

if (rawData) {
    const parsed = JSON.parse(rawData.textContent);

    window.PMS_DATA.reservations = parsed.reservations || [];
    window.PMS_DATA.calendarDays = parsed.calendarDays || [];
}