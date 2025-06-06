import "./index.css"
import { initRouter } from "./router"
import { renderLayout } from "./layout"

// Remove loading indicator
function removeLoadingIndicator() {
  const loading = document.getElementById("loading")
  if (loading) {
    loading.remove()
  }
}

// Initialize the application
function initApp() {
  console.log("Initializing ShopEase application...")

  try {
    // Remove loading indicator
    removeLoadingIndicator()

    // Initialize the layout
    renderLayout()

    // Initialize the router
    initRouter()

    console.log("Application initialized successfully!")
  } catch (error) {
    console.error("Error initializing application:", error)

    // Show error message
    const app = document.getElementById("app")
    if (app) {
      app.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
            <p class="text-gray-600 mb-4">Failed to initialize the application.</p>
            <button onclick="location.reload()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Reload Page
            </button>
          </div>
        </div>
      `
    }
  }
}

// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp)
} else {
  initApp()
}
