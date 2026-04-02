/* ============================================================
   Dylan Dao Portfolio — script.js
   Features:
     1. Tab switcher (About section)
     2. Mobile hamburger menu
     3. Active nav link on scroll
     4. Scroll reveal animations
   ============================================================ */


/* ── 1. TAB SWITCHER (About section) ─────────────────────── */
var tablinks   = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
  for (var tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (var tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}


/* ── 2. MOBILE HAMBURGER MENU ─────────────────────────────── */
const menuIcon = document.getElementById("menu-icon");
const navMenu  = document.getElementById("nav-menu");

menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  // toggle icon between ☰ and ✕
  menuIcon.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuIcon.textContent = "☰";
  });
});


/* ── 3. ACTIVE NAV LINK ON SCROLL ────────────────────────── */
const sections   = document.querySelectorAll("div[id]");
const navLinks   = document.querySelectorAll("nav ul li a");

function updateActiveNav() {
  let scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 80; // offset for fixed nav height
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active-nav");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav(); // run once on load


/* ── 4. SCROLL REVEAL ANIMATIONS ────────────────────────── */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        // Once revealed, stop observing to save resources
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,   // trigger when 15% of element is visible
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ── 5. CONTACT FORM (Google Sheets) ─────────────────────── */
const scriptURL = "https://script.google.com/macros/s/AKfycbzvxyY3LA6qjIAk0pyVt2JvqY2gsmvG1X9gky9Oav6t4tTQVCSrOjBnoeTfsrOuAqaZ/exec";
const form = document.forms["submit-to-google-sheet"];
const msg  = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(() => {
        msg.innerHTML = "✅ Message sent successfully!";
        setTimeout(() => { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(error => console.error("Error!", error.message));
  });
}