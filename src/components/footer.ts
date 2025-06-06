export function renderFooter(): HTMLElement {
  const footer = document.createElement("footer")
  footer.className = "bg-gray-800 text-white py-8"

  footer.innerHTML = `
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4">ShopEase</h3>
          <p class="text-gray-300">Your one-stop shop for quality products at affordable prices.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="#/" class="text-gray-300 hover:text-white transition-colors">Home</a></li>
            <li><a href="#/products" class="text-gray-300 hover:text-white transition-colors">Products</a></li>
            <li><a href="#/about" class="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#/contact" class="text-gray-300 hover:text-white transition-colors">Contact</a></li>
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
  `

  return footer
}
