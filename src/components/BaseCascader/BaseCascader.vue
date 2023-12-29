<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElButton, ElCheckbox } from 'element-plus'
import BaseCascaderPanel from './BaseCascaderPanel.vue'
import { cloneDeep } from 'lodash'
import type { BaseCascaderOption } from '../../types/types'

interface IProps {
  modelValue: string[][]
  options: BaseCascaderOption[]
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits<{
  (event: 'update:modelValue', value: (typeof props)['modelValue']): void
}>()

const curValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const showDropdown = ref(false)

const patchedOptions = ref(initPatchOptions(props.options, props.modelValue))

function initPatchOptions(array: BaseCascaderOption[], initValues: string[][]) {
  const patchedVisible = changeDeepVisible(array)
  const predicate = (item: BaseCascaderOption) => initValues[0]?.includes(item.value)
  const patchedChecked = changeDeepOption(patchedVisible, true, predicate, 'checked')
  return patchedChecked
}

function onOpenHandler(value: string, arr: string[] = []) {
  const newArr = [...arr]
  newArr.unshift(value)
  const predicate = (item: BaseCascaderOption) => newArr.includes(item.value)
  patchedOptions.value = deepVisibleFalse()
  patchedOptions.value = changeDeepVisible(patchedOptions.value, true, predicate)
}

function onSelectHandler(value: string, arr: string[] = [], checked: boolean) {
  const newArr = [...arr]
  if (checked) newArr.unshift(value)
  const predicate = (item: BaseCascaderOption) => newArr.includes(item.value)
  patchedOptions.value = deepSelectFalse()
  patchedOptions.value = changeDeepOption(patchedOptions.value, true, predicate, 'checked')
  curValue.value = [newArr]
}

function changeDeepOption(
  array: BaseCascaderOption[],
  value: boolean = false,
  predicate: (item: BaseCascaderOption) => boolean = () => true,
  key: string
): BaseCascaderOption[] {
  const copy = cloneDeep(array)

  copy.forEach(obj => {
    let curPredicate = predicate

    if (curPredicate(obj)) {
      obj[key] = value
    } else {
      curPredicate = () => false
    }

    if (obj.children) {
      obj.children = changeDeepOption(obj.children, value, curPredicate, key)
    }
  })

  return copy
}

function changeDeepVisible(
  array: BaseCascaderOption[],
  value: boolean = false,
  predicate: (item: BaseCascaderOption) => boolean = () => true
) {
  return changeDeepOption(array, value, predicate, 'visible')
}

const deepVisibleFalse = () => changeDeepVisible(patchedOptions.value, false)
const deepSelectFalse = () => changeDeepOption(patchedOptions.value, false, () => true, 'checked')

watch(
  () => props.options,
  () => {
    patchedOptions.value = initPatchOptions(props.options, props.modelValue)
  }
)

watch(showDropdown, () => {
  if (!showDropdown.value) patchedOptions.value = deepVisibleFalse()
})
</script>

<template>
  <div class="cascader">
    <ElButton class="cascader__trigger" size="large" @click="showDropdown = !showDropdown">
      <template v-if="curValue.length && curValue[0].length">
        {{ curValue[0].join(' > ') }}
      </template>
      <template v-else> Category </template>
      <span class="cascader__caret">▼</span>
    </ElButton>

    <ul v-if="showDropdown" class="cascader__menu">
      <li
        v-for="item in patchedOptions"
        class="cascader__menu-item"
        @click.self="onOpenHandler(item.value)"
      >
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
  </div>
</template>

<style>
.cascader {
  position: relative;
}

.cascader__trigger {
  min-width: 12rem;
}

.cascader__caret {
  margin-left: 0.5rem;
}

.cascader__menu,
.cascader__submenu {
  --pad: 0.5rem;

  position: absolute;
  z-index: 4;
  background: white;
  height: 10rem;
  width: calc(100% - 2 * var(--pad));
  padding: 0 var(--pad);
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}

.cascader__menu {
  top: 100%;
  left: 0;
}

.cascader__submenu {
  top: 0;
  left: 100%;
  margin-left: 0.2rem;
}

.cascader__menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    & > .cascader__menu-item-caret {
      color: var(--el-color-primary);
    }
  }
}
</style>
