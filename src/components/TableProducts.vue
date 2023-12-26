<script setup lang="ts">
import { ElTable, ElTableColumn } from 'element-plus'

import { Product } from '../types/types.ts'

interface IProps {
  filteredProducts: Product[]
}

withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <ElTable :data="filteredProducts" :stripe="true">
    <ElTableColumn prop="category" label="Category" />
    <ElTableColumn prop="product" label="Product" />
  </ElTable>
</template>
