export interface Product {
  product: string
  category: string[]
}

export type ProductFilter = 'category' | 'product'

export type Categories = string[][]

export type Predicate = (item: Product) => boolean
