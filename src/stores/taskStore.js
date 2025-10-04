import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const lists = ref([
    { id: '1', name: 'Работа', color: '#3B82F6' },
    { id: '2', name: 'Личное', color: '#10B981' },
    { id: '3', name: 'Покупки', color: '#F59E0B' }
  ])

  const addTask = (task) => {
    tasks.value.push({
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
      ...task
    })
  }

  const updateTask = (id, updates) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const addList = (list) => {
    lists.value.push(list)
  }

  const updateList = (id, updates) => {
    const index = lists.value.findIndex(list => list.id === id)
    if (index !== -1) {
      lists.value[index] = { ...lists.value[index], ...updates }
    }
  }

  const deleteList = (id) => {
    lists.value = lists.value.filter(list => list.id !== id)
    // Перемещаем задачи из удаленного списка во Входящие
    tasks.value.forEach(task => {
      if (task.listId === id) {
        task.listId = null
      }
    })
  }

  // Геттеры
  const getTodayTasks = computed(() => () => {
    const today = new Date().toDateString()
    return tasks.value.filter(task => 
      task.dueDate && new Date(task.dueDate).toDateString() === today
    )
  })

  const getInboxTasks = computed(() => () => 
    tasks.value.filter(task => !task.listId)
  )

  const getTasksByList = computed(() => (listId) => 
    tasks.value.filter(task => task.listId === listId)
  )

  return {
    tasks,
    lists,
    addTask,
    updateTask,
    deleteTask,
    addList,
    updateList,
    deleteList,
    getTodayTasks,
    getInboxTasks,
    getTasksByList
  }
})