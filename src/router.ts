import { renderHomePage } from "./pages/home"
import { renderProductsPage } from "./pages/products"
import { renderProductDetailPage } from "./pages/product-detail"
import { renderAboutPage } from "./pages/about"
import { renderContactPage } from "./pages/contact"
import { renderNotFoundPage } from "./pages/notfound"

type Route = {
  path: string
  render: (params?: any) => Promise<void>
}

const routes: Route[] = [
  { path: "/", render: renderHomePage },
  { path: "/products", render: renderProductsPage },
  { path: "/product/:id", render: (params) => renderProductDetailPage(params.id) },
  { path: "/about", render: renderAboutPage },
  { path: "/contact", render: renderContactPage },
  { path: "*", render: renderNotFoundPage },
]

export function initRouter(): void {
  console.log("Initializing router...")

  // Handle initial route
  handleRouteChange()

  // Listen for hash changes
  window.addEventListener("hashchange", handleRouteChange)

  // Add navigation helper to window
  ;(window as any).navigateTo = navigateTo

  console.log("Router initialized successfully!")
}

export function navigateTo(path: string): void {
  console.log("Navigating to:", path)
  window.location.hash = path
}

function handleRouteChange(): void {
  // Get current route (remove # from hash)
  const path = window.location.hash.slice(1) || "/"
  console.log("Route changed to:", path)

  // Find matching route
  const route = findMatchingRoute(path)

  if (route) {
    const params = extractRouteParams(route.path, path)
    console.log("Rendering route:", route.path, "with params:", params)
    route.render(params).catch((error) => {
      console.error("Error rendering route:", error)
      renderNotFoundPage()
    })
  } else {
    console.log("No route found, rendering 404")
    renderNotFoundPage()
  }
}

function findMatchingRoute(path: string): Route | undefined {
  // First try exact match
  let route = routes.find((r) => r.path === path)

  // If no exact match, try pattern match
  if (!route) {
    route = routes.find((r) => {
      if (r.path === "*") return false

      const routeParts = r.path.split("/")
      const pathParts = path.split("/")

      if (routeParts.length !== pathParts.length) return false

      return routeParts.every((part, i) => {
        return part.startsWith(":") || part === pathParts[i]
      })
    })
  }

  // If still no match, use wildcard route
  if (!route) {
    route = routes.find((r) => r.path === "*")
  }

  return route
}

function extractRouteParams(routePath: string, currentPath: string): Record<string, string> {
  const params: Record<string, string> = {}

  const routeParts = routePath.split("/")
  const pathParts = currentPath.split("/")

  routeParts.forEach((part, i) => {
    if (part.startsWith(":")) {
      const paramName = part.slice(1)
      params[paramName] = pathParts[i]
    }
  })

  return params
}
