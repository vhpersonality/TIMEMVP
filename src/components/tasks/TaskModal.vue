<template>
  <el-dialog
    v-model="visible"
    :title="isEditing ? 'Редактировать задачу' : 'Новая задача'"
    width="600px"
  >
    <TaskForm 
      :task="currentTask"
      @submit="handleSubmit"
      @cancel="visible = false"
    />
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskForm from './TaskForm.vue'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const taskStore = useTaskStore()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isEditing = computed(() => false) // Пока всегда создаем новую задачу
const currentTask = computed(() => null)

const handleSubmit = (taskData) => {
  taskStore.addTask(taskData)
  visible.value = false
}
</script>