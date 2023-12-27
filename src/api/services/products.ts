import { apiInstance } from '../apiInstance'
import type { Product } from '../../types/types'

const PATH = '/products'

export const productsAPI = () => ({
  getProducts() {
    return apiInstance.get<Product[]>(PATH)
  },
})
