export interface Product {
  product: string
  category: string[]
}

export type ProductFilter = 'category' | 'product'

export type Categories = string[][]

export type Predicate = (item: Product) => boolean

export interface BaseCascaderOption extends Record<string, unknown> {
  label: string
  value: string
  children?: BaseCascaderOption[]
  visible?: boolean
  checked?: boolean
}