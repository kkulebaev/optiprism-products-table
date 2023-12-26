<script setup lang="ts">
import { ElCard, ElText } from 'element-plus'
import TableProducts from './components/TableProducts.vue'
import TableFilters from './components/TableFilters.vue'
import { useStoreProducts } from './stores/storeProducts.ts'
import { storeToRefs } from 'pinia'

const storeProduct = useStoreProducts()
const { addFilter, removeFilter, updateCategories, updateProductSearchString } = storeProduct
const { categories, productSearchString, filteredProducts } = storeToRefs(storeProduct)
</script>

<template>
  <main class="main">
    <ElText size="large">OptiPrism Products Table</ElText>
    <ElCard class="main__card">
      <template #header>
        <TableFilters
          :categories="categories"
          :product-search-string="productSearchString"
          @add-filter="addFilter"
          @remove-filter="removeFilter"
          @update:categories="updateCategories"
          @update:product-search-string="updateProductSearchString"
        />
      </template>

      <TableProducts :filtered-products="filteredProducts" />
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
