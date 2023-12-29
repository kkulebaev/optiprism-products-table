<script setup lang="ts">
import { ElCheckbox } from 'element-plus'
import type { BaseCascaderOption } from '../../types/types'

interface IProps {
  options: BaseCascaderOption[]
}

withDefaults(defineProps<IProps>(), {})

const emit = defineEmits<{
  (event: 'open', value: string[]): void
  (event: 'change', value: string[]): void
}>()

function onOpenHandler(value: string, arr: string[] = []) {
  const newArr = [...arr]
  newArr.unshift(value)
  emit('open', newArr)
}

function onSelectHandler(value: string, arr: string[] = [], checked: boolean) {
  const newArr = [...arr]
  if (checked) newArr.unshift(value)
  emit('change', newArr)
}
</script>

<template>
  <ul v-if="options.length" class="cascader__submenu menu-item">
    <li v-for="item in options" class="cascader__menu-item" @click.self="onOpenHandler(item.value)">
      <ElCheckbox
        :model-value="item.checked"
        @change="checked => onSelectHandler(item.value, [], !!checked)"
      >
        {{ item.label }}
      </ElCheckbox>

      <BaseCascaderPanel
        v-if="item.visible && item.children"
        :options="item.children"
        @open="arr => onOpenHandler(item.value, arr)"
        @change="arr => onSelectHandler(item.value, arr, true)"
      />
      <span
        v-if="item.children?.length"
        class="cascader__menu-item-caret"
        @click.self="onOpenHandler(item.value)"
      >
        >
      </span>
    </li>
  </ul>
</template>
