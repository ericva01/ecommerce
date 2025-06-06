import { setContent } from "../layout"
import { fetchProductById } from "../services/api"

export async function renderProductDetailPage(productId: string): Promise<void> {
  // Set initial content with loading state
  setContent(`
    <div class="mb-8">
      <a href="#/products" class="inline-flex items-center text-blue-600 hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Products
      </a>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/2 p-8">
            <div class="aspect-square w-full bg-gray-100 skeleton"></div>
          </div>
          
          <div class="md:w-1/2 p-8">
            <div class="skeleton h-8 w-3/4 mb-4"></div>
            <div class="skeleton h-6 w-1/4 mb-6"></div>
            
            <div class="skeleton h-4 w-full mb-2"></div>
            <div class="skeleton h-4 w-full mb-2"></div>
            <div class="skeleton h-4 w-3/4 mb-6"></div>
            
            <div class="skeleton h-10 w-1/3 mb-6"></div>
            
            <div class="skeleton h-12 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  `)

  try {
    // Fetch product details
    const product = await fetchProductById(productId)

    // Update content with product details
    setContent(`
      <div class="mb-8">
        <a href="#/products" class="inline-flex items-center text-blue-600 hover:underline mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Products
        </a>
        
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
                
                <button class="flex-grow btn-primary flex items-center justify-center">
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
    `)
  } catch (error) {
    console.error(`Error loading product with ID ${productId}:`, error)
    setContent(`
      <div class="mb-8">
        <a href="#/products" class="inline-flex items-center text-blue-600 hover:underline mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Products
        </a>
        
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-2xl font-bold mb-2">Product Not Found</h1>
          <p class="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <a href="#/products" class="btn-primary">Browse Products</a>
        </div>
      </div>
    `)
  }
}
