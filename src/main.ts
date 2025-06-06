// Product interface
interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

// Global state
let currentPage = "home"
let products: Product[] = []
let categories: string[] = []

// Initialize the application
async function initApp() {
  console.log("Initializing ShopEase...")

  try {
    // Remove loading indicator
    const loading = document.getElementById("loading")
    if (loading) {
      loading.remove()
    }

    // Render the layout
    renderLayout()

    // Load initial data
    await loadData()

    // Render home page
    renderPage("home")

    console.log("Application initialized successfully!")
  } catch (error) {
    console.error("Error initializing app:", error)
    showError("Failed to initialize the application")
  }
}

// Load data from API
async function loadData() {
  try {
    console.log("Loading data from API...")

    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("https://fakestoreapi.com/products"),
      fetch("https://fakestoreapi.com/products/categories"),
    ])

    if (!productsResponse.ok || !categoriesResponse.ok) {
      throw new Error("Failed to fetch data")
    }

    products = await productsResponse.json()
    categories = await categoriesResponse.json()

    console.log(`Loaded ${products.length} products and ${categories.length} categories`)
  } catch (error) {
    console.error("Error loading data:", error)
    throw error
  }
}

// Render the main layout
function renderLayout() {
  const app = document.getElementById("app")
  if (!app) return

  app.innerHTML = `
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div class="flex items-center">
            <button onclick="navigateTo('home')" class="text-2xl font-bold text-blue-600 hover:text-blue-700">
              ShopEase
            </button>
          </div>
          
          <div class="flex-grow max-w-md mx-auto md:mx-0">
            <div class="relative">
              <input 
                type="text" 
                id="search-input"
                placeholder="Search products..." 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <button 
                onclick="performSearch()"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <nav>
            <ul class="flex space-x-6">
              <li><button onclick="navigateTo('home')" class="hover:text-blue-600 transition-colors">Home</button></li>
              <li><button onclick="navigateTo('products')" class="hover:text-blue-600 transition-colors">Products</button></li>
              <li><button onclick="navigateTo('about')" class="hover:text-blue-600 transition-colors">About</button></li>
              <li><button onclick="navigateTo('contact')" class="hover:text-blue-600 transition-colors">Contact</button></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main id="main-content" class="flex-grow container mx-auto px-4 py-8">
      <!-- Content will be injected here -->
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">ShopEase</h3>
            <p class="text-gray-300">Your one-stop shop for quality products at affordable prices.</p>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><button onclick="navigateTo('home')" class="text-gray-300 hover:text-white transition-colors">Home</button></li>
              <li><button onclick="navigateTo('products')" class="text-gray-300 hover:text-white transition-colors">Products</button></li>
              <li><button onclick="navigateTo('about')" class="text-gray-300 hover:text-white transition-colors">About Us</button></li>
              <li><button onclick="navigateTo('contact')" class="text-gray-300 hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
            <address class="not-italic text-gray-300">
              <p>123 E-commerce Street</p>
              <p>Shopping District, SP 12345</p>
              <p class="mt-2">Email: info@shopease.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; ${new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `
}

// Navigation function
function navigateTo(page: string) {
  currentPage = page
  renderPage(page)
}

// Render different pages
function renderPage(page: string) {
  const mainContent = document.getElementById("main-content")
  if (!mainContent) return

  switch (page) {
    case "home":
      renderHomePage(mainContent)
      break
    case "products":
      renderProductsPage(mainContent)
      break
    case "about":
      renderAboutPage(mainContent)
      break
    case "contact":
      renderContactPage(mainContent)
      break
    default:
      renderHomePage(mainContent)
  }
}

