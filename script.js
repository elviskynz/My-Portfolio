// Tells the CSS that JavaScript is running (for the scroll animations)
document.documentElement.classList.add("js");

/* =====================================================
   1. YOUR DETAILS - edit these
   ===================================================== */

// FILL IN: your WhatsApp number between the quotes.
// Country code + number, no + or spaces (Kenya example: 254712345678)
const whatsappNumber = "254758796040";

// The words that change in the hero section
const roles = ["Network Technician", "Fibre Specialist", "Router Configurator", "Web Developer in Training"];

// Your field work photos. To add one: put the image in this folder
// and add a new line like: { src: "photo2.jpg", caption: "What it shows" },
const photos = [
  { src: "profile.jpg", caption: "At the OLT cabinet, fibre patching" },
  { src: "photo2.jpg", caption: "Aerial cable work on a utility pole" },
  { src: "photo3.jpg", caption: "Geared up on site with safety and climbing kit" },
  { src: "photo4.jpg", caption: "Sorting out cabling on the pole" },
  { src: "photo5.jpg", caption: "Fibre splice tray with neatly organised splices" },
];

/* =====================================================
   2. DARK / LIGHT THEME (remembered with localStorage)
   ===================================================== */
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

let savedTheme = "dark";
try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch (e) {}
setTheme(savedTheme);

themeBtn.addEventListener("click", function () {
  const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(newTheme);
  try {
    localStorage.setItem("theme", newTheme);
  } catch (e) {}
});

/* =====================================================
   3. MOBILE MENU
   ===================================================== */
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
  nav.classList.toggle("open");
});

// Close the menu after tapping a link
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
  });
});

/* =====================================================
   4. TYPING EFFECT FOR YOUR ROLE
   ===================================================== */
const roleEl = document.getElementById("role");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const word = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    roleEl.textContent = word.substring(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeRole, 1500);   // pause when the word is complete
      return;
    }
  } else {
    charIndex--;
    roleEl.textContent = word.substring(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 50 : 100);
}
typeRole();

/* =====================================================
   5. FIELD WORK GALLERY + PHOTO VIEWER
   ===================================================== */
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

photos.forEach(function (photo) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.caption;

  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption;

  figure.appendChild(img);
  figure.appendChild(caption);

  figure.addEventListener("click", function () {
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add("open");
  });

  gallery.appendChild(figure);
});

// Click anywhere on the viewer (or press Escape) to close it
lightbox.addEventListener("click", function () {
  lightbox.classList.remove("open");
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") lightbox.classList.remove("open");
});

/* =====================================================
   6. CONTACT FORM -> opens WhatsApp with your message
   ===================================================== */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();   // stop the page from reloading

  const name = document.getElementById("cName").value.trim();
  const message = document.getElementById("cMessage").value.trim();
  if (name === "" || message === "") return;

  if (whatsappNumber === "") {
    alert("WhatsApp number not set yet. Add it in script.js.");
    return;
  }

  const text = "Hi, I'm " + name + ". " + message;
  const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank");
});

/* =====================================================
   7. SCROLL ANIMATION + FOOTER YEAR
   ===================================================== */
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(function (el) {
  observer.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();
