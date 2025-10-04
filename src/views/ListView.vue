<template>
  <div class="list-view">
    <div class="view-header">
      <div class="list-info">
        <div class="color-indicator" :style="{ backgroundColor: currentList?.color }"></div>
        <h1>{{ currentList?.name || 'Список' }}</h1>
      </div>
      <p class="subtitle">{{ taskCount }} задач</p>
    </div>
    <TaskList :tasks="listTasks" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import TaskList from '@/components/tasks/TaskList.vue'

const route = useRoute()
const taskStore = useTaskStore()

const currentList = computed(() => 
  taskStore.lists.find(list => list.id === route.params.id)
)

const listTasks = computed(() => 
  taskStore.getTasksByList(route.params.id)
)

const taskCount = computed(() => listTasks.value.length)
</script>

<style scoped>
.list-view {
  max-width: 800px;
  margin: 0 auto;
}

.view-header {
  margin-bottom: 32px;
}

.list-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.view-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
}

.subtitle {
  font-size: 16px;
  color: #6b7280;
  margin-left: 32px;
}
</style>