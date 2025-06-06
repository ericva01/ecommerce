import { setContent } from "../layout"
import { fetchProducts } from "../services/api"
import { createProductCard, createProductCardSkeleton } from "../components/product-card"

export async function renderHomePage(): Promise<void> {
  // Set initial content with loading state
  setContent(`
    <section class="py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopEase</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover quality products at affordable prices. Your one-stop shop for all your needs.
        </p>
        <div class="mt-8">
          <a href="#/products" class="btn-primary">Shop Now</a>
        </div>
      </div>
    </section>
    
    <section class="py-12 bg-gray-50 -mx-4 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div id="featured-products" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${Array(4)
            .fill(0)
            .map(() => createProductCardSkeleton().outerHTML)
            .join("")}
        </div>
      </div>
    </section>
    
    <section class="py-12">
      <div class="container mx-auto">
        <div class="bg-blue-600 rounded-lg p-8 text-white">
          <div class="md:flex md:items-center md:justify-between">
            <div class="mb-6 md:mb-0 md:w-2/3">
              <h2 class="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
              <p class="text-blue-100">Stay updated with our latest products and exclusive offers.</p>
            </div>
            <div class="md:w-1/3">
              <form class="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  class="flex-grow px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button type="submit" class="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `)

  try {
    // Fetch featured products
    const products = await fetchProducts()
    const featuredProducts = products.slice(0, 4) // Get first 4 products

    // Update featured products section
    const featuredProductsContainer = document.getElementById("featured-products")
    if (featuredProductsContainer) {
      featuredProductsContainer.innerHTML = ""
      featuredProducts.forEach((product) => {
        featuredProductsContainer.appendChild(createProductCard(product))
      })
    }
  } catch (error) {
    console.error("Error loading featured products:", error)
    const featuredProductsContainer = document.getElementById("featured-products")
    if (featuredProductsContainer) {
      featuredProductsContainer.innerHTML = `
        <div class="col-span-full text-center py-8">
          <p class="text-red-500">Failed to load featured products. Please try again later.</p>
        </div>
      `
    }
  }
}
