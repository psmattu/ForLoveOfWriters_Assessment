// Script to handle routing
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  // Function to fetch and load page content
  const loadPage = async (page) => {
    try {
      const response = await fetch(`pages/${page}.html`);
      if (response.ok) {
        const html = await response.text();
        content.innerHTML = html;
      } else {
        content.innerHTML = "<h1>404 - Page Not Found</h1>";
      }
    } catch (error) {
      content.innerHTML = "<h1>Error Loading Page</h1>";
    }
  };

  // Function to handle navigation
  const navigateTo = (url) => {
    // Update the URL without reloading
    history.pushState(null, null, url);
    const page = url.substring(1); // Remove leading '/'
    loadPage(page || "home"); // Default to 'home' if the URL is empty
  };

  // Handle click events on navigation links
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = event.target.getAttribute("href");
      navigateTo(url);
    });
  });

  // Handle browser back/forward button navigation
  window.addEventListener("popstate", () => {
    const page = window.location.pathname.substring(1);
    loadPage(page || "home");
  });

  // Load the initial page based on the current URL
  const initialPage = window.location.pathname.substring(1);
  loadPage(initialPage || "home");
});
