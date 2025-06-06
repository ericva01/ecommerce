import type { Product } from "../types/product"

const API_URL = "https://fakestoreapi.com"

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/products/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    throw error
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}
