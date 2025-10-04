<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-content">
      <el-checkbox 
        v-model="task.completed" 
        @change="handleComplete"
        class="task-checkbox"
      />
      <div class="task-details">
        <div class="task-title">{{ task.title }}</div>
        <div v-if="task.description" class="task-description">
          {{ task.description }}
        </div>
        <div class="task-meta">
          <span v-if="task.dueDate" class="due-date">
            {{ formatDueDate(task.dueDate) }}
          </span>
          <span v-if="task.priority" class="priority" :class="task.priority">
            {{ priorityLabels[task.priority] }}
          </span>
        </div>
      </div>
    </div>
    <div class="task-actions">
      <el-button text @click="handleEdit">
        <el-icon><Edit /></el-icon>
      </el-button>
      <el-button text @click="handleDelete">
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

const priorityLabels = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий'
}

const task = computed(() => props.task)

const handleComplete = () => {
  emit('update', task.value.id, { completed: task.value.completed })
}

const handleEdit = () => {
  // Будет реализовано в следующих итерациях
}

const handleDelete = () => {
  emit('delete', task.value.id)
}

const formatDueDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-item.completed {
  opacity: 0.6;
}

.task-content {
  display: flex;
  gap: 12px;
  flex: 1;
}

.task-checkbox {
  margin-top: 2px;
}

.task-details {
  flex: 1;
}

.task-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.task-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.task-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
}

.due-date {
  color: #6b7280;
}

.priority {
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.priority.low {
  background: #d1fae5;
  color: #065f46;
}

.priority.medium {
  background: #fef3c7;
  color: #92400e;
}

.priority.high {
  background: #fee2e2;
  color: #991b1b;
}

.task-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.task-item:hover .task-actions {
  opacity: 1;
}
</style>