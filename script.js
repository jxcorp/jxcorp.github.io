document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------
  // 1. Dark/Light Mode Toggle
  // ----------------------------------
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const iconMoon = themeToggle.querySelector(".icon-moon");
  const iconSun = themeToggle.querySelector(".icon-sun");

  // Function to set the theme, save to localStorage, and update icons
  const setTheme = (theme) => {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      iconMoon.style.display = "block";
      iconSun.style.display = "none";
      themeToggle.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      iconMoon.style.display = "none";
      iconSun.style.display = "block";
      themeToggle.setAttribute("aria-label", "Switch to Dark Mode");
    }
  };

  // Initialize theme based on local storage or system preference
  const storedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (storedTheme) {
    setTheme(storedTheme);
  } else if (systemPrefersDark) {
    setTheme("dark");
  } else {
    setTheme("light"); // Default to light if no preference
  }

  // Toggle logic
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  // ----------------------------------
  // 2. Magic Cursor (Position and Hover Effect)
  // ----------------------------------
  const cursor = document.getElementById("magic-cursor");

  // Check for reduced motion preference
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    const speed = 0.15; // Smoothness factor

    // Update target position on mouse move
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop for smooth movement
    function animateCursor() {
      // Lerp (Linear Interpolation) for smooth follow
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover Effect Logic
    const interactiveElements = document.querySelectorAll(
      "a, button, .glassmorphism-card"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        cursor.classList.add("hover-effect")
      );
      el.addEventListener("mouseleave", () =>
        cursor.classList.remove("hover-effect")
      );
    });
  } else {
    // Hide the cursor if motion is reduced
    if (cursor) cursor.style.display = "none";
  }

  // ----------------------------------
  // 3. Smooth Scroll (Fallback to CSS, but showing JS option)
  // ----------------------------------
  // NOTE: For the 'standout' experience, a library like 'Lenis' or 'GSAP ScrollSmoother'
  // is often used to achieve a truly physics-based, non-native smooth scroll.
  // The native CSS 'scroll-behavior: smooth' is the best accessible fallback.

  // This is an example of an **anchor-link** smooth scroll using JS for consistency:
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Use native smooth scroll for anchor links
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
  const menuToggle = document.getElementById("menu-toggle");
  const headerContent = document.querySelector(".header-content");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && headerContent && mainNav) {
    menuToggle.addEventListener("click", () => {
      headerContent.classList.toggle("nav-open");
      mainNav.classList.toggle("nav-open");
    });

    // Close menu when a link is clicked
    mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        headerContent.classList.remove("nav-open");
        mainNav.classList.remove("nav-open");
      });
    });
  }
});
