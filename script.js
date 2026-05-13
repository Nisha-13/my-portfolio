const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
  });

  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navbar.classList.remove("open"));
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#navbar a");

function setActiveLink() {
  const scrollPos = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const current = document.querySelector(`#navbar a[href="#${id}"]`);
      if (current) current.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const show = filter === "all" || filter === category;
      card.classList.toggle("hidden", !show);
    });
  });
});

const revealElements = document.querySelectorAll(
  ".section, .card, .project-card, .service-card, .split-card, .section-banner, .footer-grid > div"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));
