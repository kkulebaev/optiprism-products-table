<script setup lang="ts">
import { ElCard, ElText } from 'element-plus'
import TableProducts from './components/TableProducts.vue'
import TableFilters from './components/TableFilters.vue'
import { useStoreProducts } from './stores/storeProducts'
import { storeToRefs } from 'pinia'

const storeProduct = useStoreProducts()
const { addFilter, removeFilter, updateCategories, updateProductSearchString, fetchProducts } =
  storeProduct
const { categoryGroups, searchStrings, filteredProducts, cascaderOptions, isLoading } =
  storeToRefs(storeProduct)

fetchProducts()
</script>

<template>
  <main class="main">
    <ElText size="large">OptiPrism Products Table</ElText>
    <ElCard class="main__card">
      <template #header>
        <TableFilters
          :category-groups="categoryGroups"
          :search-strings="searchStrings"
          :cascader-options="cascaderOptions"
          @add-filter="addFilter"
          @remove-filter="removeFilter"
          @update:category-groups="updateCategories"
          @update:product-search-string="updateProductSearchString"
        />
      </template>

      <TableProducts :filtered-products="filteredProducts" :is-loading="isLoading" />
    </ElCard>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.main__card {
  flex: 1;
}
</style>
