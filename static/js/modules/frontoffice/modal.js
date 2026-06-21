function openReservationModal(reservation) {

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val || "-";
    };

    set("modalReservationId", reservation.reservation_id);
    set("modalGuestName", reservation.guest_name);
    set("modalGuestId", reservation.guest_id);
    set("modalRoom", reservation.room);
    set("modalCategory", reservation.category);
    set("modalCheckin", reservation.checkin);
    set("modalCheckout", reservation.checkout);
    set("modalStatus", reservation.status);
    set("modalSource", reservation.source);
    set("modalPaymentStatus", reservation.payment_status);
    set("modalAdvance", "₹" + reservation.advance);
    set("modalBalance", "₹" + reservation.balance);
    set("modalRequest", reservation.special_request);
    set("modalReservationNotes", reservation.reservation_notes);
    set("modalFrontofficeNotes", reservation.frontoffice_notes);

    document.getElementById("reservationModal").style.display = "block";
}

function initModal() {

    const modal = document.getElementById("reservationModal");
    const closeBtn = document.getElementById("closeModal");

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}