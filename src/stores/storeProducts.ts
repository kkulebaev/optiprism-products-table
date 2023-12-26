import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Categories, Predicate, Product, ProductFilter } from '../types/types'
import { PRODUCTS } from '../server/data'

/* Store создан исключительно в демонстрационных целях, в реальном приложении, скорее всего, эти данные не поместил бы в стор */
export const useStoreProducts = defineStore('products', () => {
  const products = ref(PRODUCTS)

  const categories = ref<Categories | null>(null)
  const productSearchString = ref<string | null>(null)

  const __predicates: Predicate[] = [__searchStringPredicate, __categoriesPredicate]

  const filteredProducts = computed(() => {
    return products.value.filter(item => __predicates.every(p => p(item)))
  })

  return {
    categories,
    productSearchString,
    filteredProducts,

    addFilter,
    removeFilter,
    updateCategories,
    updateProductSearchString,
  }

  function __searchStringPredicate(item: Product): boolean {
    if (!productSearchString.value) return true
    return item.product.toLowerCase().includes(productSearchString.value.toLowerCase())
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
    productSearchString.value = ''
  }

  function removeFilter(filter: ProductFilter) {
    switch (filter) {
      case 'category':
        __removeFilterCategory()
        break
      case 'product':
        __removeFilterProduct()
        break
    }
  }

  function __removeFilterCategory() {
    categories.value = null
  }

  function __removeFilterProduct() {
    productSearchString.value = null
  }

  function updateCategories(newCategories: Categories | null) {
    categories.value = newCategories
  }

  function updateProductSearchString(searchStr: string | null) {
    productSearchString.value = searchStr
  }
})
