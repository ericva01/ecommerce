export function renderHeader(): HTMLElement {
  const header = document.createElement("header")
  header.className = "bg-white shadow-md"

  header.innerHTML = `
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div class="flex items-center">
          <a href="#/" class="text-2xl font-bold text-blue-600">ShopEase</a>
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
              id="search-button"
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
            <li><a href="#/" class="hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="#/products" class="hover:text-blue-600 transition-colors">Products</a></li>
            <li><a href="#/about" class="hover:text-blue-600 transition-colors">About</a></li>
            <li><a href="#/contact" class="hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `

  // Add event listeners
  setTimeout(() => {
    const searchInput = document.getElementById("search-input")
    const searchButton = document.getElementById("search-button")

    if (searchInput && searchButton) {
      const handleSearch = () => {
        const query = (searchInput as HTMLInputElement).value.trim()
        if (query) {
          window.location.hash = `/products?search=${encodeURIComponent(query)}`
        }
      }

      searchButton.addEventListener("click", handleSearch)
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSearch()
      })
    }
  }, 0)

  return header
}
