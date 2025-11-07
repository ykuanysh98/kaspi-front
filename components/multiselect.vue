<template>
  <div class="simple-select" @click="toggleOpen" ref="root">
    <div class="control">
      <div v-if="multiple" class="w-full flex gap-1 wrap">
        <span
          v-for="(opt, i) in value"
          :key="i"
          class="tag w-fit"
        >
          {{ options.find(e=>e.value === opt)?.label }}
          <button type="button" @click.stop="remove(opt)">×</button>
        </span>
      </div>

      <span v-else>{{ selectedLabel || placeholder }}</span>
      <button class="remove" v-if="clearable && hasValue" @click.stop="clear">×</button>
    </div>

    <ul v-if="open" class="dropdown">
      <li
        v-for="opt in options"
        :key="opt.value || opt"
        :class="{ selected: isSelected(opt) }"
        @click.stop="select(opt)"
      >
        {{ opt.label || opt }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: [Array, String, Number, Object],
  options: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: 'Выберите...' },
  clearable: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue'])

const root = ref(null)
const open = ref(false)
const value = ref(props.modelValue || (props.multiple ? [] : null))

watch(() => props.modelValue, v => (value.value = v))

const hasValue = computed(() =>
  props.multiple ? value.value.length > 0 : !!value.value
)

const selectedLabel = computed(() => {
  if (props.multiple) return ''
  const found = props.options.find(
    o => (o.value ?? o) === (value.value?.value ?? value.value)
  )
  return found?.label || found || ''
})

function toggleOpen() {
  open.value = !open.value
}

function select(opt) {
  if (props.multiple) {
    const val = opt.value ?? opt
    const exists = value.value.find(v => v === val)
    value.value = exists
      ? value.value.filter(v => v !== val)
      : [...value.value, val]

    } else {
    value.value = opt.value ?? opt
    open.value = false
  }
  emit('update:modelValue', value.value)
}

function remove(opt) {
  const val = opt.value ?? opt
  value.value = value.value.filter(v => v !== val)
  emit('update:modelValue', value.value)
}

function clear() {
  value.value = props.multiple ? [] : null
  emit('update:modelValue', value.value)
}

function isSelected(opt) {
  const val = opt.value ?? opt
  return props.multiple
    ? value.value.includes(val)
    : value.value === val
}

function onClickOutside(e) {
  if (!root.value.contains(e.target)) open.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

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
.remove{
  position: absolute;
  right: 10px;
}
</style>
