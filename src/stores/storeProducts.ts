import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  BaseCascaderOption,
  Categories,
  Predicate,
  Product,
  ProductFilter,
} from '../types/types'
import { apiClient } from '../api'

/* Store создан исключительно в демонстрационных целях, в реальном приложении, скорее всего, эти данные не поместил бы в стор */
export const useStoreProducts = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)

  const categoryGroups = ref<Categories[]>([])
  const searchStrings = ref<string[]>([])

  const __predicates: Predicate[] = [__searchStringPredicate, __categoriesPredicate]

  const filteredProducts = computed(() => {
    return products.value.filter(item => __predicates.every(p => p(item)))
  })

  const cascaderOptions = computed(() => mapCategories(products.value))

  return {
    categoryGroups,
    searchStrings,
    filteredProducts,
    cascaderOptions,
    isLoading,

    fetchProducts,
    addFilter,
    removeFilter,
    updateCategories,
    updateProductSearchString,
  }

  function fetchProducts() {
    isLoading.value = true

    apiClient.products
      .getProducts()
      .then(({ data }) => {
        products.value = data
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  function __searchStringPredicate(item: Product): boolean {
    if (!searchStrings.value.length) return true
    return searchStrings.value.every(searchStr =>
      item.product.toLowerCase().includes(searchStr.toLowerCase())
    )
  }

  function __categoriesPredicate(item: Product): boolean {
    if (!categoryGroups.value?.length) return true
    return categoryGroups.value.every(catGroup => {
      if (!catGroup.length) return true

      return catGroup.some(x =>
        x.every((cat, index) => cat.toLowerCase() === item.category[index]?.toLowerCase())
      )
    })
  }

  function addFilter(filter: ProductFilter) {
    switch (filter) {
      case 'category':
        __addFilterCategory()
        break
      case 'product':
        __addFilterProduct()
        break
    }
  }

  function __addFilterCategory() {
    categoryGroups.value.push([])
  }

  function __addFilterProduct() {
    searchStrings.value.push('')
  }

  function removeFilter(filter: ProductFilter, index: number) {
    switch (filter) {
      case 'category':
        __removeFilterCategory(index)
        break
      case 'product':
        __removeFilterProduct(index)
        break
    }
  }

  function __removeFilterCategory(index: number) {
    categoryGroups.value.splice(index, 1)
  }

  function __removeFilterProduct(index: number) {
    searchStrings.value.splice(index, 1)
  }

  function updateCategories(newCategories: Categories[]) {
    categoryGroups.value = newCategories
  }

  function updateProductSearchString(searchStr: string[]) {
    searchStrings.value = searchStr
  }
})

function mapCategories(categories: Product[]): BaseCascaderOption[] {
  const result: BaseCascaderOption[] = []

  categories.forEach(category => {
    let currentLevel: BaseCascaderOption[] = result

    category.category.forEach(label => {
      const existingCategory = currentLevel.find(item => item.value === label.toLowerCase())

      if (existingCategory && existingCategory.children) {
        currentLevel = existingCategory.children
      } else {
        const newCategory: BaseCascaderOption = {
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
