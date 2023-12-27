import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Categories, Predicate, Product, ProductFilter } from '../types/types'
import { mapCategories } from '../utils/mapCategories.ts'
import { apiClient } from '../api'

/* Store создан исключительно в демонстрационных целях, в реальном приложении, скорее всего, эти данные не поместил бы в стор */
export const useStoreProducts = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)

  const categories = ref<Categories | null>(null)
  const searchStrings = ref<string[]>([])

  const __predicates: Predicate[] = [__searchStringPredicate, __categoriesPredicate]

  const filteredProducts = computed(() => {
    return products.value.filter(item => __predicates.every(p => p(item)))
  })

  const cascaderOptions = computed(() => mapCategories(products.value))

  return {
    categories,
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
    if (!categories.value?.length) return true
    return categories.value.some(x =>
      x.every((cat, index) => cat.toLowerCase() === item.category[index].toLowerCase())
    )
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
    categories.value = []
  }

  function __addFilterProduct() {
    searchStrings.value.push('')
  }

  function removeFilter(filter: ProductFilter, index: number) {
    switch (filter) {
      case 'category':
        __removeFilterCategory()
        break
      case 'product':
        __removeFilterProduct(index)
        break
    }
  }

  function __removeFilterCategory() {
    categories.value = null
  }

  function __removeFilterProduct(index: number) {
    searchStrings.value.splice(index, 1)
  }

  function updateCategories(newCategories: Categories | null) {
    categories.value = newCategories
  }

  function updateProductSearchString(searchStr: string[]) {
    searchStrings.value = searchStr
  }
})
