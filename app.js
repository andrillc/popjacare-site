document.addEventListener("DOMContentLoaded", () => {
  // 1. SCROLL REVEAL & HEADER (Animações modernas)
  const header = document.getElementById("navbar");
  const revealElements = document.querySelectorAll(".reveal");

  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  revealElements.forEach((el) => scrollObserver.observe(el));

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // 2. SISTEMA DE IDIOMA UNIFICADO
  function toggleLanguage() {
    const body = document.body;
    body.classList.toggle("lang-pt");
    const isPt = body.classList.contains("lang-pt");

    document
      .querySelectorAll(".lang-en")
      .forEach((el) => el.classList.toggle("active", !isPt));
    document
      .querySelectorAll(".lang-pt")
      .forEach((el) => el.classList.toggle("active", isPt));
    document.documentElement.lang = isPt ? "pt-BR" : "en";
  }

  const langButtons = document.querySelectorAll(
    "#lang-btn, #lang-btn-mobile, #global-lang-btn",
  );
  langButtons.forEach((btn) => btn.addEventListener("click", toggleLanguage));

  // 3. MENU MOBILE UNIFICADO
  const btnMobile = document.querySelector(".mobile-menu-btn");
  const menuMobile = document.querySelector(".mobile-menu");

  if (btnMobile && menuMobile) {
    btnMobile.addEventListener("click", () => {
      menuMobile.classList.toggle("active");
      const spans = btnMobile.querySelectorAll("span");
      if (menuMobile.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Fechar ao clicar em um link
    menuMobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => btnMobile.click());
    });
  }

  // 4. SLIDER RESTAURANTE (Somente ativado se existir)
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4000);
  }
});
