import type { Product } from '../types/types.ts'
import { CascaderOption } from 'element-plus/es/components/cascader-panel/src/node'

export function mapCategories(categories: Product[]) {
  const result: CascaderOption[] = []

  categories.forEach(category => {
    let currentLevel: CascaderOption[] = result

    category.category.forEach(label => {
      const existingCategory = currentLevel.find(item => item.value === label.toLowerCase())

      if (existingCategory && existingCategory.children) {
        currentLevel = existingCategory.children
      } else {
        const newCategory: CascaderOption = {
          value: label.toLowerCase(),
          label: label,
          children: [],
        }

        currentLevel.push(newCategory)
        if (newCategory.children) {
          currentLevel = newCategory.children
        }
      }
    })
  })

  return result
}