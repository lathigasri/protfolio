(function () {
  "use strict";

  /* ── NAV scroll style ── */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile menu ── */
  var burger = document.getElementById("nav-burger");
  var mobileMenu = document.getElementById("mobile-menu");
  burger.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    mobileMenu.setAttribute("aria-hidden", !open);
  });
  mobileMenu.querySelectorAll(".mm-link").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });

  /* ── Typewriter ── */
  var titles = [
    "CS & Engineering Student",
    "Java Developer",
    "Web Developer",
    "Firebase App Builder",
    "Hackathon Finalist"
  ];
  var tw = document.getElementById("typewriter");
  var ti = 0, ci = 0, deleting = false;

  function typeStep() {
    var current = titles[ti];
    if (!deleting) {
      ci++;
      tw.textContent = current.slice(0, ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(typeStep, 1800);
        return;
      }
      setTimeout(typeStep, 60);
    } else {
      ci--;
      tw.textContent = current.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        ti = (ti + 1) % titles.length;
        setTimeout(typeStep, 300);
        return;
      }
      setTimeout(typeStep, 30);
    }
  }
  setTimeout(typeStep, 600);

  /* ── Scroll reveal ── */
  var revealEls = document.querySelectorAll(".reveal-up");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });

  /* ── Immediately reveal anything already in viewport on load ── */
  revealEls.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("visible");
    }
  });

})();