// Render home page
function renderHomePage(container: HTMLElement) {
  container.innerHTML = `
    <section class="py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopEase</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover quality products at affordable prices. Your one-stop shop for all your needs.
        </p>
        <div class="mt-8">
          <button onclick="navigateTo('products')" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Shop Now
          </button>
        </div>
      </div>
    </section>
    
    <section class="py-12 bg-gray-50 -mx-4 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div id="featured-products" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${renderFeaturedProducts()}
        </div>
      </div>
    </section>
    
    <section class="py-12">
      <div class="bg-blue-600 rounded-lg p-8 text-white">
        <div class="md:flex md:items-center md:justify-between">
          <div class="mb-6 md:mb-0 md:w-2/3">
            <h2 class="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
            <p class="text-blue-100">Stay updated with our latest products and exclusive offers.</p>
          </div>
          <div class="md:w-1/3">
            <form class="flex" onsubmit="handleNewsletter(event)">
              <input 
                type="email" 
                placeholder="Your email address" 
                class="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                required
              />
              <button type="submit" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
}

// Render featured products
function renderFeaturedProducts(): string {
  if (products.length === 0) {
    return Array(4)
      .fill(0)
      .map(
        () => `
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="aspect-square skeleton"></div>
        <div class="p-4">
          <div class="skeleton h-5 w-3/4 mb-2 rounded"></div>
          <div class="skeleton h-4 w-1/2 mb-4 rounded"></div>
          <div class="flex items-center justify-between">
            <div class="skeleton h-6 w-16 rounded"></div>
            <div class="skeleton h-4 w-10 rounded"></div>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }

  return products
    .slice(0, 4)
    .map(
      (product) => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer" onclick="viewProduct(${product.id})">
      <div class="aspect-square overflow-hidden bg-gray-100">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div class="p-4">
        <h3 class="font-medium text-gray-900 truncate" title="${product.title}">${product.title}</h3>
        <p class="text-sm text-gray-500 mt-1 truncate" title="${product.category}">
          ${product.category}
        </p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-lg font-bold">$${product.price.toFixed(2)}</span>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm text-gray-600 ml-1">${product.rating.rate.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Render products page
function renderProductsPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">Our Products</h1>
      
      <div class="flex flex-col md:flex-row gap-4">
        <div class="w-full md:w-64 bg-white p-4 rounded-lg shadow">
          <h2 class="font-medium text-lg mb-4">Filters</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              id="product-search"
              placeholder="Search products..." 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              id="category-filter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              ${categories
                .map(
                  (category) => `
                <option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>
              `,
                )
                .join("")}
            </select>
          </div>
          
          <button 
            onclick="applyFilters()"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Apply Filters
          </button>
        </div>
        
        <div class="flex-grow">
          <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${renderAllProducts()}
          </div>
        </div>
      </div>
    </div>
  `
}

// Render all products
function renderAllProducts(): string {
  if (products.length === 0) {
    return '<div class="col-span-full text-center py-8"><p class="text-gray-500">Loading products...</p></div>'
  }

  return products
    .map(
      (product) => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer" onclick="viewProduct(${product.id})">
      <div class="aspect-square overflow-hidden bg-gray-100">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div class="p-4">
        <h3 class="font-medium text-gray-900 truncate" title="${product.title}">${product.title}</h3>
        <p class="text-sm text-gray-500 mt-1 truncate" title="${product.category}">
          ${product.category}
        </p>
        <div class="flex items-center justify-between mt-2">
          <span class="text-lg font-bold">$${product.price.toFixed(2)}</span>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm text-gray-600 ml-1">${product.rating.rate.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

// Render about page
function renderAboutPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">About ShopEase</h1>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="md:flex">
          <div class="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="About ShopEase" 
              class="w-full h-full object-cover"
            />
          </div>
          
          <div class="md:w-1/2 p-8">
            <h2 class="text-2xl font-bold mb-4">Our Story</h2>
            <p class="text-gray-700 mb-4">
              Founded in 2023, ShopEase was created with a simple mission: to make online shopping easy, 
              affordable, and enjoyable for everyone. What started as a small operation has grown into 
              a trusted e-commerce platform serving customers worldwide.
            </p>
            <p class="text-gray-700">
              We believe in quality products, competitive prices, and exceptional customer service. 
              Our team works tirelessly to curate the best products across various categories to 
              ensure you always find exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Our Values</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium mb-2">Quality</h3>
            <p class="text-gray-600">
              We never compromise on quality. Every product on our platform undergoes 
              rigorous quality checks before reaching you.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium mb-2">Affordability</h3>
            <p class="text-gray-600">
              We believe great products shouldn't break the bank. We work directly with 
              manufacturers to offer competitive prices.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium mb-2">Customer Service</h3>
            <p class="text-gray-600">
              Your satisfaction is our priority. Our dedicated support team is always 
              ready to assist you with any questions or concerns.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}

// Render contact page
function renderContactPage(container: HTMLElement) {
  container.innerHTML = `
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-xl font-bold mb-6">Send Us a Message</h2>
          
          <form onsubmit="handleContactForm(event)" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Send Message
            </button>
          </form>
          
          <div id="contact-success" class="hidden mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            Thank you for your message! We'll get back to you soon.
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-xl font-bold mb-6">Contact Information</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium">Address</h3>
                <address class="mt-1 not-italic text-gray-600">
                  123 E-commerce Street<br>
                  Shopping District, SP 12345<br>
                  United States
                </address>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium">Email</h3>
                <p class="mt-1 text-gray-600">info@shopease.com</p>
                <p class="mt-1 text-gray-600">support@shopease.com</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium">Phone</h3>
                <p class="mt-1 text-gray-600">+1 (123) 456-7890</p>
                <p class="mt-1 text-gray-600">+1 (123) 456-7891</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Utility functions
function viewProduct(productId: number) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const mainContent = document.getElementById("main-content")
  if (!mainContent) return

  mainContent.innerHTML = `
    <div class="mb-8">
      <button onclick="navigateTo('products')" class="inline-flex items-center text-blue-600 hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Products
      </button>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/2 p-8 flex items-center justify-center">
            <img 
              src="${product.image}" 
              alt="${product.title}" 
              class="max-w-full max-h-96 object-contain"
            />
          </div>
          
          <div class="md:w-1/2 p-8">
            <h1 class="text-2xl font-bold mb-2">${product.title}</h1>
            
            <div class="flex items-center mb-4">
              <div class="flex items-center">
                ${Array(5)
                  .fill(0)
                  .map(
                    (_, i) => `
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                `,
                  )
                  .join("")}
              </div>
              <span class="text-gray-600 ml-2">${product.rating.rate} (${product.rating.count} reviews)</span>
            </div>
            
            <div class="text-3xl font-bold text-blue-600 mb-6">
              $${product.price.toFixed(2)}
            </div>
            
            <div class="mb-6">
              <h2 class="text-lg font-medium mb-2">Description</h2>
              <p class="text-gray-700">${product.description}</p>
            </div>
            
            <div class="mb-6">
              <h2 class="text-lg font-medium mb-2">Category</h2>
              <div class="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                ${product.category}
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="flex items-center border border-gray-300 rounded-md">
                <button class="px-4 py-2 text-gray-600 hover:bg-gray-100">-</button>
                <span class="px-4 py-2">1</span>
                <button class="px-4 py-2 text-gray-600 hover:bg-gray-100">+</button>
              </div>
              
              <button class="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

function performSearch() {
  const searchInput = document.getElementById("search-input") as HTMLInputElement
  if (searchInput && searchInput.value.trim()) {
    navigateTo("products")
    // Set the search value in the products page
    setTimeout(() => {
      const productSearch = document.getElementById("product-search") as HTMLInputElement
      if (productSearch) {
        productSearch.value = searchInput.value
        applyFilters()
      }
    }, 100)
  }
}

function applyFilters() {
  const searchInput = document.getElementById("product-search") as HTMLInputElement
  const categorySelect = document.getElementById("category-filter") as HTMLSelectElement
  const productsGrid = document.getElementById("products-grid")

  if (!productsGrid) return

  const searchTerm = searchInput?.value.toLowerCase() || ""
  const category = categorySelect?.value || ""

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)

    const matchesCategory = category === "" || product.category === category

    return matchesSearch && matchesCategory
  })

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full text-center py-8">
        <p class="text-gray-500 text-lg">No products found matching your criteria.</p>
        <button onclick="clearFilters()" class="mt-4 text-blue-600 hover:underline">Clear filters</button>
      </div>
    `
  } else {
    productsGrid.innerHTML = filteredProducts
      .map(
        (product) => `
      <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer" onclick="viewProduct(${product.id})">
        <div class="aspect-square overflow-hidden bg-gray-100">
          <img 
            src="${product.image}" 
            alt="${product.title}" 
            class="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-4">
          <h3 class="font-medium text-gray-900 truncate" title="${product.title}">${product.title}</h3>
          <p class="text-sm text-gray-500 mt-1 truncate" title="${product.category}">
            ${product.category}
          </p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-lg font-bold">$${product.price.toFixed(2)}</span>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="text-sm text-gray-600 ml-1">${product.rating.rate.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }
}

function clearFilters() {
  const searchInput = document.getElementById("product-search") as HTMLInputElement
  const categorySelect = document.getElementById("category-filter") as HTMLSelectElement

  if (searchInput) searchInput.value = ""
  if (categorySelect) categorySelect.value = ""

  applyFilters()
}

function handleContactForm(event: Event) {
  event.preventDefault()

  const successMessage = document.getElementById("contact-success")
  if (successMessage) {
    successMessage.classList.remove("hidden")

    // Reset form
    const form = event.target as HTMLFormElement
    form.reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden")
    }, 5000)
  }
}

function handleNewsletter(event: Event) {
  event.preventDefault()
  alert("Thank you for subscribing to our newsletter!")

  // Reset form
  const form = event.target as HTMLFormElement
  form.reset()
}

function showError(message: string) {
  const app = document.getElementById("app")
  if (app) {
    app.innerHTML = `
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p class="text-gray-600 mb-4">${message}</p>
          <button onclick="location.reload()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Reload Page
          </button>
        </div>
      </div>
    `
  }
}
// Make functions globally available
;(window as any).navigateTo = navigateTo
;(window as any).viewProduct = viewProduct
;(window as any).performSearch = performSearch
;(window as any).applyFilters = applyFilters
;(window as any).clearFilters = clearFilters
;(window as any).handleContactForm = handleContactForm
;(window as any).handleNewsletter = handleNewsletter

// Initialize the application
document.addEventListener("DOMContentLoaded", initApp)
