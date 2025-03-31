
//Scroll SPy
let lastScrollY = window.scrollY;
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {
    let currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling down → Fade out
        navbar.style.opacity = "0";
        navbar.style.pointerEvents = "none"; // Disable interactions when hidden
    } else {
        // Scrolling up → Fade in
        navbar.style.opacity = "1";
        navbar.style.pointerEvents = "all";
    }

    lastScrollY = currentScrollY;
});

//Toggle NavBar
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show"); // Toggles the menu
    });

    window.addEventListener("scroll", function () {
        navLinks.classList.remove("show");
    });
    // Optional: Close menu when clicking outside
    // document.addEventListener("click", function (event) {
    //     if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
    //         navLinks.classList.remove("show");
    //     }
    // });
});

//Navbar Fade Timing
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("header");
    let lastScrollY = window.scrollY;
    let timeout;

    window.addEventListener("scroll", function () {
        if (timeout) clearTimeout(timeout);

        if (window.scrollY > lastScrollY) {
            // Scrolling Down - Fade Out after delay
            timeout = setTimeout(() => {
                navbar.style.opacity = "0";
                navbar.style.pointerEvents = "none"; // Prevent clicks on invisible navbar
            }, 300); // 300ms delay before fade out
        } else {
            // Scrolling Up - Instantly fade in
            navbar.style.opacity = "1";
            navbar.style.pointerEvents = "auto";
        }

        lastScrollY = window.scrollY;
    });
});

//Section Delay
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust for fixed navbar
                behavior: "smooth"
            });
        }
    });
});

//COnatct US
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("formStatus");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        statusText.classList.remove("hidden");
        statusText.textContent = "Sending...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" },
            });

            if (response.ok) {
                statusText.textContent = "Message sent successfully! ✅";
                statusText.style.color = "#00ff00";
                form.reset();
            } else {
                statusText.textContent = "Something went wrong. ❌";
                statusText.style.color = "#ff0000";
            }
        } catch (error) {
            statusText.textContent = "Network error. Try again later. ❌";
            statusText.style.color = "#ff0000";
        }
    });
});

