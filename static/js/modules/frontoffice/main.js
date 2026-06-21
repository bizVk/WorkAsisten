console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    if (!window.PMS_DATA || !window.PMS_DATA.reservations) {
        console.error("PMS_DATA missing");
        return;
    }

    if (window.PMS_DATA.reservations.length === 0) {
        console.error("No reservations found");
        return;
    }

    initModal();
    renderTimeline();
});

console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {

    if (!window.PMS_DATA || !window.PMS_DATA.reservations) {
        console.error("PMS_DATA missing");
        return;
    }

    if (window.PMS_DATA.reservations.length === 0) {
        console.error("No reservations found");
        return;
    }

    if (typeof initModal === "function") {
        initModal();
    }

    if (typeof renderTimeline === "function") {
        renderTimeline();
    }
});
