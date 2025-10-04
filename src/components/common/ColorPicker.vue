<template>
  <div class="color-picker">
    <div 
      v-for="color in colorOptions" 
      :key="color"
      class="color-option"
      :class="{ active: modelValue === color }"
      :style="{ backgroundColor: color }"
      @click="$emit('update:modelValue', color)"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])

const colorOptions = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
]
</script>

<style scoped>
.color-picker {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #1f2937;
  transform: scale(1.1);
}
</style>