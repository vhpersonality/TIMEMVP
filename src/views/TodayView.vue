<template>
  <div class="today-view">
    <div class="view-header">
      <h1>Сегодня</h1>
      <p class="subtitle">{{ formattedDate }}</p>
    </div>
    <TaskList :tasks="todayTasks" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskList from '@/components/tasks/TaskList.vue'
import { formatCurrentDate } from '@/utils/dateUtils'

const taskStore = useTaskStore()

const todayTasks = computed(() => taskStore.getTodayTasks())
const formattedDate = computed(() => {
  const date = formatCurrentDate()
  return `${date.weekday}, ${date.date}`
})
</script>

<style scoped>
.today-view {
  max-width: 800px;
  margin: 0 auto;
}

.view-header {
  margin-bottom: 32px;
}

.view-header h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1f2937;
}

.subtitle {
  font-size: 16px;
  color: #6b7280;
}
</style>