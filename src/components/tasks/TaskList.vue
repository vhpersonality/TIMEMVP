<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty-state">
      <el-empty description="Нет задач" />
    </div>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @update="handleTaskUpdate"
      @delete="handleTaskDelete"
    />
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['taskUpdate', 'taskDelete'])

const handleTaskUpdate = (taskId, updates) => {
  emit('taskUpdate', taskId, updates)
}

const handleTaskDelete = (taskId) => {
  emit('taskDelete', taskId)
}
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-state {
  padding: 40px 0;
}
</style>