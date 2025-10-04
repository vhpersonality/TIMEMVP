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
    getTodayTasks,
    getInboxTasks,
    getTasksByList
  }
})