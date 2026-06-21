function toggleSidebar() {

    document.body.classList.toggle(
        "sidebar-collapsed"
    );

    setTimeout(() => {

        window.dispatchEvent(
            new Event("sidebarResized")
        );

    }, 300);

}