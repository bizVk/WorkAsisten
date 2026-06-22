function toggleSidebar() {

    document.body.classList.toggle(
        "sidebar-collapsed"
    );

    setTimeout(() => {

        window.dispatchEvent(
            new Event("sidebarResized")
        );

        if (
            window.location.pathname.includes(
                "frontoffice"
            )
        ) {

            window.dispatchEvent(
                new Event("frontofficeResize")
            );

        }

    }, 300);

}