import { setContent } from "../layout"
import { fetchProducts, fetchCategories } from "../services/api"
import { createProductCard, createProductCardSkeleton } from "../components/product-card"
import type { Product } from "../types/product"

export async function renderProductsPage(): Promise<void> {
  // Get search query from URL if present
  const urlParams = new URLSearchParams(window.location.hash.split("?")[1] || "")
  const searchQuery = urlParams.get("search") || ""

  // Set initial content with loading state
  setContent(`
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">Our Products</h1>
      
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <div class="w-full md:w-64 bg-white p-4 rounded-lg shadow">
          <h2 class="font-medium text-lg mb-4">Filters</h2>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input 
              type="text" 
              id="filter-search"
              value="${searchQuery}"
              placeholder="Search products..." 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              id="filter-category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="loading" disabled>Loading categories...</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div class="flex items-center gap-2">
              <input 
                type="number" 
                id="filter-min-price"
                placeholder="Min" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <span>-</span>
              <input 
                type="number" 
                id="filter-max-price"
                placeholder="Max" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <button 
            id="apply-filters"
            class="w-full btn-primary"
          >
            Apply Filters
          </button>
        </div>
        
        <div class="flex-grow">
          <div id="products-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${Array(6)
              .fill(0)
              .map(() => createProductCardSkeleton().outerHTML)
              .join("")}
          </div>
          
          <div id="no-results" class="hidden py-12 text-center">
            <p class="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button id="clear-filters" class="mt-4 text-blue-600 hover:underline">Clear filters</button>
          </div>
        </div>
      </div>
    </div>
  `)

  try {
    // Fetch products and categories in parallel
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()])

    // Populate category filter
    const categorySelect = document.getElementById("filter-category") as HTMLSelectElement
    if (categorySelect) {
      categorySelect.innerHTML = `
        <option value="">All Categories</option>
        ${categories
          .map(
            (category) => `
          <option value="${category}">${category.charAt(0).toUpperCase() + category.slice(1)}</option>
        `,
          )
          .join("")}
      `
    }

    // Set up filter functionality
    setupFilters(products)

    // Initial filtering based on URL search parameter
    if (searchQuery) {
      const filterSearchInput = document.getElementById("filter-search") as HTMLInputElement
      if (filterSearchInput) {
        filterSearchInput.value = searchQuery
        filterProducts(products)
      }
    } else {
      // Display all products initially
      displayProducts(products)
    }
  } catch (error) {
    console.error("Error loading products:", error)
    const productsContainer = document.getElementById("products-container")
    if (productsContainer) {
      productsContainer.innerHTML = `
        <div class="col-span-full text-center py-8">
          <p class="text-red-500">Failed to load products. Please try again later.</p>
          <button id="retry-load" class="mt-4 btn-primary">Retry</button>
        </div>
      `

      const retryButton = document.getElementById("retry-load")
      if (retryButton) {
        retryButton.addEventListener("click", () => renderProductsPage())
      }
    }
  }
}

function setupFilters(products: Product[]): void {
  const filterSearchInput = document.getElementById("filter-search") as HTMLInputElement
  const filterCategorySelect = document.getElementById("filter-category") as HTMLSelectElement
  const filterMinPriceInput = document.getElementById("filter-min-price") as HTMLInputElement
  const filterMaxPriceInput = document.getElementById("filter-max-price") as HTMLInputElement
  const applyFiltersButton = document.getElementById("apply-filters")
  const clearFiltersButton = document.getElementById("clear-filters")

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", () => filterProducts(products))
  }

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", () => {
      // Reset filter inputs
      if (filterSearchInput) filterSearchInput.value = ""
      if (filterCategorySelect) filterCategorySelect.value = ""
      if (filterMinPriceInput) filterMinPriceInput.value = ""
      if (filterMaxPriceInput) filterMaxPriceInput.value = ""

      // Display all products
      displayProducts(products)

      // Hide no results message
      const noResultsElement = document.getElementById("no-results")
      if (noResultsElement) noResultsElement.classList.add("hidden")
    })
  }
}

function filterProducts(products: Product[]): void {
  const filterSearchInput = document.getElementById("filter-search") as HTMLInputElement
  const filterCategorySelect = document.getElementById("filter-category") as HTMLSelectElement
  const filterMinPriceInput = document.getElementById("filter-min-price") as HTMLInputElement
  const filterMaxPriceInput = document.getElementById("filter-max-price") as HTMLInputElement

  const searchTerm = filterSearchInput?.value.toLowerCase() || ""
  const category = filterCategorySelect?.value || ""
  const minPrice = filterMinPriceInput?.value ? Number.parseFloat(filterMinPriceInput.value) : 0
  const maxPrice = filterMaxPriceInput?.value ? Number.parseFloat(filterMaxPriceInput.value) : Number.POSITIVE_INFINITY

  const filteredProducts = products.filter((product) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)

    // Filter by category
    const matchesCategory = category === "" || product.category === category

    // Filter by price range
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Display filtered products
  displayProducts(filteredProducts)

  // Show/hide no results message
  const noResultsElement = document.getElementById("no-results")
  if (noResultsElement) {
    if (filteredProducts.length === 0) {
      noResultsElement.classList.remove("hidden")
    } else {
      noResultsElement.classList.add("hidden")
    }
  }
}

function displayProducts(products: Product[]): void {
  const productsContainer = document.getElementById("products-container")
  if (!productsContainer) return

  productsContainer.innerHTML = ""

  products.forEach((product) => {
    productsContainer.appendChild(createProductCard(product))
  })
}
