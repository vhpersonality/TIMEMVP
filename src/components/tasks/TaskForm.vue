<template>
  <el-form :model="form" label-width="120px" class="task-form">
    <el-form-item label="Название">
      <el-input v-model="form.title" placeholder="Введите название задачи" />
    </el-form-item>
    
    <el-form-item label="Описание">
      <el-input
        v-model="form.description"
        type="textarea"
        :rows="3"
        placeholder="Добавьте описание"
      />
    </el-form-item>
    
    <el-form-item label="Приоритет">
      <el-select v-model="form.priority" placeholder="Выберите приоритет">
        <el-option label="Низкий" value="low" />
        <el-option label="Средний" value="medium" />
        <el-option label="Высокий" value="high" />
      </el-select>
    </el-form-item>
    
    <el-form-item label="Дедлайн">
      <el-date-picker
        v-model="form.dueDate"
        type="date"
        placeholder="Выберите дату"
      />
    </el-form-item>
    
    <el-form-item label="Список">
      <el-select v-model="form.listId" placeholder="Выберите список">
        <el-option label="Входящие" :value="null" />
        <el-option
          v-for="list in taskStore.lists"
          :key="list.id"
          :label="list.name"
          :value="list.id"
        />
      </el-select>
    </el-form-item>
    
    <el-form-item>
      <el-button @click="$emit('cancel')">Отмена</el-button>
      <el-button type="primary" @click="handleSubmit">
        {{ isEditing ? 'Обновить' : 'Создать' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const taskStore = useTaskStore()
const isEditing = !!props.task

const form = ref({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: null,
  listId: null
})

watch(() => props.task, (newTask) => {
  if (newTask) {
    form.value = { ...newTask }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (form.value.title.trim()) {
    emit('submit', form.value)
  }
}
</script>

<style scoped>
.task-form {
  padding: 20px 0;
}
</style>