function clearTimelineBars() {

    document
        .querySelectorAll(".booking-bar")
        .forEach(bar => bar.remove());

         const reservations =
        window.PMS_DATA.reservations || [];

}


function renderTimeline() {


const reservations = window.PMS_DATA?.reservations || [];

reservations.forEach(reservation => {

    const timeline = document.querySelector(
        `.room-timeline[data-room="${reservation.room}"]`
    );

    if (!timeline) {
        console.warn(
            `Timeline not found for room: ${reservation.room}`
        );
        return;
    }

    const cells = timeline.querySelectorAll(".calendar-cell");

    if (cells.length === 0) {
        return;
    }

    const startIndex = Array.from(cells).findIndex(
        cell => cell.dataset.date === reservation.checkin
    );

    if (startIndex === -1) {

        console.warn(
            `Check-in date not found for ${reservation.guest_name}`
        );

        return;
    }

    const cellWidth =
parseFloat(
    getComputedStyle(
        document.querySelector(".calendar-section")
    ).getPropertyValue("--day-width")
);

    console.log("cellWidth =", cellWidth);

    const checkin = new Date(reservation.checkin);
    const checkout = new Date(reservation.checkout);

    const nights = Math.max(
        Math.round(
            (checkout - checkin) /
            (1000 * 60 * 60 * 24)
        ),
        1
    );

    const bar = document.createElement("div");

    bar.classList.add("booking-bar");

    const statusClass = reservation.status
        .toLowerCase()
        .replace(/\s+/g, "-");

    bar.classList.add(statusClass);
    bar.style.left = `${startIndex * cellWidth}px`;
    bar.style.width = `${nights * cellWidth}px`;
    
    console.log("cellWidth =", cellWidth);
    console.log("nights =", nights);

    bar.style.left = `${startIndex * cellWidth}px`;
    bar.style.width = `${nights * cellWidth}px`;

    bar.textContent = reservation.guest_name;

    bar.title =


`Guest: ${reservation.guest_name}
Room: ${reservation.room}
Check-In: ${reservation.checkin}
Check-Out: ${reservation.checkout}`;


    if (typeof openReservationModal === "function") {
        bar.addEventListener("click", () => {
            openReservationModal(reservation);
        });
    }

    timeline.appendChild(bar);

});


}

// ==========================================
// VIEW SWITCH
// ==========================================

function showView(view, button) {


document.getElementById("stayview").style.display = "none";
document.getElementById("reports").style.display = "none";

document.getElementById(view).style.display = "block";

document
    .querySelectorAll(".tab-btn")
    .forEach(btn => btn.classList.remove("active"));

if (button) {
    button.classList.add("active");
}


}

// ==========================================
// CALENDAR ZOOM
// ==========================================
    function updateDayWidth(days){

    const roomColumn = 160;

    const visibleWidth =
        document.querySelector(".rack-calendar")
        .clientWidth;

    const availableWidth =
        visibleWidth - roomColumn;

    let dayWidth;

if (days === 7) {

    dayWidth = Math.floor(
        (availableWidth * 0.98) / days
    );

}
else if (days === 15) {

    dayWidth = Math.floor(
        (availableWidth * 0.98) / days
    );

}
else {

    dayWidth = Math.floor(
        (availableWidth * 0.98) / days
    );

}

    document.documentElement.style.setProperty(
        "--day-width",
        dayWidth + "px"
    );

    document.documentElement.style.setProperty(
        "--days",
        days
    );

    console.log(
        "Day Width =", dayWidth
    );
}
   

    function changeCalendarZoom(days) {

    console.log("Zoom clicked:", days);

    updateDayWidth(days);

    console.log("CSS updated");

    document
        .querySelectorAll(".booking-bar")
        .forEach(bar => bar.remove());

    showCalendarDays(days);
    const wrapper =
    document.querySelector(
        ".calendar-wrapper"
    );

const rack =
    document.querySelector(
        ".rack-calendar"
    );

wrapper.style.minWidth =
    rack.clientWidth + "px";

    renderTimeline();

    console.log("Timeline rendered");

    }
// ==========================================
// INIT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

if (
    window.PMS_DATA &&
    window.PMS_DATA.reservations
) {

    const urlParams =
        new URLSearchParams(window.location.search);

    const currentDays =
        parseInt(urlParams.get("days")) || 30;

    updateDayWidth(currentDays);

    renderTimeline();
}

});
window.addEventListener(
    "frontofficeResize",
    () => {

        const rack =
            document.querySelector(
                ".rack-calendar"
            );

        const wrapper =
            document.querySelector(
                ".calendar-wrapper"
            );

        if (rack && wrapper) {

            wrapper.style.minWidth =
                rack.clientWidth + "px";

        }

    }
);