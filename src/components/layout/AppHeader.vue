<template>
  <el-header class="app-header">
    <div class="header-content">
      <div class="header-title">
        <h2>{{ currentViewTitle }}</h2>
      </div>
      <div class="header-actions">
        <el-button 
          type="primary" 
          @click="showTaskModal = true"
          class="add-task-btn"
        >
          <el-icon><Plus /></el-icon>
          Новая задача
        </el-button>
        <el-dropdown>
          <span class="user-profile">
            <el-avatar :size="32" src="https://avatars.githubusercontent.com/u/1?v=4" />
            <span class="username">Пользователь</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Профиль</el-dropdown-item>
              <el-dropdown-item>Настройки</el-dropdown-item>
              <el-dropdown-item divided>Выйти</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </el-header>

  <TaskModal v-model="showTaskModal" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { Plus } from '@element-plus/icons-vue'
import TaskModal from '@/components/tasks/TaskModal.vue'

const route = useRoute()
const taskStore = useTaskStore()
const showTaskModal = ref(false)

const currentViewTitle = computed(() => {
  const routeName = route.name
  if (routeName === 'today') return 'Сегодня'
  if (routeName === 'inbox') return 'Входящие'
  if (routeName === 'list') {
    const listId = route.params.id
    const list = taskStore.lists.find(l => l.id === listId)
    return list?.name || 'Список'
  }
  return 'Задачи'
})
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-title h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.add-task-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
}

.user-profile:hover {
  background: #f3f4f6;
}

.username {
  font-size: 14px;
  font-weight: 500;
}
</style>