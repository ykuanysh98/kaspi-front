<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { OptionLike, ModelValue, SelectOption } from '../model/types'

interface Props {
  modelValue?: ModelValue
  options?: OptionLike[]
  multiple?: boolean
  placeholder?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  multiple: false,
  placeholder: 'Выберите...',
  clearable: true
})

const emit = defineEmits<{
  'update:modelValue': [value: ModelValue]
}>()

const root = ref<HTMLElement | null>(null)
const open = ref(false)
const value = ref<ModelValue>(props.modelValue ?? (props.multiple ? [] : null))

watch(
  () => props.modelValue,
  (v) => (value.value = v)
)

const getOptionValue = (opt: OptionLike): string | number =>
  typeof opt === 'object' ? opt.value : opt

const getOptionLabel = (opt: OptionLike): string | number =>
  typeof opt === 'object' ? opt.label : opt

const hasValue = computed(() =>
  props.multiple
    ? Array.isArray(value.value) && value.value.length > 0
    : !!value.value
)

const selectedLabel = computed(() => {
  if (props.multiple) return ''
  const currentVal =
    typeof value.value === 'object' && value.value !== null
      ? (value.value as SelectOption).value
      : value.value

  const found = props.options.find((o) => getOptionValue(o) === currentVal)
  return found ? getOptionLabel(found) : ''
})

function toggleOpen() {
  open.value = !open.value
}

function select(opt: OptionLike) {
  const val = getOptionValue(opt)

  if (props.multiple) {
    const current = (value.value as (string | number)[]) ?? []
    const exists = current.includes(val)
    value.value = exists ? current.filter((v) => v !== val) : [...current, val]
  } else {
    value.value = val
    open.value = false
  }
  emit('update:modelValue', value.value)
}

function remove(opt: OptionLike) {
  const val = getOptionValue(opt)
  const current = (value.value as (string | number)[]) ?? []
  value.value = current.filter((v) => v !== val)
  emit('update:modelValue', value.value)
}

function clear() {
  value.value = props.multiple ? [] : null
  emit('update:modelValue', value.value)
}

function isSelected(opt: OptionLike): boolean {
  const val = getOptionValue(opt)
  return props.multiple
    ? ((value.value as (string | number)[]) ?? []).includes(val)
    : value.value === val
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div
    class="simple-select"
    ref="root"
    @click="toggleOpen">
    <div class="control">
      <div
        v-if="multiple"
        class="w-full flex gap-1 wrap">
        <span
          v-for="(opt, i) in (value as (string | number)[])"
          :key="i"
          class="tag w-fit">
          {{ options.find((e) => getOptionValue(e) === opt) ? getOptionLabel(options.find((e) => getOptionValue(e) === opt)!) : opt }}
          <button
            type="button"
            @click.stop="remove(opt)">×</button>
        </span>
      </div>

      <span v-else>{{ selectedLabel || placeholder }}</span>
      <button
        class="remove"
        v-if="clearable && hasValue"
        @click.stop="clear">×</button>
    </div>

    <ul
      v-if="open"
      class="dropdown">
      <li
        v-for="opt in options"
        :key="getOptionValue(opt)"
        :class="{ selected: isSelected(opt) }"
        @click.stop="select(opt)">
        {{ getOptionLabel(opt) }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.simple-select {
  position: relative;
  display: inline-block;
  width: 220px;
  font-family: sans-serif;
  font-size: 14px;
}
.control {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 8px;
  background: white;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  min-height: 34px;
}
.tag {
  background: #eef;
  border-radius: 10px;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.dropdown {
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  margin-top: 4px;
  max-height: 160px;
  overflow: auto;
}
.dropdown li {
  padding: 6px 8px;
  cursor: pointer;
}
.dropdown li.selected {
  background: #dbeafe;
  font-weight: bold;
}
.remove {
  position: absolute;
  right: 10px;
}
</style>