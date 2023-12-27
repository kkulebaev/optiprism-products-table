import { productsAPI } from './services/products'

const apiClient = {
  products: productsAPI(),
}

export { apiClient }
