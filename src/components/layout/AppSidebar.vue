<template>
  <el-aside width="280px">
    <el-scrollbar>
      <div class="sidebar-content">
        <!-- Логотип -->
        <div class="logo-section">
          <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="logo">
          <h1>TaskFlow</h1>
        </div>

        <!-- Дата -->
        <div class="date-section">
          <div class="weekday">{{ formattedDate.weekday }}</div>
          <div class="date">{{ formattedDate.date }}</div>
        </div>

        <!-- Меню -->
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="today">
            <el-icon><Calendar /></el-icon>
            <span>Сегодня</span>
          </el-menu-item>
          
          <el-menu-item index="inbox">
            <el-icon><Message /></el-icon>
            <span>Входящие</span>
          </el-menu-item>

          <el-divider />

          <!-- Динамические списки -->
          <div class="lists-section">
            <div class="lists-header">
              <span>Списки</span>
              <el-button 
                text 
                @click="showCreateList = true"
                class="add-list-btn"
              >
                <el-icon><Plus /></el-icon>
              </el-button>
            </div>
            
            <el-menu-item 
              v-for="list in taskStore.lists" 
              :key="list.id"
              :index="`list-${list.id}`"
            >
              <el-icon>
                <div class="color-dot" :style="{ backgroundColor: list.color }"></div>
              </el-icon>
              <span>{{ list.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </el-scrollbar>

    <!-- Модальное окно создания списка -->
    <el-dialog
      v-model="showCreateList"
      title="Новый список"
      width="400px"
    >
      <el-form :model="newList" label-width="80px">
        <el-form-item label="Название">
          <el-input v-model="newList.name" />
        </el-form-item>
        <el-form-item label="Цвет">
          <ColorPicker v-model="newList.color" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateList = false">Отмена</el-button>
        <el-button type="primary" @click="createList">Создать</el-button>
      </template>
    </el-dialog>
  </el-aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { formatCurrentDate } from '@/utils/dateUtils'
import { Calendar, Message, Plus } from '@element-plus/icons-vue'
import ColorPicker from '@/components/common/ColorPicker.vue'

const router = useRouter()
const taskStore = useTaskStore()
const showCreateList = ref(false)
const activeMenu = ref('today')

const newList = ref({
  name: '',
  color: '#3B82F6'
})

const formattedDate = computed(() => formatCurrentDate())

const handleMenuSelect = (index) => {
  if (index === 'today') {
    router.push('/today')
  } else if (index === 'inbox') {
    router.push('/inbox')
  } else if (index.startsWith('list-')) {
    const listId = index.split('-')[1]
    router.push(`/list/${listId}`)
  }
}

const createList = () => {
  if (newList.value.name.trim()) {
    taskStore.addList({
      ...newList.value,
      id: Date.now().toString()
    })
    showCreateList.value = false
    newList.value = { name: '', color: '#3B82F6' }
  }
}
</script>

<style scoped>
.sidebar-content {
  padding: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
}

.logo {
  width: 32px;
  height: 32px;
}

.logo-section h1 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.date-section {
  margin-bottom: 20px;
  padding: 16px;
  background: #f3f4f6;
  border-radius: 8px;
}

.weekday {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.date {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.sidebar-menu {
  border: none;
}

.lists-section {
  margin-top: 8px;
}

.lists-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 8px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.add-list-btn {
  padding: 4px;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
</style>