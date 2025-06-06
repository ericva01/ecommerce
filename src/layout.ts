import { renderHeader } from "./components/header"
import { renderFooter } from "./components/footer"

export function renderLayout(): void {
  const app = document.getElementById("app")

  if (!app) return

  // Create main content container
  const content = document.createElement("main")
  content.id = "content"
  content.className = "flex-grow container mx-auto px-4 py-8"

  // Render the layout
  app.innerHTML = ""
  app.appendChild(renderHeader())
  app.appendChild(content)
  app.appendChild(renderFooter())
}

export function setContent(htmlContent: string): void {
  const content = document.getElementById("content")
  if (content) {
    content.innerHTML = htmlContent
  }
}
