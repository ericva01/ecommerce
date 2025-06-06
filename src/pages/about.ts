import { setContent } from "../layout"

export async function renderAboutPage(): Promise<void> {
  setContent(`
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">About ShopEase</h1>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="md:flex">
          <div class="md:w-1/2">
            <img 
              src="/placeholder.svg?height=400&width=600" 
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
      
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
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
      
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold mb-6 text-center">Our Team</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="/placeholder.svg?height=128&width=128" 
                alt="Team Member" 
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-lg font-medium">John Doe</h3>
            <p class="text-gray-600">CEO & Founder</p>
          </div>
          
          <div class="text-center">
            <div class="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="/placeholder.svg?height=128&width=128" 
                alt="Team Member" 
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-lg font-medium">Jane Smith</h3>
            <p class="text-gray-600">COO</p>
          </div>
          
          <div class="text-center">
            <div class="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="/placeholder.svg?height=128&width=128" 
                alt="Team Member" 
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-lg font-medium">Mike Johnson</h3>
            <p class="text-gray-600">CTO</p>
          </div>
          
          <div class="text-center">
            <div class="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
              <img 
                src="/placeholder.svg?height=128&width=128" 
                alt="Team Member" 
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-lg font-medium">Sarah Williams</h3>
            <p class="text-gray-600">Head of Design</p>
          </div>
        </div>
      </div>
    </div>
  `)
}
