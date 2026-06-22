
from flask import Blueprint, render_template, request

from datetime import datetime, timedelta

frontoffice_bp = Blueprint("frontoffice", __name__)


def generate_room_inventory():

    return {

        "Standard": [
            f"STD-{i}" for i in range(101, 116)
        ],

        "Deluxe": [
            f"DLX-{i}" for i in range(201, 211)
        ],

        "VVIP": [
            f"VVIP-{i}" for i in range(301, 306)
        ],

        "Dorm 4 Bed": [

            "Dorm4-A Bed 1",
            "Dorm4-A Bed 2",
            "Dorm4-A Bed 3",
            "Dorm4-A Bed 4",

            "Dorm4-B Bed 1",
            "Dorm4-B Bed 2",
            "Dorm4-B Bed 3",
            "Dorm4-B Bed 4",

            "Dorm4-C Bed 1",
            "Dorm4-C Bed 2",
            "Dorm4-C Bed 3",
            "Dorm4-C Bed 4"
        ],

        "Dorm 6 Bed": [

            "Dorm6-A Bed 1",
            "Dorm6-A Bed 2",
            "Dorm6-A Bed 3",
            "Dorm6-A Bed 4",
            "Dorm6-A Bed 5",
            "Dorm6-A Bed 6",

            "Dorm6-B Bed 1",
            "Dorm6-B Bed 2",
            "Dorm6-B Bed 3",
            "Dorm6-B Bed 4",
            "Dorm6-B Bed 5",
            "Dorm6-B Bed 6"
        ],

        "Dorm 8 Bed": [

            "Dorm8-A Bed 1",
            "Dorm8-A Bed 2",
            "Dorm8-A Bed 3",
            "Dorm8-A Bed 4",
            "Dorm8-A Bed 5",
            "Dorm8-A Bed 6",
            "Dorm8-A Bed 7",
            "Dorm8-A Bed 8",

            "Dorm8-B Bed 1",
            "Dorm8-B Bed 2",
            "Dorm8-B Bed 3",
            "Dorm8-B Bed 4",
            "Dorm8-B Bed 5",
            "Dorm8-B Bed 6",
            "Dorm8-B Bed 7",
            "Dorm8-B Bed 8"
        ],

        "Female Dorm": [

            "Female-A Bed 1",
            "Female-A Bed 2",
            "Female-A Bed 3",
            "Female-A Bed 4",
            "Female-A Bed 5",
            "Female-A Bed 6"
        ]
    }

def generate_reservations():

    reservations = [

        {
            "reservation_id": "RES00001",
            "guest_id": "G0001",
            "guest_name": "Rahul Sharma",
            "room": "STD-101",
            "category": "Standard",
            "checkin": "2026-06-18",
            "checkout": "2026-06-23",
            "status": "Reserved",
            "advance": 3000,
            "balance": 5000,
            "payment_status": "Partial",
            "special_request": "Extra Pillow"
        },

        {
            "reservation_id": "RES00002",
            "guest_id": "G0002",
            "guest_name": "Priya Singh",
            "room": "STD-102",
            "category": "Standard",
            "checkin": "2026-06-18",
            "checkout": "2026-06-24",
            "status": "Checked-In",
            "advance": 6000,
            "balance": 0,
            "payment_status": "Paid",
            "special_request": "Airport Pickup"
        },

        {
            "reservation_id": "RES00003",
            "guest_id": "G0003",
            "guest_name": "Amit Kumar",
            "room": "STD-103",
            "category": "Standard  ",
            "checkin": "2026-06-18",
            "checkout": "2026-06-24",
            "status": "Reserved",
            "advance": 4000,
            "balance": 7000,
            "payment_status": "Pending",
            "special_request": "High Floor"
        },

        {
            "reservation_id": "RES00004",
            "guest_id": "G0004",
            "guest_name": "Neha Patel",
            "room": "VVIP-301",
            "category": "VVIP",
            "checkin": "2026-06-18",
            "checkout": "2026-06-25",
            "status": "Checked-In",
            "advance": 15000,
            "balance": 5000,
            "payment_status": "Partial",
            "special_request": "None"
        }

    ]

    return reservations

@frontoffice_bp.route("/frontoffice")
def frontoffice():

    days = request.args.get("days", 30, type=int)
    
    print("DAYS =", days)

    if days == 7:
        day_width = 120
    elif days == 15:
        day_width = 80
    else:
        day_width = 45

    room_inventory = generate_room_inventory()
    reservations = generate_reservations()

    start_date = datetime.today() - timedelta(days=5)

    calendar_days = []

    for i in range(days):
        day = start_date + timedelta(days=i)

        calendar_days.append({
            "date": day.strftime("%d"),
            "month": day.strftime("%b"),
            "full_date": day.strftime("%Y-%m-%d")
        })



    return render_template(
        "departments/frontoffice/frontoffice.html",
        room_inventory=room_inventory,
        calendar_days=calendar_days,
        reservations=reservations,
        day_width=day_width,
        days=days
    )
    