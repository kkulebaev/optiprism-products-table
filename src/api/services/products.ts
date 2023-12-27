import { apiInstance } from '../apiInstance'
import { Product } from '../../types/types.ts'

const PATH = '/products'

export const productsAPI = () => ({
  getProducts() {
    return apiInstance.get<Product[]>(PATH)
  },
})
