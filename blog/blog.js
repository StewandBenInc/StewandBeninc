document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown-toggle");
    //equivalent to notes.js
    // biome-ignore lint/complexity/noForEach: <explanation>
    dropdowns.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const dropdown = toggle.closest(".dropdown");
            dropdown.classList.toggle("active");

            const footer = document.querySelector(".footer");
            const body = document.body;
            const isContentShort = body.scrollHeight <= window.innerHeight;

            if (isContentShort) {
                footer.style.position = "fixed";
                footer.style.bottom = "0";
                footer.style.left = "0";
                footer.style.width = "100%";
                body.style.overflow = 'hidden';
            } else {
                footer.style.position = "relative";
                body.style.overflow = 'auto';
            }
        });
    });
});
