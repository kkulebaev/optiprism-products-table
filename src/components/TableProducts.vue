<script setup lang="ts">
import { ElTable, ElTableColumn } from 'element-plus'
import { Product } from '../types/types'

interface IProps {
  filteredProducts: Product[]
  isLoading?: boolean
}

withDefaults(defineProps<IProps>(), {
  isLoading: false,
})
</script>

<template>
  <ElTable :data="filteredProducts" v-loading="isLoading" :stripe="true">
    <ElTableColumn prop="category" label="Category" />
    <ElTableColumn prop="product" label="Product" />
  </ElTable>
</template>
