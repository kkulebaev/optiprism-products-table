import type { Product } from '../types/types.ts'
import { mapCategories } from '../utils/mapCategories.ts'

export const PRODUCTS: Product[] = [
  {
    product: 'Fountain',
    category: ['Animals', 'Cats', 'Toys'],
  },
  {
    product: 'Koopman',
    category: ['Animals', 'Cats', 'Toys'],
  },
  {
    product: 'Purina Pro Plan',
    category: ['Animals', 'Cats', 'Food'],
  },
  {
    product: 'Black Dog',
    category: ['Animals', 'Dogs'],
  },
  {
    product: 'Bone',
    category: ['Animals', 'Dogs', 'Toys'],
  },
  {
    product: 'Gran Sofa',
    category: ['Furniture', 'Sofas'],
  },
  {
    product: 'Green Chair',
    category: ['Furniture', 'Chair'],
  },
  {
    product: 'Black Chair',
    category: ['Furniture', 'Chair'],
  },
  {
    product: 'Crystal UHD 2023',
    category: ['TV', 'Samsung', "55''"],
  },
  {
    product: 'Xiaomi TV A2',
    category: ['TV', 'Xiaomi', "43''"],
  },
  {
    product: 'LG UR340C Series',
    category: ['TV', 'LG', "43''"],
  },
]

export const CASCADER_OPTIONS = mapCategories(PRODUCTS)
