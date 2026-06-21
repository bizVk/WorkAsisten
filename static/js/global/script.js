async function login() {

    const userid =
        document.getElementById("userid").value;

    const password =
        document.getElementById("password").value;

    const loginBox =
        document.getElementById("loginBox");

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                userid: userid,
                password: password
            })
        });

        const data = await response.json();

        alert(data.message);

        // Success
        if (data.status === "success") {

            // small delay for smooth UX (optional)
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 300);

        }

        // Error Animation
        else {

            loginBox.classList.add("shake");

            setTimeout(() => {

                loginBox.classList.remove("shake");

            }, 500);
        }

    } catch (error) {

        // network/server error handling
        alert("Server error. Please try again.");

        loginBox.classList.add("shake");

        setTimeout(() => {
            loginBox.classList.remove("shake");
        }, 500);
    }
}

fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        userid: document.getElementById("userid").value,
        password: document.getElementById("password").value
    })
})