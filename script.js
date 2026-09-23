/* =====================================================
   LOADER
===================================================== */

const loader = document.querySelector(".loader");
const loaderProgress = document.querySelector(".loader-progress");
const loaderNumber = document.querySelector(".loader-number");

let progress = 0;

const loaderInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 2;

    if (progress >= 100) {
        progress = 100;
        clearInterval(loaderInterval);

        setTimeout(() => {
            loader.classList.add("loaded");
            document.body.classList.add("page-loaded");
        }, 400);
    }

    loaderProgress.style.width = `${progress}%`;
    loaderNumber.textContent = String(progress).padStart(2, "0");

}, 70);


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});

function animateCursor() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =====================================================
   CURSOR HOVER
===================================================== */

const hoverElements = document.querySelectorAll(
    "a, button, .skill-card, .project-image, .process-item"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
    });

});


/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu-inner a");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");

    const spans = menuButton.querySelectorAll("span");

    if (mobileMenu.classList.contains("open")) {

        spans[0].style.transform =
            "translateY(4px) rotate(45deg)";

        spans[1].style.transform =
            "translateY(-4px) rotate(-45deg)";

    } else {

        spans[0].style.transform = "";
        spans[1].style.transform = "";

    }

});


mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

        const spans = menuButton.querySelectorAll("span");

        spans[0].style.transform = "";
        spans[1].style.transform = "";

    });

});


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =====================================================
   STAGGER SKILL CARDS
===================================================== */

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 0.08}s`;

});


/* =====================================================
   STAGGER PROJECTS
===================================================== */

const projects = document.querySelectorAll(".project");

projects.forEach((project, index) => {

    const elements = project.querySelectorAll(".reveal");

    elements.forEach((element) => {

        element.style.transitionDelay =
            `${index * 0.08}s`;

    });

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    const scrollPosition = window.scrollY + 250;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =====================================================
   MAGNETIC CIRCLE BUTTON
===================================================== */

const circleButton = document.querySelector(".circle-button");

if (circleButton) {

    circleButton.addEventListener("mousemove", (event) => {

        const rect = circleButton.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        circleButton.style.transform =
            `translate(${x * 0.18}px, ${y * 0.18}px) rotate(10deg)`;

    });

    circleButton.addEventListener("mouseleave", () => {

        circleButton.style.transform = "";

    });

}


/* =====================================================
   PROJECT IMAGE PARALLAX
===================================================== */

const projectImages =
    document.querySelectorAll(".project-image");

projectImages.forEach((image) => {

    image.addEventListener("mousemove", (event) => {

        const rect = image.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

        const innerElements =
            image.children;

        Array.from(innerElements).forEach((element) => {

            element.style.transform =
                `translate(${x * 12}px, ${y * 12}px)`;

        });

    });

    image.addEventListener("mouseleave", () => {

        const innerElements =
            image.children;

        Array.from(innerElements).forEach((element) => {

            element.style.transform = "";

        });

    });

});


/* =====================================================
   SMOOTH ANCHOR SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   TEXT SCRAMBLE EFFECT
===================================================== */

class TextScramble {

    constructor(element) {

        this.element = element;

        this.chars =
            "!<>-_\\/[]{}—=+*^?#________";

        this.frame = 0;
        this.queue = [];

    }


    setText(newText) {

        const oldText =
            this.element.innerText;

        const length =
            Math.max(
                oldText.length,
                newText.length
            );

        const promise =
            new Promise(
                (resolve) =>
                    (this.resolve = resolve)
            );

        this.queue = [];

        for (let i = 0; i < length; i++) {

            const from =
                oldText[i] || "";

            const to =
                newText[i] || "";

            const start =
                Math.floor(Math.random() * 30);

            const end =
                start +
                Math.floor(Math.random() * 30);

            this.queue.push({
                from,
                to,
                start,
                end
            });

        }

        cancelAnimationFrame(this.frame);

        this.frame = 0;

        this.update();

        return promise;
    }


    update() {

        let output = "";

        let complete = 0;

        for (
            let i = 0;
            i < this.queue.length;
            i++
        ) {

            const {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i];

            if (this.frame >= end) {

                complete++;

                output += to;

            } else if (this.frame >= start) {

                if (!char || Math.random() < 0.28) {

                    this.queue[i].char =
                        this.randomChar();

                }

                output +=
                    `<span class="scramble-char">
                        ${this.queue[i].char}
                    </span>`;

            } else {

                output += from;

            }

        }

        this.element.innerHTML = output;

        if (complete === this.queue.length) {

            this.resolve();

        } else {

            this.frame++;

            this.frame =
                requestAnimationFrame(
                    () => this.update()
                );

        }

    }


    randomChar() {

        return this.chars[
            Math.floor(
                Math.random() *
                this.chars.length
            )
        ];

    }

}


/* =====================================================
   CONTACT TITLE EFFECT
===================================================== */

const contactTitle =
    document.querySelector(".contact-content h2");

if (contactTitle) {

    const originalHTML =
        contactTitle.innerHTML;

    contactTitle.addEventListener(
        "mouseenter",
        () => {

            contactTitle.style.transition =
                "letter-spacing 0.5s ease";

            contactTitle.style.letterSpacing =
                "-0.045em";

        }
    );

    contactTitle.addEventListener(
        "mouseleave",
        () => {

            contactTitle.style.letterSpacing =
                "-0.07em";

        }
    );

}


/* =====================================================
   PREVENT IMAGE DRAG
===================================================== */

document.querySelectorAll("img").forEach((image) => {

    image.addEventListener(
        "dragstart",
        (event) => event.preventDefault()
    );

});


/* =====================================================
   YEAR
===================================================== */

const currentYear =
    new Date().getFullYear();

const footerYear =
    document.querySelector(".footer-center");

if (footerYear) {

    footerYear.textContent =
        `© ${currentYear} ABBAS AL HOURANI`;

}