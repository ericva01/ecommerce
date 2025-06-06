import { Product } from "../types/product";

export function createProductCard(product: Product): HTMLElement {
  const card = document.createElement("div")
  card.className = "card group"
  card.setAttribute("data-product-id", product.id.toString())

  card.innerHTML = `
    <div class="aspect-square overflow-hidden bg-gray-100">
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
  `

  // Add click event to navigate to product detail
  card.addEventListener("click", () => {
    window.location.hash = `/product/${product.id}`
  })

  return card
}

export function createProductCardSkeleton(): HTMLElement {
  const card = document.createElement("div")
  card.className = "card"

  card.innerHTML = `
    <div class="aspect-square skeleton"></div>
    <div class="p-4">
      <div class="skeleton h-5 w-3/4 mb-2"></div>
      <div class="skeleton h-4 w-1/2 mb-4"></div>
      <div class="flex items-center justify-between">
        <div class="skeleton h-6 w-16"></div>
        <div class="skeleton h-4 w-10"></div>
      </div>
    </div>
  `

  return card
}
