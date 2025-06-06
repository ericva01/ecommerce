import { setContent } from "../layout"

export async function renderNotFoundPage(): Promise<void> {
  setContent(`
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div class="mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-gray-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6-8a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p class="text-gray-600 max-w-md mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, 
          deleted, or you might have entered the wrong URL.
        </p>
      </div>
      
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
        <a href="#/" class="btn-primary inline-block">
          Go Home
        </a>
        <a href="#/products" class="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors">
          Browse Products
        </a>
      </div>
      
      <div class="mt-12 text-sm text-gray-500">
        <p>If you believe this is an error, please <a href="#/contact" class="text-blue-600 hover:underline">contact us</a>.</p>
      </div>
    </div>
    
    <div class="mt-16 bg-white rounded-lg shadow-md p-8">
      <h3 class="text-xl font-semibold mb-4">Popular Pages</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <a href="#/" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
          <div class="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span class="font-medium">Home</span>
          </div>
          <p class="text-sm text-gray-600">Return to our homepage</p>
        </a>
        
        <a href="#/products" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
          <div class="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM6 9a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">Products</span>
          </div>
          <p class="text-sm text-gray-600">Browse our product catalog</p>
        </a>
        
        <a href="#/about" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
          <div class="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">About Us</span>
          </div>
          <p class="text-sm text-gray-600">Learn more about our company</p>
        </a>
        
        <a href="#/contact" class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
          <div class="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span class="font-medium">Contact</span>
          </div>
          <p class="text-sm text-gray-600">Get in touch with us</p>
        </a>
      </div>
    </div>
  `)
}
