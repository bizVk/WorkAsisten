console.log("System Loaded");

// =========================
// LOGIN FUNCTION
// =========================
function login() {

    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid: userid,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {

        msg.innerText = data.message;

        if (data.status === "success") {
            window.location.href = "/dashboard";
        }

    });
}

// =========================
// DASHBOARD ACTIONS
// =========================
document.addEventListener("DOMContentLoaded", function () {

    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {
        box.addEventListener("click", function () {
            alert("You clicked: " + box.innerText);
        });
    });

});