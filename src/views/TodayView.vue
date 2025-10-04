<template>
  <div class="today-view">
    <h1>TaskFlow - Управление задачами</h1>
    <p>Приложение успешно запущено! 🎉</p>
    <el-button type="primary" @click="$router.push('/today')">
      Перейти к задачам
    </el-button>
  </div>
</template>

<script setup>
// Простой компонент для тестирования
</script>

<style scoped>
.today-view {
  text-align: center;
  padding: 50px 20px;
}

.today-view h1 {
  margin-bottom: 20px;
  color: #1f2937;
}

.today-view p {
  margin-bottom: 30px;
  font-size: 18px;
  color: #6b7280;
}
</style>