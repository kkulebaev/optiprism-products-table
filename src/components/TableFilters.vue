<script setup lang="ts">
import { computed } from 'vue'
import { capitalize } from '../utils/capitalize'
import {
  CascaderProps,
  ElButton,
  ElCascader,
  ElInput,
  ElOption,
  ElSelect,
  ElSpace,
} from 'element-plus'
import type { Categories, ProductFilter } from '../types/types'
import { CascaderOption } from 'element-plus/es/components/cascader-panel/src/node'

interface IProps {
  categories: Categories | null
  productSearchString: string | null
  cascaderOptions: CascaderOption[]
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits<{
  (event: 'add-filter', filter: ProductFilter): void
  (event: 'remove-filter', filter: ProductFilter): void
  (event: 'update:categories', categories: (typeof props)['categories']): void
  (event: 'update:product-search-string', searchStr: (typeof props)['productSearchString']): void
}>()

const curCategories = computed({
  get() {
    return props.categories
  },
  set(value) {
    emit('update:categories', value)
  },
})

const curProductSearchString = computed({
  get() {
    return props.productSearchString
  },
  set(value) {
    emit('update:product-search-string', value)
  },
})

const FILTERS_OPTIONS: ProductFilter[] = ['category', 'product']

const cascaderProps: CascaderProps = {
  multiple: true,
  checkStrictly: true,
}
</script>

<template>
  <ElSpace>
    <ElSelect placeholder="Add filter" size="large" @change="emit('add-filter', $event)">
      <ElOption
        v-for="item in FILTERS_OPTIONS"
        :key="item"
        :label="capitalize(item)"
        :value="item"
      />
    </ElSelect>
    <ElSpace v-if="curCategories">
      <ElCascader
        v-model="curCategories"
        size="large"
        separator=" > "
        placeholder="Category"
        :options="cascaderOptions"
        :props="cascaderProps"
        :clearable="true"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
      />
      <ElButton size="large" @click="emit('remove-filter', 'category')"> X </ElButton>
    </ElSpace>

    <ElSpace v-if="curProductSearchString !== null">
      <ElInput
        v-model="curProductSearchString"
        size="large"
        placeholder="Product"
        :clearable="true"
      />
      <ElButton size="large" @click="emit('remove-filter', 'product')"> X </ElButton>
    </ElSpace>
  </ElSpace>
</template>