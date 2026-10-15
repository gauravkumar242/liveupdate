"use strict";

/* =========================
   HELPER FUNCTION
========================= */

function getElement(id) {
    return document.getElementById(id);
}

/* =========================
   TYPING ANIMATION
========================= */

const typingWords = [
    "B.Tech Student",
    "AI & ML Learner",
    "Web Developer",
    "Programmer",
    "Creative Explorer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeAnimation() {
    const element = getElement("typingText");

    if (!element) return;

    const currentWord = typingWords[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    element.textContent = currentWord.substring(0, charIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        delay = 1200;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        delay = 350;
    }

    setTimeout(typeAnimation, delay);
}

typeAnimation();

/* =========================
   THEME SWITCHER
========================= */

const themeButtons = document.querySelectorAll("[data-theme]");

themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const theme = button.dataset.theme;

        document.body.classList.remove(
            "theme-galaxy",
            "theme-rain",
            "theme-neon",
            "theme-nature",
            "theme-gradient"
        );

        document.body.classList.add(`theme-${theme}`);

        localStorage.setItem("websiteTheme", theme);

        themeButtons.forEach(item => {
            item.classList.toggle("active", item === button);
        });
    });
});

const savedTheme = localStorage.getItem("websiteTheme");

if (
    savedTheme &&
    ["galaxy", "rain", "neon", "nature", "gradient"].includes(savedTheme)
) {
    document.body.classList.remove(
        "theme-galaxy",
        "theme-rain",
        "theme-neon",
        "theme-nature",
        "theme-gradient"
    );

    document.body.classList.add(`theme-${savedTheme}`);

    themeButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.theme === savedTheme
        );
    });
}

/* =========================
   DARK / LIGHT MODE
========================= */

const darkModeBtn = getElement("darkModeBtn");

function updateDarkModeButton() {
    if (!darkModeBtn) return;

    darkModeBtn.textContent =
        document.body.classList.contains("light-mode")
            ? "🌙 Switch to Dark"
            : "☀️ Switch to Light";
}

if (localStorage.getItem("websiteLightMode") === "true") {
    document.body.classList.add("light-mode");
}

updateDarkModeButton();

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        localStorage.setItem(
            "websiteLightMode",
            document.body.classList.contains("light-mode")
        );

        updateDarkModeButton();
    });
}

/* =========================
   MOBILE MENU
========================= */

const menuToggle = getElement("menuToggle");
const navLinks = getElement("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            navLinks.classList.contains("open")
        );
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* =========================
   LIVE CLOCK AND DATE
========================= */

function updateClock() {
    const now = new Date();

    const clock = getElement("liveClock");
    const date = getElement("liveDate");

    if (clock) {
        clock.textContent = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    if (date) {
        date.textContent = now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }
}

updateClock();
setInterval(updateClock, 1000);

/* =========================
   AGE AND BIRTHDAY
========================= */

const birthDate = new Date(2007, 7, 8);

function calculateAge() {
    const now = new Date();

    let age = now.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(
        now.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (now < birthdayThisYear) {
        age--;
    }

    const ageElement = getElement("age");

    if (ageElement) {
        ageElement.textContent = `${age} Years`;
    }
}

function updateBirthdayCountdown() {
    const now = new Date();

    let nextBirthday = new Date(
        now.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (now >= nextBirthday) {
        nextBirthday = new Date(
            now.getFullYear() + 1,
            birthDate.getMonth(),
            birthDate.getDate()
        );
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const days = Math.ceil(
        (nextBirthday - now) / millisecondsPerDay
    );

    const countdown = getElement("birthdayCountdown");

    if (countdown) {
        countdown.textContent =
            days === 0 ? "Today! 🎉" : `${days} days left`;
    }
}

calculateAge();
updateBirthdayCountdown();

/* =========================
   FLOATING PARTICLES
========================= */

const particleContainer = getElement("particles");

if (particleContainer) {
    for (let i = 0; i < 55; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${7 + Math.random() * 15}s`;
        particle.style.animationDelay = `${Math.random() * -20}s`;

        const size = 2 + Math.random() * 3;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particleContainer.appendChild(particle);
    }
}

/* =========================
   CONFETTI EFFECT
========================= */

function launchConfetti() {
    const container = getElement("confettiContainer");

    if (!container) return;

    const shapes = ["●", "■", "★", "◆"];

    for (let i = 0; i < 70; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti-piece";

        piece.textContent =
            shapes[Math.floor(Math.random() * shapes.length)];

        piece.style.left = `${Math.random() * 100}vw`;

        piece.style.color =
            `hsl(${Math.floor(Math.random() * 360)}, 90%, 65%)`;

        piece.style.animationDelay = `${Math.random() * 0.8}s`;

        container.appendChild(piece);

        setTimeout(() => piece.remove(), 3500);
    }
}

/* =========================
   IMAGE GALLERY LIGHTBOX
========================= */

const galleryImages =
    document.querySelectorAll(".gallery-image");

const lightbox = getElement("lightbox");
const lightboxImage = getElement("lightboxImage");
const closeLightbox = getElement("closeLightbox");

galleryImages.forEach(image => {
    image.addEventListener("click", () => {
        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("show");
    });
});

function hideLightbox() {
    if (lightbox) {
        lightbox.classList.remove("show");
    }

    if (lightboxImage) {
        lightboxImage.src = "";
    }
}

if (closeLightbox) {
    closeLightbox.addEventListener("click", hideLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            hideLightbox();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox) {
        hideLightbox();
    }
});

/* =========================
   BACK TO TOP
========================= */

const backToTop = getElement("backToTop");

window.addEventListener("scroll", () => {
    if (!backToTop) return;

    backToTop.classList.toggle("show", window.scrollY > 400);
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =========================
   DOWNLOAD PORTFOLIO PDF
========================= */

async function downloadPortfolioPDF() {
    if (typeof html2pdf === "undefined") {
        alert(
            "PDF library load nahi hui. Internet connection check karein."
        );

        return;
    }

    try {
        document.body.classList.add("pdf-mode");

        await new Promise(resolve => setTimeout(resolve, 300));

        const options = {
            margin: 8,
            filename: "Gaurav_Kumar_Portfolio.pdf",

            image: {
                type: "jpeg",
                quality: 0.95
            },

            html2canvas: {
                scale: 1.5,
                useCORS: true,
                scrollY: 0,
                backgroundColor: "#ffffff"
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },

            pagebreak: {
                mode: ["css", "legacy"],
                avoid: [
                    ".education-card",
                    ".project-card",
                    ".about-card",
                    ".detail-card"
                ]
            }
        };

        await html2pdf()
            .set(options)
            .from(document.body)
            .save();

    } catch (error) {
        console.error("PDF generation failed:", error);

        alert("PDF download nahi ho paya. Dobara try karein.");

    } finally {
        document.body.classList.remove("pdf-mode");
    }
}