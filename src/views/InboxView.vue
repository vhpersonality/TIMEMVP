<template>
  <div class="inbox-view">
    <div class="view-header">
      <h1>Входящие</h1>
      <p class="subtitle">Все задачи без определенного списка</p>
    </div>
    <TaskList :tasks="inboxTasks" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskList from '@/components/tasks/TaskList.vue'

const taskStore = useTaskStore()

const inboxTasks = computed(() => taskStore.getInboxTasks())
</script>

<style scoped>
.inbox-view {
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