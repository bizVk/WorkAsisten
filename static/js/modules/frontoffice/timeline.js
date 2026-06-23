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
const dates = Array.from(cells).map(
    cell => cell.dataset.date
);

const startIndex = dates.indexOf(
    reservation.checkin
);

console.log(
    "Guest:",
    reservation.guest_name
);

console.log(
    "Checkin:",
    reservation.checkin
);

console.log(
    "startIndex:",
    startIndex
);

console.log(
    reservation.guest_name,
    reservation.checkin,
    startIndex
);

if(startIndex === -1){

    console.log(
        "Guest:",
        reservation.guest_name
    );

    console.log(
        "Checkin:",
        reservation.checkin
    );

    console.log(
        "Available Dates:",
        Array.from(cells)
            .slice(0,20)
            .map(c => c.dataset.date)
    );

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
    bar.style.left =
    `${Math.round(startIndex * cellWidth)}px`;

bar.style.width =
    `${Math.round(nights * cellWidth)}px`;
    
    console.log("cellWidth =", cellWidth);
    console.log("nights =", nights);

    bar.style.left =
    `${Math.round(startIndex * cellWidth)}px`;

bar.style.width =
    `${Math.round(nights * cellWidth)}px`;

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

function goToToday(){

    const currentDays =
        parseInt(
            new URLSearchParams(
                window.location.search
            ).get("days")
        ) || 30;

     window.location.href =
        `/frontoffice?days=${currentDays}`;

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

if(days <= 15){
    dayWidth = 120;
}
else if(days <= 30){
    dayWidth = 60;
}
else if(days <= 90){
    dayWidth = 35;
}
else if(days <= 180){
    dayWidth = 25;
}
else{
    dayWidth = 20;
}
    document.documentElement.style.setProperty(
        "--day-width",
        dayWidth + "px"
    );

    document.documentElement.style.setProperty(
        "--days",
        days
    );

   
document.querySelectorAll(".room-timeline")
.forEach(el => {
    el.style.gridTemplateColumns =
        `repeat(${days}, ${dayWidth}px)`;
});

document.querySelectorAll(".category-timeline")
.forEach(el => {
    el.style.gridTemplateColumns =
        `repeat(${days}, ${dayWidth}px)`;
});

document.querySelectorAll(".calendar-days")
.forEach(el => {
    el.style.gridTemplateColumns =
        `repeat(${days}, ${dayWidth}px)`;
});

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
// WEEKDAY FUNCTION
// ==========================================

function updateWeekdays() {

    document.querySelectorAll(".calendar-day").forEach(day => {

        const dateEl = day.querySelector(".day-date");
        const monthEl = day.querySelector(".day-month");
        const weekEl = day.querySelector(".day-week");

        if (!dateEl || !monthEl || !weekEl) return;

        const dayNum = parseInt(dateEl.textContent.trim());
        const month = monthEl.textContent.trim();

        const currentYear = new Date().getFullYear();

        const date = new Date(`${month} ${dayNum}, ${currentYear}`);

        weekEl.textContent = date.toLocaleDateString("en-US", {
            weekday: "short"
        });
    });
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