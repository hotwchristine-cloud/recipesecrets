// Recipe Secrets — shared site behavior (nav, fade-in, specials filter, forms)

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFadeIn();
  initSpecialsFilter();
  initReservationForm();
  initContactForm();
});

/* ---------- Mobile nav toggle ---------- */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

/* ---------- Fade-in on scroll ---------- */

function initFadeIn() {
  const items = document.querySelectorAll(".fade-in");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Specials category filter ---------- */

function initSpecialsFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

/* ---------- Reservations form ---------- */

function initReservationForm() {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  const confirmation = document.getElementById("reservation-confirmation");
  const dateInput = document.getElementById("res-date");

  // Block past dates
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [
      { id: "res-name", test: (v) => v.trim().length > 1, msg: "Please enter your full name." },
      { id: "res-email", test: isValidEmail, msg: "Please enter a valid email address." },
      { id: "res-phone", test: isValidPhone, msg: "Please enter a valid phone number." },
      {
        id: "res-date",
        test: (v) => Boolean(v) && !isPastDate(v),
        msg: "Please choose today or a future date.",
      },
      { id: "res-time", test: (v) => Boolean(v), msg: "Please choose a time." },
      {
        id: "res-guests",
        test: (v) => Number(v) >= 1 && Number(v) <= 12,
        msg: "Party size must be between 1 and 12.",
      },
    ];

    let allValid = true;

    fields.forEach(({ id, test, msg }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(`${id}-error`);
      const value = input.value;
      const valid = test(value);

      input.classList.toggle("invalid", !valid);
      if (errorEl) errorEl.textContent = valid ? "" : msg;
      if (!valid) allValid = false;
    });

    if (!allValid) {
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // --- Connect a form backend here, e.g. Formspree ---
    // fetch("https://formspree.io/f/your-form-id", {
    //   method: "POST",
    //   headers: { Accept: "application/json" },
    //   body: new FormData(form),
    // });

    form.hidden = true;
    if (confirmation) {
      const nameInput = document.getElementById("res-name");
      const nameSpan = confirmation.querySelector("[data-confirm-name]");
      if (nameSpan) nameSpan.textContent = nameInput.value.trim();
      confirmation.classList.add("is-visible");
      confirmation.setAttribute("tabindex", "-1");
      confirmation.focus();
    }
  });
}

/* ---------- Contact form ---------- */

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const confirmation = document.getElementById("contact-confirmation");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [
      { id: "contact-name", test: (v) => v.trim().length > 1, msg: "Please enter your name." },
      { id: "contact-email", test: isValidEmail, msg: "Please enter a valid email address." },
      { id: "contact-message", test: (v) => v.trim().length > 5, msg: "Please enter a short message." },
    ];

    let allValid = true;

    fields.forEach(({ id, test, msg }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(`${id}-error`);
      const valid = test(input.value);

      input.classList.toggle("invalid", !valid);
      if (errorEl) errorEl.textContent = valid ? "" : msg;
      if (!valid) allValid = false;
    });

    if (!allValid) {
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // --- Connect a form backend here, e.g. Formspree ---
    // fetch("https://formspree.io/f/your-form-id", {
    //   method: "POST",
    //   headers: { Accept: "application/json" },
    //   body: new FormData(form),
    // });

    form.hidden = true;
    if (confirmation) {
      confirmation.classList.add("is-visible");
      confirmation.setAttribute("tabindex", "-1");
      confirmation.focus();
    }
  });
}

/* ---------- Validation helpers ---------- */

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7;
}

function isPastDate(value) {
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return chosen < today;
}
