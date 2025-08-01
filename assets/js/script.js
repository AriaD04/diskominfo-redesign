// Custom JavaScript for Kelurahan Tanjungpinang Barat

// SATU-SATUNYA BLOK DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions
  initializeLoading();
  initializeNavigation();
  initializeAnimations();
  initializeCounters();
  initializeVisitorCounter();
  initializeBackToTop();
  initializeSmoothScroll();
  initializeParallax();
  initializeTypingEffect();

  // Panggil fungsi widget di sini
  initializeVisitorWidget();
});

// Fungsi untuk mengontrol widget statistik kunjungan
function initializeVisitorWidget() {
  const visitorWidget = document.getElementById("visitor-widget");
  const visitorToggle = document.getElementById("visitor-toggle");

  if (visitorWidget && visitorToggle) {
    // Event listener untuk membuka/menutup widget saat diklik
    visitorToggle.addEventListener("click", () => {
      visitorWidget.classList.toggle("expanded");
    });

    // Buka widget secara otomatis setelah 2.5 detik
    setTimeout(() => {
      if (!visitorWidget.classList.contains("expanded")) {
        visitorWidget.classList.add("expanded");
      }
    }, 2500);
  }
}

// Loading Screen
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen");
  if (!loadingScreen) return; // Tambahkan pengecekan

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 1500); // Kurangi waktu loading agar lebih cepat untuk testing
}

// Navigation
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile menu close on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}

// Initialize AOS Animations
function initializeAnimations() {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
    offset: 100,
  });

  // Custom animations for specific elements
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          entry.target.classList.add("counted");
          animateCounter(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Visitor Counter
function initializeVisitorCounter() {
  const visitorCountElements = document.querySelectorAll(
    "#visitor-count, #footer-visitor-count"
  );

  // Get visitor count from localStorage or initialize
  let visitorCount = localStorage.getItem("visitorCount");
  if (!visitorCount) {
    visitorCount = Math.floor(Math.random() * 1000) + 2000; // Random starting number
    localStorage.setItem("visitorCount", visitorCount);
  }

  // Increment visitor count
  visitorCount = parseInt(visitorCount) + 1;
  localStorage.setItem("visitorCount", visitorCount);

  // Update all visitor count elements
  visitorCountElements.forEach((element) => {
    if (element.hasAttribute("data-count")) {
      element.setAttribute("data-count", visitorCount);
    } else {
      element.textContent = visitorCount.toLocaleString();
    }
  });

  // Simulate real-time updates (optional)
  setInterval(() => {
    if (Math.random() < 0.1) {
      // 10% chance every 30 seconds
      visitorCount++;
      localStorage.setItem("visitorCount", visitorCount);
      visitorCountElements.forEach((element) => {
        if (!element.hasAttribute("data-count")) {
          element.textContent = visitorCount.toLocaleString();
        }
      });
    }
  }, 30000);
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Smooth Scroll for anchor links
function initializeSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Parallax Effect
function initializeParallax() {
  const heroSection = document.querySelector(".hero-section");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroSection) {
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Typing Effect for Hero Title
function initializeTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.innerHTML;

  // Keep the original text visible and add a typing cursor effect instead
  heroTitle.style.borderRight = "3px solid #ffc107";
  heroTitle.style.animation = "blink-cursor 1s infinite";

  // Add CSS for cursor animation if not exists
  if (!document.getElementById("cursor-animation-style")) {
    const style = document.createElement("style");
    style.id = "cursor-animation-style";
    style.textContent = `
            @keyframes blink-cursor {
                0%, 50% { border-right-color: #ffc107; }
                51%, 100% { border-right-color: transparent; }
            }
        `;
    document.head.appendChild(style);
  }

  // Remove cursor after 3 seconds
  setTimeout(() => {
    heroTitle.style.borderRight = "none";
    heroTitle.style.animation = "none";
  }, 3000);
}

// Image Lazy Loading
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Form Validation and Submission
function initializeForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (isValid) {
        // Show success message
        showNotification("Pesan berhasil dikirim!", "success");
        form.reset();
      } else {
        showNotification(
          "Mohon lengkapi semua field yang diperlukan.",
          "error"
        );
      }
    });
  });
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "error" ? "danger" : type
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Search Functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      searchResults.innerHTML = "";
      return;
    }

    // Simple search implementation
    const searchableElements = document.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p"
    );
    const results = [];

    searchableElements.forEach((element) => {
      if (element.textContent.toLowerCase().includes(query)) {
        results.push({
          text: element.textContent.substring(0, 100) + "...",
          element: element,
        });
      }
    });

    displaySearchResults(results, query);
  });
}

function displaySearchResults(results, query) {
  const searchResults = document.getElementById("searchResults");

  if (results.length === 0) {
    searchResults.innerHTML =
      '<div class="p-3 text-muted">Tidak ada hasil ditemukan.</div>';
    return;
  }

  const resultsHTML = results
    .map(
      (result) => `
        <div class="search-result-item p-3 border-bottom">
            <div class="search-result-text">${highlightText(
              result.text,
              query
            )}</div>
        </div>
    `
    )
    .join("");

  searchResults.innerHTML = resultsHTML;
}

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// Weather Widget (if needed)
function initializeWeather() {
  // This would integrate with a weather API
  // For demo purposes, showing static data
  const weatherWidget = document.getElementById("weather-widget");
  if (!weatherWidget) return;

  const weatherData = {
    temperature: "28°C",
    condition: "Cerah",
    humidity: "75%",
    windSpeed: "12 km/h",
  };

  weatherWidget.innerHTML = `
        <div class="weather-info">
            <div class="weather-temp">${weatherData.temperature}</div>
            <div class="weather-condition">${weatherData.condition}</div>
            <div class="weather-details">
                <small>Kelembaban: ${weatherData.humidity}</small><br>
                <small>Angin: ${weatherData.windSpeed}</small>
            </div>
        </div>
    `;
}

// Print Functionality
function printPage() {
  window.print();
}

// Share Functionality
function shareContent(title, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url,
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
      title + " " + url
    )}`;
    window.open(shareUrl, "_blank");
  }
}

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showNotification("Teks berhasil disalin!", "success");
    })
    .catch(() => {
      showNotification("Gagal menyalin teks.", "error");
    });
}

// Dark Mode Toggle (if needed)
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// Initialize Dark Mode from localStorage
function initializeDarkMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
}

// Accessibility Improvements
function initializeAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.className = "skip-link sr-only sr-only-focusable";
  skipLink.textContent = "Skip to main content";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Focus management for modals
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    modal.addEventListener("shown.bs.modal", () => {
      const focusableElement = modal.querySelector(
        "input, button, textarea, select"
      );
      if (focusableElement) {
        focusableElement.focus();
      }
    });
  });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
  // Monitor page load time
  window.addEventListener("load", () => {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);

    // You could send this data to analytics
    if (loadTime > 3000) {
      console.warn("Page load time is slow");
    }
  });
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
  // You could send error reports to a logging service
});

// Service Worker Registration (for PWA features)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Utility Functions
const utils = {
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Format number with thousands separator
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },

  // Get current date in Indonesian format
  getCurrentDate: () => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  },
};

// Export utils for global use
window.utils = utils;
