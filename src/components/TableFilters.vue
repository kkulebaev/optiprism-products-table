<script setup lang="ts">
import { computed } from 'vue'
import { capitalize } from '../utils/capitalize'
import { ElButton, ElInput, ElOption, ElSelect, ElSpace } from 'element-plus'
import type { BaseCascaderOption, Categories, ProductFilter } from '../types/types'
import BaseCascader from './BaseCascader/BaseCascader.vue'

interface IProps {
  categoryGroups: Categories[]
  searchStrings: string[]
  cascaderOptions: BaseCascaderOption[]
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits<{
  (event: 'add-filter', filter: ProductFilter): void
  (event: 'remove-filter', filter: ProductFilter, index: number): void
  (event: 'update:category-groups', categories: (typeof props)['categoryGroups']): void
  (event: 'update:search-strings', searchStr: (typeof props)['searchStrings']): void
}>()

const curCategoryGroups = computed({
  get() {
    return props.categoryGroups
  },
  set(value) {
    emit('update:category-groups', value)
  },
})

const curProductSearchString = computed({
  get() {
    return props.searchStrings
  },
  set(value) {
    emit('update:search-strings', value)
  },
})

const FILTERS_OPTIONS: ProductFilter[] = ['category', 'product']
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
    <ElSpace v-for="(_, i) in curCategoryGroups">
      <BaseCascader v-model="curCategoryGroups[i]" :options="cascaderOptions" />
      <ElButton size="large" @click="emit('remove-filter', 'category', i)"> X </ElButton>
    </ElSpace>

    <ElSpace v-for="(_, i) in curProductSearchString">
      <ElInput
        v-model="curProductSearchString[i]"
        size="large"
        placeholder="Product"
        :clearable="true"
      />
      <ElButton size="large" @click="emit('remove-filter', 'product', i)"> X </ElButton>
    </ElSpace>
  </ElSpace>
</template>
